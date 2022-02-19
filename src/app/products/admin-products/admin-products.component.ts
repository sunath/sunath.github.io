import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { AdminProductsService } from 'src/app/services/admin-products.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {



  products:any[] = []

  constructor(private productService:AdminProductsService) {

   }

  ngOnInit(): void {
    this.productService.allProducts.pipe(map(e => e as any[])).subscribe(e => {
      this.products = e;
    })
  }

}
