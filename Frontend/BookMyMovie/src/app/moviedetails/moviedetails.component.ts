import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovieDto } from '../models/movie.dto';
import { LoginService } from '../userservices/login.service';
import { WishlistService } from '../userservices/wishlist.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.css']
})
export class MoviedetailsComponent {

  successMessage = '';

  isInWishlist = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MovieDto,
    private wishlistService: WishlistService,
    private loginService: LoginService,
    private cd: ChangeDetectorRef
    
  ) {
    this.successMessage = '';
  }

  addToWishlist(movie: MovieDto) {
    const username = this.loginService.getUsername();
    if (!username) {
      console.error('Username not found in local storage. Please log in.');
      return;
    }

    this.wishlistService.addToWishlist(username, movie)
    .subscribe(
      (response) => {
       
        this.isInWishlist = true; 
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Movie Added",
          showConfirmButton: false,
          timer: 2000
        });
        console.log('Movie added to wishlist successfully', response);
        this.cd.detectChanges();
      },
      (error) => {
        console.error('Error adding movie to wishlist', error);
      }
    );
}
}
