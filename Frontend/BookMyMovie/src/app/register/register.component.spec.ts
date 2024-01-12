// import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
// import { RegistrationComponent } from './register.component';
// import { RegistrationService } from '../userservices/registration.service';
// import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { of, throwError } from 'rxjs';
// import { UserDetailsRequestDto } from '../models/user-details-request-dto';

// describe('RegistrationComponent', () => {
//   let component: RegistrationComponent;
//   let fixture: ComponentFixture<RegistrationComponent>;
//   let registrationService: RegistrationService;
//   let router: Router;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [RegistrationComponent],
//       providers: [
//         RegistrationService,
//         FormBuilder,
//         { provide: Router, useValue: { navigate: jasmine.createSpy('navigateByUrl') } },
//       ],
//       imports: [ReactiveFormsModule],
//     });

//     fixture = TestBed.createComponent(RegistrationComponent);
//     component = fixture.componentInstance;
//     registrationService = TestBed.inject(RegistrationService);
//     router = TestBed.inject(Router);
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should initialize form and validators', () => {
//     expect(component.registrationForm.get('confirmPassword')).toBeTruthy();
//     expect(component.registrationForm.validator).toBeTruthy();
//   });

//   it('should check if password is strong', () => {
//     expect(component.isPasswordStrong('Abcd123!')).toBe(true);
//     expect(component.isPasswordStrong('weakpassword')).toBe(false);
//   });

//   it('should register user successfully', fakeAsync(() => {
//     spyOn(registrationService, 'createUser').and.returnValue(of({ message: 'Registration successful' }));

//     component.registerUser();
//     tick();

//     expect(component.registrationMessage).toEqual('Registration successful');
//     expect(router.navigate).toHaveBeenCalledWith(['user/login']);
//     expect(component.spinnerVisible).toBe(false);
//   }));

//   it('should handle registration failure', fakeAsync(() => {
//     const errorResponse = { status: 409 }; // Customize the error response as needed
//     spyOn(registrationService, 'createUser').and.returnValue(throwError(errorResponse));

//     component.registerUser();
//     tick();

//     expect(component.errorMessage).toEqual('Username or email already exists.');
//     expect(component.spinnerVisible).toBe(false);
//   }));

//   it('should handle generic registration failure', fakeAsync(() => {
//     const errorResponse = { status: 500 }; // Customize the error response as needed
//     spyOn(registrationService, 'createUser').and.returnValue(throwError(errorResponse));

//     component.registerUser();
//     tick();

//     expect(component.errorMessage).toEqual('User registration failed. Please try again later.');
//     expect(component.spinnerVisible).toBe(false);
//   }));

//   it('should handle validation error during registration', () => {
//     // Manually set the form error to simulate required fields not filled
//     component.registrationForm.setErrors({ required: true });

//     spyOn(registrationService, 'createUser');

//     component.registerUser();

//     expect(component.errorMessage).toEqual('Please fill in all the required fields.');
//     expect(component.spinnerVisible).toBe(false);
//   });

//   it('should toggle password visibility', () => {
//     component.togglePasswordVisibility('password');
//     expect(component.passwordVisible).toBe(true);

//     component.togglePasswordVisibility('confirmPassword');
//     expect(component.confirmPasswordVisible).toBe(true);
//   });

  
// });
