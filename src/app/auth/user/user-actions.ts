import {createAction} from "@ngrx/store"
import {props} from "@ngrx/store"
import { UserReducerModel } from "./user-reducer";

export const LoginUser = createAction("LoginUser",props<{newDetails:any}>())
export const LogoutUser = createAction("LogoutUser");

