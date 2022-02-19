import { createAction, props } from "@ngrx/store";






export const setCart = createAction("setCart",props<{details:string}>())
export const setUser = createAction("setUser",props<{userId:any}>())