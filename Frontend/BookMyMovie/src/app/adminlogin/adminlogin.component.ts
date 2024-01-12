import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from '../userservices/login.service';
import { AdminLoginService } from '../adminservices/adminlogin.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent {
  userName= '';
  password = '';
  errorMessage = '';
  passwordVisible = false;

  constructor(private loginService: AdminLoginService, private router: Router,
    private spinner: NgxSpinnerService) {}

  login() {
    this.spinner.show();
    this.loginService.loginUser(this.userName, this.password).subscribe(
      (response) => {
        console.log('Login successful', response);
        this.spinner.hide();
        this.router.navigate(['user/movies']); 
      },
      (error) => {
        alert("please check the credentials !!!");
        console.error('Login failed', error);
        this.spinner.hide();
        if (error.status === 500) {
          this.errorMessage = 'Internal Server Error. Please try again later.';
        } else {
          this.errorMessage = error.error || 'Login failed. Please try again.';
        }
      }
    );
  }

  togglePasswordVisibility(field: string): void {
    const inputField = document.getElementById(field) as HTMLInputElement;
  
    if (field === 'password') {
      this.passwordVisible = !this.passwordVisible;
      inputField.type = this.passwordVisible ? 'text' : 'password';
    }
  }
}
