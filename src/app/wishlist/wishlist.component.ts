import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  constructor(private apiService:ApiService){}
  allWishListItems: any = [];
  ngOnInit(): void {
    this.getAllWishlistItems()
  }
  getAllWishlistItems() {
    this.apiService.getAllWishListItemApi().subscribe({
      next:(res)=>{
        this.allWishListItems = res;
        console.log("all wishlist items");
        console.log(this.allWishListItems)
      },
      error:(res)=>{
        console.log(res)
      }
    })
  }
  deleteWishlistItem(id:any){
    this.apiService.deleteWishListItem(id).subscribe({
      next:(res)=>{
        this.getAllWishlistItems();
        this.apiService.getWishlistCount()
      },
      error:(res)=>{
        console.log(res)
      }
    })
  }
  addTocartItem(data:any){
    Object.assign(data,{quantity:1})
    this.apiService.addToCart(data).subscribe({
      next:(res)=>{
        Swal.fire({
          title: 'Success',
          text: `Successfully added to wishlist`,
          icon: 'success',
        });
        this.deleteWishlistItem(data._id);
        this.apiService.getCartCount();
      },
      error:(res)=>{
        Swal.fire({
          title: 'Error',
          text: `${res}`,
          icon: 'error',
        });
      }

    })
  }
}
