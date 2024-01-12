// userlogin.component.spec.ts

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UserloginComponent } from './userlogin.component';
import { LoginService } from '../userservices/login.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from '../authentication/authentication.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { of, throwError } from 'rxjs';

class MockLoginService {
  loginUser() {
    return of({});
  }
}

class MockRouter {
  navigate() {
    console.log('navigating')
  }
}

class MockNgxSpinnerService {
  show() {
    console.log('show')
  }
  hide() {
    console.log('hide')
  }
}

class MockAuthenticationService {
  setAuthToken() {
    console.log('Authentication')

  }
}

describe('UserloginComponent', () => {
  let component: UserloginComponent;
  let fixture: ComponentFixture<UserloginComponent>;
  let loginService: LoginService;
  let router: Router;
  let spinnerService: NgxSpinnerService;
  let authService: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserloginComponent],
      providers: [
        { provide: LoginService, useClass: MockLoginService },
        { provide: Router, useClass: MockRouter },
        { provide: NgxSpinnerService, useClass: MockNgxSpinnerService },
        { provide: AuthenticationService, useClass: MockAuthenticationService },
      ],
      imports: [NgxSpinnerModule],
    });
    fixture = TestBed.createComponent(UserloginComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService);
    router = TestBed.inject(Router);
    spinnerService = TestBed.inject(NgxSpinnerService);
    authService = TestBed.inject(AuthenticationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle login success', fakeAsync(() => {
    // Mock login service response
    spyOn(loginService, 'loginUser').and.returnValue(of({ token: 'testToken' }));
    spyOn(authService, 'setAuthToken');
    spyOn(router, 'navigate');
    

  
    component.login();
    tick(1000);

   
    expect(authService.setAuthToken).toHaveBeenCalledWith('testToken');
    expect(router.navigate).toHaveBeenCalledWith(['user/movies']); 
   
  }));

  it('should handle login failure', fakeAsync(() => {
   
    spyOn(loginService, 'loginUser').and.returnValue(
      throwError({ message: 'Login failed. Please check the credentials.', status: 404 })
    );
  

    component.login();
    tick(); 
  
   
    expect(component.errorMessage).toEqual('Login failed. Please check the credentials.');
  }));
  
  
  
  

});
