import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom, map, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { isJSDocThisTag } from 'typescript';
import { setCart, setUser } from '../cart.action';
import { CartSchema } from './cart.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit{



  url = environment.serverUrl+"/cart/"
  userId:any;
  valid:boolean = false;



  constructor(private http:HttpClient,private store:Store<{userState:any,cartState:any}>,private userService:UserService,private router:Router) { 
    this.userService.user()
    this.store.select('userState').subscribe(e => {

      if(!e.isLoggedIn){
        this.valid =false;
        return;
      }else{
        this.valid = true;
      }
      

      this.userId = e.userInfo.id || null

      if(this.userId != null){
      this.http.get(this.url+this.userId).pipe(map(e => e as any)).subscribe(userCart =>{
          if(userCart.details){
            
            this.store.dispatch(setCart({details:userCart.details}))
            this.store.dispatch(setUser({userId:userCart.owner}))
          }
      })
    }
    })
  }

  async ngOnInit() {

  }

  start(){
  
  }


  async clear(){
    if(this.userId){
      const newData:CartSchema = {owner:this.userId,details:''}
      const observer = this.http.post(this.url,newData).pipe(map(e => e as any))
      this.store.dispatch(setCart({details:''}))
      return await firstValueFrom(observer)
    }
    return null;
  }


  addToCart(cartDetails:CartSchema){

    console.log(this.userId,"id");
    
    if(this.userId >= 0 && this.valid){  
      const newData:CartSchema = {...cartDetails,owner:this.userId}
      this.http.post(this.url,newData).subscribe(e =>
        { 
          this.store.dispatch(setUser({userId:this.userId}))
        }
      )
    }else{
      this.router.navigate(['/home'])
    }
  }

}
