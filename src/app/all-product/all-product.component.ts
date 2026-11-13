import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit, AfterViewInit {
  constructor(private apiService: ApiService, private spinner: NgxSpinnerService) { }
  allProducts: any = [];
  loadError = '';
  readonly placeholder = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="250"><rect width="100%" height="100%" fill="#eee"/><text x="50%" y="50%" fill="#999" font-family="Arial" font-size="18" text-anchor="middle">No image</text></svg>');

  // Bootstrap's data-api only auto-starts carousels present at window load.
  // Angular renders this one later, so start it manually.
  ngAfterViewInit() {
    const el = document.getElementById('carouselExampleAutoplaying');
    const bs = (window as any).bootstrap;
    if (el && bs) {
      bs.Carousel.getOrCreateInstance(el, { interval: 3000, ride: 'carousel' });
    }
  }

  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.onerror = null;
    img.src = this.placeholder;
  }
  ngOnInit() {
    this.apiService.getAllProductsApi().subscribe({
      next: (res) => {
        console.log("All Products");
        console.log(res)
        this.allProducts = res;
        if (!this.allProducts.length) {
          this.loadError = 'No products found. The database is empty - run the seed script in the backend (npm run seed).';
        }
      },
      error: (res) => {
        console.log(res)
        this.loadError = 'Cannot reach the backend at http://localhost:3000 (is it running and connected to MongoDB?).';
      }
    })
  }

  addToWishList(product: any) {
    if (sessionStorage.getItem("token")) {
      // add item to wishlist
      this.apiService.addToWishList(product).subscribe({
        next: (res: any) => {
          console.log("===add to wishlist resp===");
          console.log(res);
          this.apiService.getWishlistCount()
          Swal.fire({
            title: 'Success',
            text: `Successfully added to wishlist`,
            icon: 'success',
          });
        },
        error: (res: any) => {
          console.log(res);
          Swal.fire({
            title: 'Warning',
            text: `${res.error}`,
            icon: 'warning',
          });
        }
      })
    }
    else {
      Swal.fire({
        title: 'Warning',
        text: `Please Login`,
        icon: 'warning',
      });
    }
  }
  
  addToCart(product: any) {
    if (sessionStorage.getItem('token')) {
     Object.assign(product,{quantity:1})
      this.apiService.addToCart(product).subscribe({
        next: (res) => {
          Swal.fire({
            title: 'Success',
            text: `Successfully added to cart`,
            icon: 'success',
          });
          this.apiService.getCartCount();
        },
        error: (res) => {
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
        icon: 'warning',
      });
    }

  }
}
