// UserloginComponent
import {  ElementRef, ViewChild, AfterViewInit } from '@angular/core';

import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../userservices/login.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from '../authentication/authentication.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements AfterViewInit {
  @ViewChild('targetElement') targetElement!: ElementRef;

  userName = '';
  password= '';
  errorMessage= '';
  passwordVisible = false;
  spinnerVisible = false;

  constructor(private loginService: LoginService, private router: Router,
    private spinner: NgxSpinnerService,private zone: NgZone, private cd: ChangeDetectorRef,
    private authService : AuthenticationService
    ) {}

    onClick(){
      console.log('on click')
    }

    login() {
      this.spinnerVisible = true;
      // this.authServiice.login();
    
      this.loginService.loginUser(this.userName, this.password).subscribe(
        (response) => {
          console.log('Login successful', response);
          this.authService.setAuthToken(response.token);
         
          Swal.fire({
            title: "Login Successful..!",
            text: "Enjoy your Movie Time.",
            imageUrl: "/assets/images/correct.gif",
            imageWidth: 380,
            imageHeight: 200,
            imageAlt: "Custom image"
          });
          this.router.navigate(['user/movies']); 
          this.spinnerVisible = false;
        },
        (error) => {
          console.error('Login failed', error);
          this.spinnerVisible = false;
    
          if (error.status === 404) {
            this.errorMessage = error.error || 'Login failed. Please check the credentials.';
          } else {
            if (error.status === 500) {
              this.errorMessage = 'Internal Server Error. Please try again later.';
            } else {
              Swal.fire({
                title: "Login Failed...!",
                text: "PLease check the credentials",
                imageUrl: "/assets/images/wrong.gif",
                imageWidth: 380,
                imageHeight: 200,
                imageAlt: "Custom image"
              });
              this.errorMessage = error.error || 'Login failed. Please check the credentials.';
            }
    
            // Highlight the input fields in red
            this.highlightErrorFields();
          }
        }
      );
    }
    
    highlightErrorFields() {
      // Add a CSS class to highlight the error
      const errorFieldClass = 'has-error';
      const userNameField = document.getElementById('userName');
      const passwordField = document.getElementById('password');
    
      if (userNameField) {
        userNameField.classList.add(errorFieldClass);
      }
    
      if (passwordField) {
        passwordField.classList.add(errorFieldClass);
      }
    }
    
    // Clear the error highlighting when the user corrects the input
    clearErrorHighlight() {
      const errorFieldClass = 'has-error';
      const userNameField = document.getElementById('userName');
      const passwordField = document.getElementById('password');
    
      if (userNameField) {
        userNameField.classList.remove(errorFieldClass);
      }
    
      if (passwordField) {
        passwordField.classList.remove(errorFieldClass);
      }
    }
    
    

  togglePasswordVisibility(field: string): void {
    const inputField = document.getElementById(field) as HTMLInputElement;
  
    if (field === 'password') {
      this.passwordVisible = !this.passwordVisible;
      inputField.type = this.passwordVisible ? 'text' : 'password';
    }
  }

  ngAfterViewInit(): void {
    if (this.targetElement) {
      this.targetElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
