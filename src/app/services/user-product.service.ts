import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserProductService {

  url = environment.serverUrl+"/product/"

  constructor(private http:HttpClient) { }



  async allProducts(){
    const observer = this.http.get(this.url+"all").pipe(map(e => e as any[]))
    const promise  = await firstValueFrom(observer)
    return promise
  }


}
