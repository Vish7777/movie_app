import { Component, OnInit } from '@angular/core';
import { UserDetailsRequestDto } from '../models/user-details-request-dto';
import { RegistrationService } from '../userservices/registration.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],

})
export class RegistrationComponent  implements AfterViewInit {
  @ViewChild('targetElement') targetElement!: ElementRef;
  
  userDetails: UserDetailsRequestDto = new UserDetailsRequestDto();
  registrationMessage = '';
  errorMessage='';
  registrationForm: FormGroup;

  passwordVisible = false;
  confirmPasswordVisible = false;

  spinnerVisible= false;

  



  constructor(
    private registrationService: RegistrationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.registrationForm = this.formBuilder.group({
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  isPasswordStrong(password: string): boolean {
    const strongPasswordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    return strongPasswordRegex.test(password);
  }
  
  
  

  registerUser() {
    this.spinnerVisible = true;
    if (this.registrationForm.errors?.['required']) {
      this.errorMessage = 'Please fill in all the required fields.';
      this.spinnerVisible = false;
      return;
    }
  
    this.registrationService.createUser(this.userDetails)
      .subscribe(
        response => {
          console.log('User registration successful', response);
          this.registrationMessage = response.message;
          Swal.fire({
            title: "Registration Successful..!",
            imageUrl: "/assets/images/success1.gif",
            imageWidth: 380,
            imageHeight: 200,
            imageAlt: "Custom image"
          });
          this.router.navigate(['user/login']);
          this.spinnerVisible = false;
        },
        error => {
          console.error('User registration failed', error);
  
          if (error.status === 409) {
            this.errorMessage = 'Username or email already exists.';
          } else if (error.status === 400) {
            if (error.error && error.error.message) {
              this.errorMessage = error.error.message;
            } else {
              this.errorMessage = 'Invalid request. Please check your input.';
            }
          } else {
            this.errorMessage = 'User registration failed. Please try again later.';
          }
  
          this.spinnerVisible = false;
        }
      );
  }
  

  
 // In your Angular component
 togglePasswordVisibility(field: string): void {
  const inputField = document.getElementById(field) as HTMLInputElement;

  if (field === 'password') {
    this.passwordVisible = !this.passwordVisible;
    inputField.type = this.passwordVisible ? 'text' : 'password';
  } else if (field === 'confirmPassword') {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
    inputField.type = this.confirmPasswordVisible ? 'text' : 'password';
  }
}

resetForm() {
 
  this.userDetails = new UserDetailsRequestDto();
  this.errorMessage = '';
  

  this.registrationForm.reset();

  
  this.registrationForm.markAsPristine();
  this.registrationForm.markAsUntouched();
}

ngAfterViewInit(): void {
  if (this.targetElement) {
    this.targetElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

}

  
