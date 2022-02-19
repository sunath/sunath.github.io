import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchAreaComponent } from './search-area/search-area.component';
import { HeroComponent } from './hero/hero.component';
import { FeaturesComponent } from './features/features.component';
import { ProductsComponent } from './products/products.component';
import { CartBannerComponent } from './cart-banner/cart-banner.component';
import { TestimonaliSectionComponent } from './testimonali-section/testimonali-section.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { ShopBannerComponent } from './shop-banner/shop-banner.component';
import { LatestNewsComponent } from './latest-news/latest-news.component';
import { LogoCarouselComponent } from './logo-carousel/logo-carousel.component';
import { FooterComponent } from './footer/footer.component';
import { CopyrightComponent } from './copyright/copyright.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastComponent } from './etc/toast/toast.component';
import { ToastsContainer } from './etc/toast/toast.conatiner.component';
import {StoreModule} from "@ngrx/store";
import { userReducer } from './auth/user/user-reducer';
import { UserGuard } from './guards/user.guard';
import { ShopComponent } from './shop/shop.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { AdminProductsComponent } from './products/admin-products/admin-products.component';
import { ProductComponent } from './products/product/product.component';
import { CartReducer } from './cart.reducer';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AdminGuard } from './admin.guard';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchAreaComponent,
    HeroComponent,
    FeaturesComponent,
    ProductsComponent,
    CartBannerComponent,
    TestimonaliSectionComponent,
    AdvertisementComponent,
    ShopBannerComponent,
    LatestNewsComponent,
    LogoCarouselComponent,
    FooterComponent,
    CopyrightComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    ToastComponent,
    ToastsContainer,
    ShopComponent,
    ProductFormComponent,
    AdminProductsComponent,
    ProductComponent,
    CartComponent,
    CheckoutComponent,
    MyOrdersComponent,
    AdminOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,

    ReactiveFormsModule,
    HttpClientModule,

    StoreModule.forRoot({userState:userReducer,cartState:CartReducer}),


    RouterModule.forRoot([
      
      {
        path:"login",
        component:LoginComponent
      },
      {
        path:"signup",
        component:SignupComponent

      },
      {
        path:"shop",
        component:ShopComponent,
        canActivate:[
          UserGuard
        ]
      },
      {
        path:"cart",
        component:CartComponent,
        canActivate:[
          UserGuard
        ]
      },

      {
        path:"checkout",
        component:CheckoutComponent,
        canActivate:[
          UserGuard
        ]
      },


      {
        path:"my-orders",
        component:MyOrdersComponent,
        canActivate:[
          UserGuard
        ]
      },
      {
        path:"my-orders",
        component:MyOrdersComponent,
        canActivate:[
          UserGuard
        ]
      },
      {
        path:"admin/orders",
        component:AdminOrdersComponent,
        canActivate:[
          UserGuard,
          AdminGuard
        ]
      },
      {
        path:"admin/products/new",
        component:ProductFormComponent,
        canActivate:[
          UserGuard,
          AdminGuard
        ]
      },

      {
        path:"admin/products/:id",
        component:ProductFormComponent,
        canActivate:[
          UserGuard,
          AdminGuard
        ]
      },
      {
        path:"admin/products",
        component:AdminProductsComponent,
        canActivate:[
          UserGuard,
          AdminGuard
        ]
      },

      {
        path:"home",
        component:HomeComponent
      },
      {
        path:"",
        component:AppComponent
      },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
