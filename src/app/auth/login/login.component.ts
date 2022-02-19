import { HttpErrorResponse } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/services/user.service';
import { LoginUser } from '../user/user-actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  loginForm:FormGroup;

  isSubmited:boolean=false;
  invalidCredentials:boolean = false;

  constructor(private fb:FormBuilder,private userService:UserService,private store:Store<{userState:any}>,private router:Router,private route:ActivatedRoute) {
      this.loginForm = fb.group({
        username:fb.control('',Validators.required),
        password:fb.control('',Validators.required)
      })
   }


   loginUser(){
    
     this.isSubmited = true;
        this.userService.loginUser(this.loginForm.value).then(e => {
         localStorage.setItem("loginkey",e.token)
          this.store.dispatch(LoginUser({newDetails:e.token}))
          this.userService.user()
          const url = this.route.snapshot.queryParamMap.get("returnUrl")

          this.router.navigate([url || "/"])
        }).catch( x => {
          // invalid user credential
          if(x.status == 403){
            this.invalidCredentials = true;
            setTimeout(() => {this.invalidCredentials = false;},500)
            }
        }).finally(() => {this.isSubmited = false;})
   }

}
