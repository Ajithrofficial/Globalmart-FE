import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {
  constructor(private apiService: ApiService) { }
  allProducts: any = [];
  ngOnInit() {
    this.apiService.getAllProductsApi().subscribe({
      next:(res)=>{
        console.log("All products");
        console.log(res);
        this.allProducts = res;
      },
      error: (res)=>{
        console.log(res);
      }
    })
  }
  addToWishlist(product: any){
    if(sessionStorage.getItem("token")){
      // add item to wishlist
      this.apiService.addToWishList(product).subscribe({
        next: (res: any)=>{
          console.log("===Add to wishlist response");
          console.log(res);
          this.apiService.getWishlistCount()
          Swal.fire({
            title: 'Success',
            text: 'Successfully added to wishlist',
            icon: 'success',
          });
        },
        error:(res: any)=>{
          console.log(res);
          Swal.fire({
            title: 'Warning',
            text: `${res.error}`,
            icon: 'warning',
          });
        }
      })
    }
    else{
      Swal.fire({
        title: 'Warning',
        text: `Please Login`,
        icon: 'error',
      });
    }
  }
  addToCart(product: any){
    alert(product)
  }
}
