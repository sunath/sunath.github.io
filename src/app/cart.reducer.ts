import { createReducer,on } from "@ngrx/store";
import { setCart, setUser } from "./cart.action";
import { CartSchema } from "./services/cart.model";


const init:CartSchema = {
    details:""
}

const _cartReducer = createReducer(init,
    
    on(setCart,(state,{details}) => ({...state,details:details})),
    on(setUser,(state,{userId}) => ({...state,owner:userId}))

    )

export function CartReducer(state:any,props:any) {
    return _cartReducer(state,props)
}