import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  constructor(private orderService:OrderService) { }



  orders:any[] = []


  async ngOnInit() {
    const data = await this.orderService.getAll()
    console.log(data);
    
    for(let i = 0 ; i < data.length; i++){
        const details = JSON.parse(data[i].details)
        const productDetails = details.productDetails;
        const shippingDetails = details.shippingDetails;
        console.log(details);
        
        this.orders.push({shippingDetails:shippingDetails,productDetails:productDetails,checkOutAt:details.checkOutAt})
    }

    console.log(this.orders);
    
  }

}
