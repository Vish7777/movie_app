import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { UserDetailsRequestDto } from "../models/user-details-request-dto";

@Injectable({
    providedIn: 'root'
  })
  export class RegistrationService {
    private apiUrl = 'http://ec2-3-109-247-37.ap-south-1.compute.amazonaws.com:8081/Registrationservice/api/v1/userprofile/create';
  
    constructor(private http: HttpClient) {}
  
    createUser(userDetails: UserDetailsRequestDto): Observable<any> {
      return this.http.post(this.apiUrl, userDetails);
    }
  }