import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartProductInfo } from '../services/cart.model';
import { CartService } from '../services/cart.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser$;
  currentCart$;
  userData:any;
  isLoggedIn:boolean = false;

  items:number = 0 ;

  navbar_classes={'is-sticky':true}

  constructor(private store:Store<{userState:any,cartState:any}>,public userService:UserService,private cartService:CartService) {
      this.currentUser$ = store.select('userState')
      this.currentCart$ = store.select('cartState');


      document.addEventListener('scroll',(e) => {
        this.navbar_classes = this.navbar_classes;
      })


   }





  ngOnInit(): void {
    this.userService.user()
    this.currentUser$.subscribe(e => {

      this.isLoggedIn = e.isLoggedIn;
      this.userData = e.userInfo;
    })

    this.currentCart$.subscribe(e => {
    
      if(e.details === "" || e.details  === '') this.items = 0 ;
      else {
        
        const obj = JSON.parse(e.details) as CartProductInfo[]
        if (obj.length > 0)
            this.items = obj.map(e => e.quantity).reduce((e,v) => e+v)
        else this.items = 0
      }
    })
  }

}
