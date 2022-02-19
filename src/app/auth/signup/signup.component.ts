import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import UserCreateModel from 'src/app/models/user-create-model';
import { UserService } from 'src/app/services/user.service';
import { textChangeRangeIsUnchanged } from 'typescript';
import EmailUniqueValidator from '../common-validators/email-check';
import PasswordUniqueCheck from '../common-validators/password-check';
import UsernameUniqueValidator from '../common-validators/username-check';
import { LoginUser } from '../user/user-actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers:[
    UsernameUniqueValidator,
    EmailUniqueValidator,
    PasswordUniqueCheck
  ]
})
export class SignupComponent implements OnInit {


  signUpForm:FormGroup;

  isSubmitted:boolean = false;


  constructor(private fb:FormBuilder,
    private userService:UserService,
    usernameUniqueValidator:UsernameUniqueValidator,
    emailUniqueValidator:EmailUniqueValidator,
    passwordUniqueCheck:PasswordUniqueCheck,
    private store:Store<{userState:any}>,
    private router:Router) {

      this.signUpForm = fb.group({
        email:fb.control('',[Validators.required,Validators.email],[emailUniqueValidator.validate.bind(this)]),
        username:fb.control('',[Validators.required,Validators.minLength(3)],[usernameUniqueValidator.validate.bind(this)]),
        password:fb.control('',[Validators.required,Validators.minLength(8)],[passwordUniqueCheck.validate.bind(this)])
      })

     

      

   }

  ngOnInit(): void {
  }




  get PasswordErrorMessage(){
    const formData = this.signUpForm.get('password');
   
    if (formData?.valid || !formData?.errors || !formData.touched) return null
    if(formData?.errors['required'])return "Password is required"
    else if(formData.errors['minlength']) return "Password at least need 8 characters"
    else if(formData.errors['notUnique']) return "Try a another"
    return null
  }

  get UserNameErrorMessage(){
    const formData = this.signUpForm.get('username');
    
    if(formData?.valid || !formData?.errors || !formData.touched) return null;
    if(formData.errors['required']) return "Username is required"
    else if(formData.errors['minlength']) return "Username at least need 3 characters"
    else if(formData.errors['notUnique']) return "Username is not unique"
    return null;
  }

  get EmailErrorMessage(){
    const formData = this.signUpForm.get('email');
    if(formData?.valid || !formData?.errors || !formData.touched) return null;
    if(formData.errors['required']) return "Email is required"
    else if(formData.errors['email']) return "Not a valid email"
    else if(formData.errors['notUnique']) return "Email is already taken"
    return null;
  }


  submit($event:any){
    
    $event.preventDefault()
    this.isSubmitted = true;
    const data = this.signUpForm.value as UserCreateModel

    this.userService.createUser(data).then(e => {
      this.isSubmitted  = false;
      const returnData = e as any;
      this.userService.loginUser({username:returnData.username,password:returnData.password}).then(e => {
        localStorage.setItem("loginkey",e.token)
        this.store.dispatch(LoginUser({newDetails:e.token}))
        this.userService.user()
        // const url = this.route.snapshot.queryParamMap.get("returnUrl")

        this.router.navigate(["/"])
      })
    },s => {
      console.log(s)
    }).finally(() => {this.isSubmitted = false;})


  }

}
