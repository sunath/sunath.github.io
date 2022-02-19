import { noUndefined } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {  map } from 'rxjs';
import { setCart } from '../cart.action';
import { CartProductInfo } from '../services/cart.model';
import { CartService } from '../services/cart.service';
import { UserProductService } from '../services/user-product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {



  cartProducts:any[] = [];

  cartProductInfo:CartProductInfo[] = []

  constructor(private cartService:CartService,private store:Store<{cartState:any}>,private userProducts:UserProductService,private router:Router) {
    
   }


   get ProductsPrice(){
     if (!this.cartProducts || this.cartProducts.length == 0) return 0;
    return this.cartProducts.map(e => e.price * e.quantity).reduce((e,v) => e+v)
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


  clearCart(){
    this.cartService.clear().then(e => {
      this.router.navigate([''])
    })
  }

  ngOnInit(): void {
    this.setView()
  }


}
