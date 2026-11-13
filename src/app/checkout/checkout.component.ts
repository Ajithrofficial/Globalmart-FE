import { Component } from '@angular/core';
import { FormArrayName, FormBuilder, Validators } from '@angular/forms';
import {
  IPayPalConfig,
  ICreateOrderRequest
} from 'ngx-paypal';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  public payPalConfig?: IPayPalConfig;
  makePayment = false;
  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) { }
  checkoutForm = this.fb.group({
    uname: ["", [Validators.required]],
    houseName: ["", [Validators.required]],
    place: ["", [Validators.required]],
    landmark: [""]
  })
  proceedPayment() {
    this.makePayment = true
    this.apiService.emptyCartApi().subscribe((res) => {
      this.apiService.getCartCount();
      Swal.fire({
        title: 'Success',
        text: `Payment successfull`,
        icon: 'success',
      });
    })
    this.router.navigateByUrl('/')
    //this.initConfig()
  }
  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'EUR',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: '9.99'
              }
            }
          },
          items: [{
            name: 'Enterprise Subscription',
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'EUR',
              value: '9.99',
            },
          }]
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        // success case
        // empty cart
        // navigate to hoe page
        this.apiService.emptyCartApi().subscribe((res) => {
          this.apiService.getCartCount();
          Swal.fire({
            title: 'Success',
            text: `Payment successfull`,
            icon: 'success',
          });
        })
        this.router.navigateByUrl('/')
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);

      },
      onError: err => {
        console.log('OnError', err);

      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);

      }
    };
  }
}
