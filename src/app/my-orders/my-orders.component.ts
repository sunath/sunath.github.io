import { Component, OnInit } from '@angular/core';
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
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

 


  details:any[] = [];

  constructor(private store:Store<{cartState:any}>,
    private userProducts:UserProductService,
    private router:Router,
    private userService:UserService,
    private orderService:OrderService) {
    
   }
  async ngOnInit() {
    const user = await this.userService.get_current_user() as any
    const data = await this.orderService.getOrders(user.id)

    for(let i = 0 ; i < data.length ; i++){
      this.details.push(JSON.parse(data[i].details))
    }
    
    this.details = this.details.reverse()
    console.log(this.details);
    
  }



}
