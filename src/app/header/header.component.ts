import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private apiService: ApiService) { }
  loginUserName: any = "";
  wishListCount = 0;
  cartCount:any;
  ngOnInit(): void {
    if (sessionStorage.getItem("username")) {
      this.apiService.getWishlistCount();
      this.loginUserName = sessionStorage.getItem('username');
      this.apiService.wishlistCount.subscribe((res: any) => {
        this.wishListCount = res
      })
      this.apiService.getCartCount();
      this.apiService.cartCount.subscribe((res)=>{
        this.cartCount = res;
      })
    }
    else {
      this.loginUserName = "";
    }
  }
  logout() {
    this.loginUserName = "";
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("token");
    this.router.navigateByUrl("/")
  }
}
