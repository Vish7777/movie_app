// movie-list.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieDto } from '../models/movie.dto';

@Injectable({
  providedIn: 'root'
})
export class MovieListService {
  public apiUrl = 'http://ec2-3-109-247-37.ap-south-1.compute.amazonaws.com:8081/Wishlistservice/api/v1/wishlist/movie';

  constructor(private http: HttpClient) {}

  getTop100Movies(token: string): Observable<MovieDto[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<MovieDto[]>(`${this.apiUrl}/topdb100`, { headers });
  }

  searchMovies(title: string): Observable<MovieDto[]> {
    const token: string = localStorage.getItem('authToken') ?? '';
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    //const encodedTitle = encodeURIComponent("Schindler's List");
    const url = `http://ec2-13-200-187-70.ap-south-1.compute.amazonaws.com:8081/Wishlistservice/api/v1/wishlist/movie/byTitle?title=${title}`;

    return this.http.get<MovieDto[]>(url, { headers });
  }

  getMoviesByGenres(genres: string[]): Observable<MovieDto[]> {
    const token: string = localStorage.getItem('authToken') ?? '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.apiUrl}/byGenres`;

    // Include genres as query parameters
    const params = {
      genres: genres.join(',')
    };

    return this.http.get<MovieDto[]>(url, { headers, params });
  }

  getMoviesByRatingRange(minRating: number, maxRating: number): Observable<MovieDto[]> {
    const url = `${this.apiUrl}/byRating`;
    const params = {
      minRating: minRating.toString(),
      maxRating: maxRating.toString()
    };

    const token: string = localStorage.getItem('authToken') ?? '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<MovieDto[]>(url, { headers, params });
  }


}
