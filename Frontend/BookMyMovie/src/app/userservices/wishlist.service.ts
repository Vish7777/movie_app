// wishlist.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieDto } from '../models/movie.dto';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private apiUrl = 'http://ec2-3-109-247-37.ap-south-1.compute.amazonaws.com:8081/Wishlistservice/api/v1/wishlist';

  constructor(private http: HttpClient, private loginService: LoginService) {}

  addToWishlist(username: string, movie: MovieDto): Observable<any> {
    const endpoint = `${this.apiUrl}/${username}/add`;

    // Retrieve token from your login service or wherever it's stored
    const token = this.loginService.getToken();

    // Include token in the headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    return this.http.post(endpoint, movie, { headers });
  }

  getWishlist(username: string): Observable<any> {
    const endpoint = `${this.apiUrl}/${username}`;
    const token = this.loginService.getToken();

    // Include token in the headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get(endpoint,{headers});
  }

  // wishlist.service.ts

removeFromWishlist(username: string, movie: MovieDto): Observable<any> {
  // Extract only the necessary properties from the movie object
  const { rank, title, description, image, bigImage, thumbnail, genre, year } = movie;

  // Create a new object with the required structure
  const payload = {
    
    rank,
    title,
    description,
    image,
    bigImage,
    thumbnail,
    genre,
    year
    // Add other properties as needed
  };

  const endpoint = `${this.apiUrl}/${username}/remove`;
  const token = this.loginService.getToken();

  // Include token in the headers
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  });

  return this.http.request('DELETE', endpoint, { headers, body: payload });
}

clearWishlist(username: string): Observable<any> {
  const endpoint = `${this.apiUrl}/${username}/clear`;
  const token = this.loginService.getToken();

  // Include token in the headers
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  return this.http.delete(endpoint, { headers });
}


}
