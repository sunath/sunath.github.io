import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartService } from './services/cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  url = environment.serverUrl+"/order"


  constructor(private http:HttpClient,private cartService:CartService) { }


  async saveOrder(details:any){
    const observer = this.http.post(this.url,details).pipe(map(e => e as any))
    const promise  = await firstValueFrom(observer)
    this.cartService.clear()
    return promise

  }

  async getOrders(id:number){
    const observer = this.http.get(this.url+"/"+id).pipe(map(e => e as any))
    const promise  = await firstValueFrom(observer)
    return promise
  }

  async getAll(){
    const observer = this.http.get(this.url+"/all").pipe(map(e => e as any))
    const promise  = await firstValueFrom(observer)
    return promise
  }
}
