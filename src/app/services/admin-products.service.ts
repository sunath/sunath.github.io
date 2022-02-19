import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminProductsService {



  url = environment.serverUrl+"/product"


 


  constructor(private http:HttpClient) { }


  get allProducts(){
    return this.http.get(this.url+"/all")
  }


  async createProduct(data:any){
    const return$ = this.http.post(this.url,data)
    const returnData =await firstValueFrom(return$)
    return returnData
  }


  async updateProduct(id:any,data:any){
    console.log(id);
    const observer = this.http.put(this.url+"/"+id,data)
    const returnData = await firstValueFrom(observer)
    console.log(returnData);
    
    return returnData;
  }


  async product(id:any){
   const observer =  this.http.get(this.url+"/"+id).pipe(map(e => e as any))
   const promise = await firstValueFrom(observer)
   return promise
  }


  async deleteProduct(id:any){
    const observer = this.http.delete(this.url+"/"+id)
    const promise =  await firstValueFrom(observer);
    return promise
  }

}
