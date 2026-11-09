import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  constructor(private apiService: ApiService){}
  allWishListItems: any = [];
  ngOnInit(): void {
    this.getAllWishlistItems()
  }
  getAllWishlistItems(){
    this.apiService.getAllWishlistItemApi().subscribe({
      next:(res)=>{
        this.allWishListItems = res;
        console.log("all wishlist items");
        console.log(this.allWishListItems);
      },
      error:(res)=>{
        console.log(res);
      }
    })
  }
  deleteWishlistItem(id: any){
    this.apiService.deleteWishListItem(id).subscribe({
      next:(res)=>{
        this.getAllWishlistItems();
        this.apiService.getWishlistCount()
      },
      error:(res)=>{
        console.log(res);
        
      }
    })
  }
}
