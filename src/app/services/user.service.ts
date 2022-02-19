import { Injectable, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import UserCreateModel from '../models/user-create-model';
import { firstValueFrom, map, Observable, take } from 'rxjs';
import UserLoginModel from '../models/user-login-model';
import { Store } from '@ngrx/store';
import { LoginUser, LogoutUser } from '../auth/user/user-actions';
import { setCart, setUser } from '../cart.action';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit{

  serverUrl:string = environment.serverUrl+"/user/"

  constructor(private http:HttpClient,private store:Store<{userState:any}>,private router:Router) { }

  ngOnInit(): void {
    this.user()
  }

  

  logoutUser(){
    localStorage.removeItem("loginkey");
    this.store.dispatch(LogoutUser())
    this.store.dispatch(setCart({details:''}))
    this.store.dispatch(setUser({userId:null}))
    this.router.navigate(["/home"])
  }

  async get_current_user(){
    const token = localStorage.getItem("loginkey")
    if (!token) return false;
    const headers = new HttpHeaders({'Authorization':"Bearer "+token})
    const request = this.http.get(this.serverUrl,{headers:headers})
    const firstValue = await firstValueFrom(request)
    return firstValue
  }

   user(){ 
      this.get_current_user().then(x => {
        if(x)this.store.dispatch(LoginUser({newDetails:x}))
        else this.logoutUser()
      }).catch(y => {
        this.logoutUser()
      })
  }

  async createUser(user:UserCreateModel){
    const subcription = this.http.post(this.serverUrl,user)
    const result = await firstValueFrom(subcription)
    console.log(result)
    return result
  }

   async isUserNameUnique(username:string){
    const subcription = this.http.post(this.serverUrl+"uni/username",{username:username})
    const data = await firstValueFrom(subcription)
    return data

  }

  async isEmailUnique(email:string){
    const subcription = this.http.post(this.serverUrl+"uni/email",{email:email})
    const data = await firstValueFrom(subcription)
    return data
  }


  async loginUser(user:UserLoginModel){
    const subcription = this.http.post(this.serverUrl+"login",user)
    const data = await firstValueFrom(subcription)
    return data as any
  }


  async isPasswordUnique(password:string){
    const subcription = this.http.post(this.serverUrl+"uni/password",{password:password})
    const data = await firstValueFrom(subcription)
    return data
  }
}
