import {createReducer} from "@ngrx/store"
import {on} from "@ngrx/store"
import { LoginUser, LogoutUser } from "./user-actions"


export interface UserReducerModel{
    isLoggedIn:any,
    userInfo:any
}


export const init:UserReducerModel = {
    isLoggedIn: localStorage.getItem("loginKey"),
    userInfo:{}
}

const _userReducer = createReducer(init,
    on(LoginUser,(state,{newDetails}) => ({...state,isLoggedIn:true,userInfo:newDetails})),
    on(LogoutUser,state => ({...state,isLoggedIn:false,userInfo:null})) 
    )


export function userReducer(state:any,action:any){
    return _userReducer(state,action)
}