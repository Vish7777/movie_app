import { Component, OnInit } from '@angular/core';
import { WishlistDataService } from '../userservices/wishlistdata.service';
import { Router } from '@angular/router';
import { WishlistService } from '../userservices/wishlist.service';
import { LoginService } from '../userservices/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  wishlistMovies: any[] = [];
 
  constructor(private wishlistDataService: WishlistDataService,
    private wishlistservice : WishlistService,
    private loginservice : LoginService,
    private router:Router) {}

  ngOnInit() {
    // Subscribe to changes in the wishlist data
    this.wishlistDataService.wishlistData$.subscribe((data) => {
      this.wishlistMovies = data;
    });
  }

  signOut() {
    // Clear username and token from local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUsername');

    // Redirect to the home page
    this.router.navigate(['']);
  }


  
  removeMovie(movieId: string) {
    const username = this.loginservice.getUsername();
  
    if (!username) {
      console.error('Username not found in local storage. Please log in.');
      return;
    }
  
    const movieToRemove = this.wishlistMovies.find(movie => movie.id === movieId);
  
    if (!movieToRemove) {
      console.error('Movie not found in wishlist.');
      return;
    }
  
    this.wishlistservice.removeFromWishlist(username, movieToRemove)
      .subscribe(
        (response) => {
          console.log('Movie removed from wishlist:', response);
          // Update the local wishlistMovies array if needed
          this.wishlistMovies = this.wishlistMovies.filter(movie => movie.id !== movieId);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Movie Deleted",
            showConfirmButton: false,
            timer: 2000
          });
        },
        (error) => {
          console.error('Error removing movie from wishlist', error);
        }
      );
  }

  clearAll() {
    const username = this.loginservice.getUsername();

    if (!username) {
      console.error('Username not found in local storage. Please log in.');
      return;
    }

    this.wishlistservice.clearWishlist(username).subscribe(
      () => {
        console.log('Wishlist cleared successfully.');
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Wishlist Cleared",
          showConfirmButton: false,
          timer: 2000
        });

        
        this.wishlistMovies = [];

       
      },
      (error) => {
        console.error('Error clearing wishlist', error);

        // Log the details of the error
        if (error instanceof HttpErrorResponse) {
          console.error('Status:', error.status);
          console.error('Response body:', error.error);
        }
      }
    );
  }
}
  