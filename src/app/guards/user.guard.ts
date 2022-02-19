import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  private currentuser$;

  constructor(private user:UserService,private store:Store<{userState:any}>){this.currentuser$ = store.select('userState')}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
    this.user.user()
    return this.currentuser$.pipe(map(e => {
      console.log(e)
      return e.isLoggedIn as boolean
    })).pipe(take(1))
  }
  
}
