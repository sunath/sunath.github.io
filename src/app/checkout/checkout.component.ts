import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { setCart } from '../cart.action';
import { OrderService } from '../order.service';
import { CartProductInfo } from '../services/cart.model';
import { CartService } from '../services/cart.service';
import { UserProductService } from '../services/user-product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {



  cartProducts:any[] = [];

  cartProductInfo:CartProductInfo[] = []

  userId:any;



  orderDetails:FormGroup;


  constructor(fb:FormBuilder,private cartService:CartService,private store:Store<{cartState:any}>,
    private userProducts:UserProductService,
    private orderService:OrderService,
    private userService:UserService,
    private router:Router) {
    this.orderDetails = fb.group({
      name:['',Validators.required],
      email:['',Validators.required],
      phone:['',Validators.required],
      address:['',Validators.required],
      comment:['']
    })
    this.setView()

    this.userService.user()
    
   }


   setView(){
    this.store.select('cartState').pipe(map(e => e as any)).subscribe(data => {
      if (!data.details || data.details === '' || data.details === "") this.cartProducts = [];
      else {
        this.cartProducts = JSON.parse(data.details) as CartProductInfo[]
        this.cartProductInfo = this.cartProducts;
        this.userProducts.allProducts().then(e => {
          if (!this.cartProducts)return;
              for(let i = 0 ; i < this.cartProducts.length;i++){
                if(this.cartProducts[i]){

                  let  product  = this.cartProducts[i]
                  product = e.filter(dbProduct => dbProduct.id === product.productId).map((v) => ({...v,...product}))[0]
                  if(product)this.cartProducts[i] = product
                 
                }
              }
        })
      }   
  })
   }


   get ProductsPrice(){
     if (!this.cartProducts) return 0;
     return this.cartProducts.map(e => e.price * e.quantity).reduce((e,v) => e+v)

   }
  


  change(changeProduct:any,change:number){

    const checkProduct = this.cartProductInfo.filter(e => e.productId === changeProduct.id)
    
    if(checkProduct.length > 0){    
     const product  =  this.cartProductInfo.indexOf(checkProduct[0])
     const productQuantity = this.cartProductInfo[product].quantity+change;

     if (productQuantity > 0 )this.cartProductInfo[product] = {productId:changeProduct.id,quantity:productQuantity}
     else this.cartProductInfo.splice(product,1)
    }else {      
      this.cartProductInfo.push({productId:changeProduct.id,quantity:1})
    }


   this.store.dispatch(setCart({details:JSON.stringify(this.cartProductInfo)}))
   this.cartService.addToCart({details:JSON.stringify(this.cartProductInfo)})
  }


  async ngOnInit() {
   const data =  await this.userService.get_current_user() as any
   this.userId = data.id;
   
  }


  saveOrder(){
    const newData = {productDetails:this.cartProducts,shippingDetails:this.orderDetails.value,checkOutAt:new Date().toDateString()}
    this.orderService.saveOrder({owner:this.userId,details:JSON.stringify(newData)}).then(e => {
        this.router.navigate(["/my-orders"])
    })
  }


}
