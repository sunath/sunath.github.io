import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminProductsService } from 'src/app/services/admin-products.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {


  productFormControl:FormGroup;
  id:any;


  constructor(private fb:FormBuilder,private productService:AdminProductsService,private router:Router,private route:ActivatedRoute) {
    this.productFormControl = fb.group({
      name:['',Validators.required],
      price:['',Validators.required],
      quantity:['',Validators.required],
      imageUrl:['',Validators.required],
    })


  }


  async ngOnInit() {

    this.route.paramMap.subscribe(async e => {
      this.id = e.get("id")
      const data = await this.productService.product(this.id);
      this.productFormControl.get('name')?.setValue(data.name)
      this.productFormControl.get('price')?.setValue(data.price)
      this.productFormControl.get('quantity')?.setValue(data.quantity)
      this.productFormControl.get('imageUrl')?.setValue(data.imageUrl) 
    })


  }

  save($event:any){
    $event.preventDefault();
    console.log(this.productFormControl.value);
    if (!this.id)this.productService.createProduct(this.productFormControl.value).finally(() =>this.router.navigate(["/admin/products"]))
    else this.productService.updateProduct(this.id,this.productFormControl.value).finally(() => this.router.navigate(["/admin/products"]))
  }

  delete($event:any){
    $event.preventDefault();
    this.productService.deleteProduct(this.id).finally(() => this.router.navigate(["/admin/products"]))
  }

}
