import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) { }
  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })

  registerUser() {
    if (this.registerForm.valid) {
      const username = this.registerForm.value.username;
      const email = this.registerForm.value.email;
      const password = this.registerForm.value.password;
      const user = {
        username: username,
        email: email,
        password: password
      }
      // call the api method to register user
      this.apiService.userRegisterApi(user).subscribe({
        next: (res) => {
          console.log("user register");
          console.log(res)
          Swal.fire({
            title: 'Success',
            text: `${res}`,
            icon: 'success',
          });
          this.router.navigateByUrl("/user/login")
        },
        error: (err) => {
          console.log(err)
          if (err.status === 406) {
            Swal.fire({
              title: 'Error!',
              text: 'User already exist',
              icon: 'warning',
            })
          }
          else{
            Swal.fire({
              title: 'Error!',
              text: 'Something went wrong',
              icon: 'error',
            })
          }

        }
      })
    }
    else {
      alert("Not valid")
    }
  }
}
