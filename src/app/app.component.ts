import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Store} from "@ngrx/store";
import { Observable } from 'rxjs';
import { LoginUser, LogoutUser } from './auth/user/user-actions';
import { UserReducerModel } from './auth/user/user-reducer';
import { UserService } from './services/user.service';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  

  constructor(private store:Store<{userState:UserReducerModel}>,private userService:UserService,private router:Router){

    this.userService.user()
    const x = store.select("userState")
    this.router.navigate(["/home"])



    
  }





}
