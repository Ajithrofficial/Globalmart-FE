import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  server_url = "http://localhost:3000"
  constructor(private http: HttpClient) { }
  // method to call getAllProdcucts api
  getAllProductsApi() {
    return this.http.get(`${this.server_url}/all-products`)
  }

  // get product details by id api
  getAllProductsByIdApi(productId: any) {
    return this.http.get(`${this.server_url}/get-product/${productId}`)
  }
  // user register
  userRegisterApi(data: any) {
    return this.http.post(`${this.server_url}/user-register`, data)
  }

  //login user
  userLoginApi(data: any) {
    return this.http.post(`${this.server_url}/user-login`, data)
  }

  addToWishList(data: any) {
    return this.http.post(`${this.server_url}/add-wishlist`, data, this.addTokenToHeader())
  }
  // common function to create a custom header
  addTokenToHeader() {
    // 1) create an object of class HttHeaders
    let headers = new HttpHeaders();
    const token = sessionStorage.getItem("token");
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`)
    }
    return { headers }
  }

  // get all wishlist items
  getAllWishListItemApi() {
    return this.http.get(`${this.server_url}/allwishlistitems`, this.addTokenToHeader())
  }

  // delete wishlist item
  deleteWishListItem(id: any) {
    return this.http.delete(`${this.server_url}/wishlist/removeItem/${id}`, this.addTokenToHeader())
  }
  // cretae a behaviour subject to share data between components
  wishlistCount = new BehaviorSubject(0);
  getWishlistCount() {
    this.getAllWishListItemApi().subscribe((res: any) => {
      this.wishlistCount.next(res.length)
    })
  }

  addToCart(data: any) {
    return this.http.post(`${this.server_url}/add-cart`, data, this.addTokenToHeader())
  }

  getAllCartItemsApi() {
    return this.http.get(`${this.server_url}/allCartitems`, this.addTokenToHeader())
  }
  // create a behaviour subject to update cart count
  cartCount = new BehaviorSubject(0)
  getCartCount() {
    this.getAllCartItemsApi().subscribe((res: any) => {
      this.cartCount.next(res.length)
    })
  }

  icrementItemApi(id: any) {
    return this.http.get(`${this.server_url}/cart/increment/${id}`, this.addTokenToHeader())
  }

  decrementItemApi(id: any) {
    return this.http.get(`${this.server_url}/cart/decrement/${id}`, this.addTokenToHeader())
  }

  emptyCartApi() {
    return this.http.delete(`${this.server_url}/empty-cart`, this.addTokenToHeader())
  }

  removeItemApi(id: any) {
    return this.http.delete(`${this.server_url}/cart/deleteone/${id}`, this.addTokenToHeader())
  }

}
