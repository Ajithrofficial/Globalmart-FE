import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  server_url = "http://localhost:3000"

  constructor(private http:HttpClient) { }
  // method to call getAllProducts api
  getAllProductsApi(){
    return this.http.get(`${this.server_url}/all-products`)
  }

  // get product details by id api
  getAllProductsByIdApi(productId: any){
    return this.http.get(`${this.server_url}/get-product/${productId}`)
  }

  // user register
  userRegisterApi(data: any){
    return this.http.post(`${this.server_url}/user-register`, data)
  }
  
  // login user
  userLoginApi(data:any){
    return this.http.post(`${this.server_url}/user-login`, data)
  }
  
  addToWishList(data: any){
    return this.http.post(`${this.server_url}/add-wishlist`, data, this.addTokenToHeader())
  }
  // common function to create a header
  addTokenToHeader(){
    // 1) create an object of class HttHeaders
    let headers = new HttpHeaders();
    const token = sessionStorage.getItem("token");
    if(token){
      headers = headers.append('Authorization', `Bearer ${token}`)
    }
    return { headers }
  }

  // get all wishlist items
  getAllWishlistItemApi(){
    return this.http.get(`${this.server_url}/allwishlistitems`, this.addTokenToHeader())
  }

  //delete wishlist item
  deleteWishListItem(id:any){
    return this.http.delete(`${this.server_url}/wishlist/removeItem/${id}`, this.addTokenToHeader())
  }
  // create a behavior subject to share data between components
  wishlistCount = new BehaviorSubject(0);

  getWishlistCount(){
    this.getAllWishlistItemApi().subscribe((res: any) =>{
      this.wishlistCount.next(res.length)
    })
  }
}
