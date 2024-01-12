import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from 'src/app/userservices/login.service';
import { throwError } from 'rxjs';


describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService],
    });

    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a login request', inject(
    [LoginService],
    (loginService: LoginService) => {
      const mockResponse = { token: 'testToken', userName: 'testUser' };

    
      loginService.loginUser('testUser', 'testPassword').subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

    
      const req = httpMock.expectOne('http://localhost:8081/Loginservice/api/v1/auth/login?userName=testUser&password=testPassword');

   
      expect(req.request.method).toEqual('GET');

      req.flush(mockResponse);
    }
  ));

  it('should handle errors in login request', inject(
    [LoginService],
    (loginService: LoginService) => {
      // Mock a client-side error
      const clientError = new ErrorEvent('client error');
      spyOn(loginService, 'loginUser').and.returnValue(throwError(clientError));
  
      let actualError: any;
      loginService.loginUser('username', 'password').subscribe(
        () => fail('Expected an error, but got a success response'),
        (error) => {
          actualError = error;
        }
      );
  
     
      expect(actualError).toEqual(jasmine.any(ErrorEvent));

    }
  ));
  
  
});
