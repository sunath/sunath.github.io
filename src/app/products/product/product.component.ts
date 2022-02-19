import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { setCart } from 'src/app/cart.action';
import { CartProductInfo } from 'src/app/services/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { textChangeRangeIsUnchanged } from 'typescript';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {



  @Input('product') product:any;

  productList:CartProductInfo[] = []

  myCartProduct:any;


  constructor(private store:Store<{cartState:any}>,private cartService:CartService) { 
    this.store.select('cartState').pipe(map(e => e as any)).subscribe(e => 
      {
        if(e.details === "" || e.details === '')this.productList = []
        else{
          this.productList = JSON.parse(e.details) 
          if(this.product){
          this.myCartProduct = this.productList.filter(e => e.productId === this.product.id)[0]
          }
        }
      }
    )
  }

  ngOnInit(): void {

  }

  change(change:number){


    console.log(this.productList);
    const checkProduct = this.productList.filter(e => e.productId === this.product.id)
    
    if(checkProduct.length > 0){    
     const product  =  this.productList.indexOf(checkProduct[0])
     const productQuantity = this.productList[product].quantity+change;

     if (productQuantity > 0 )this.productList[product] = {productId:this.product.id,quantity:productQuantity}
     else this.productList.splice(product,1)
    }else {
      console.log("new");
      
      this.productList.push({productId:this.product.id,quantity:1})
    }


   this.store.dispatch(setCart({details:JSON.stringify(this.productList)}))
   this.cartService.addToCart({details:JSON.stringify(this.productList)})
  }

  

}
