import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) { }
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })
  login() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    console.log(email, password)
    const user = {
      email: email,
      password: password,
    }
    this.apiService.userLoginApi(user).subscribe({
      next: (res: any) => {
        console.log("user login ");
        console.log(res);
        sessionStorage.setItem("username",res.existingUser.username)
        sessionStorage.setItem("token",res.token)
        Swal.fire({
          title: 'Login Successfully',
          text: `${res.existingUser.username} logged in successfully`,
          icon: 'success',
        });
        this.router.navigateByUrl("/")
      },
      error: (res) => {
        Swal.fire({
          title: 'Error',
          text: `Invalid email or password`,
          icon: 'error',
        });
      }
    })
  }
}
