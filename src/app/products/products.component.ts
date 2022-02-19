import { Component, OnInit } from '@angular/core';
import ProductSchema from '../models/product-schema';
import { CartSchema } from '../services/cart.model';
import { CartService } from '../services/cart.service';
import { UserProductService } from '../services/user-product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {




  constructor(private userProductService:UserProductService,private cart:CartService) {}


  products:ProductSchema[] = [];

  async ngOnInit() {
    this.cart.start()
    this.products = await  this.userProductService.allProducts()
  }

  addToCart(data:CartSchema){
      this.cart.addToCart(data)
  }

}
