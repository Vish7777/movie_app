// Import necessary modules and services
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MovieListService } from '../userservices/movielist.service';
import { MatDialog } from '@angular/material/dialog';
import { MovieDto } from '../models/movie.dto';
import { MoviedetailsComponent } from '../moviedetails/moviedetails.component';
import { Router } from '@angular/router';
import { LoginService } from '../userservices/login.service';
import { WishlistService } from '../userservices/wishlist.service';
import { WishlistDataService } from '../userservices/wishlistdata.service';
import { AuthGuard } from '../authentication/AuthGuard';
import { AuthenticationService } from '../authentication/authentication.service';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit{
 

  movies: MovieDto[] = [];
  wishlistMovies: any[] = [];
  displayMovies: MovieDto[] = [];
  searchForm: FormGroup; // Reactive Form
  searchResults: MovieDto[] | undefined = [];
  availableGenres: string[] = ['Action', 'Drama', 'Crime', 'Comedy']; 
  selectedGenre: string | null = null;
  minRating: number | undefined;
  maxRating: number | undefined;
  filteredMovies: MovieDto[] | undefined = [];
  showRatingFilter= false;
  

  // Inject necessary services and modules
  constructor(
    private movieListService: MovieListService,
    private dialog: MatDialog,
    private router: Router,
    private wishlistService: WishlistService,
    private loginService: LoginService,
    private wishlistDataService: WishlistDataService,
    private formBuilder: FormBuilder,
    private authGuard: AuthGuard,
    public authService : AuthenticationService
  ) {
    // Initialize the form group
    this.searchForm = this.formBuilder.group({
      searchTitle: [''], // Set default value or leave it empty
    });
  }

  ngOnInit() {
    if(this.authService.isLoggedIn())
      this.getTop100Movies();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getUsername(): string | null {
    return localStorage.getItem('authUsername');
  }

  reloadPage() {
    this.authService.isLoggedIn();
    window.location.reload();
  }

  // Fetch top 100 movies
  getTop100Movies() {
    const token: string = localStorage.getItem('authToken') || '';

    this.movieListService.getTop100Movies(token).subscribe(
      (data: MovieDto[]) => {
        this.movies = data;
        this.updateDisplayMovies(this.movies);
      },
      (error) => {
        console.error('Error fetching top 100 movies', error);
      }
    );
  }

  // Open movie details dialog
  openMovieDetails(movie: MovieDto) {
    this.authService.isLoggedIn();
    this.dialog.open(MoviedetailsComponent, {
      data: movie,
    });
  }

  // Handle sign-out
  signOut() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUsername');
    this.router.navigate(['']);
  }

  // Fetch wishlist and update data
  onClickWishlistIcon() {
    this.authService.isLoggedIn();
    const username = this.loginService.getUsername();

    if (!username) {
      console.error('Username not found in local storage. Please log in.');
      return;
    }

    this.wishlistService.getWishlist(username).subscribe(
      (wishlist: { movies: any[]; }) => {
        this.wishlistMovies = wishlist.movies;
        this.wishlistDataService.updateWishlistData(this.wishlistMovies);
        console.log('Wishlist movies:', this.wishlistMovies);
      },
      (error: any) => {
        console.error('Error fetching wishlist', error);
      }
    );
  }

  // Search movies using the entered title
  searchMovies() {
    this.authService.isLoggedIn();
    const title = this.searchForm.get('searchTitle')?.value;
    const formattedTitle = this.formatTitle(title);

    const encodedTitle = encodeURIComponent(formattedTitle);
    console.log('Formatted Title: ', formattedTitle);
    console.log('Encoded Title: ', encodedTitle);

    this.movieListService.searchMovies(encodedTitle).subscribe(
      (data: MovieDto[]) => {
        this.searchResults = data;
        this.updateDisplayMovies(this.searchResults);
      },
      (error: any) => {
        alert(title + ' is not present please check the spelling');
        console.error('Error searching movies', error);
      }
    );
  }

  private formatTitle(title: string): string {
    return title
      .toLowerCase()
      .replace(/\b\w{3,}\b/g, (word) => word.charAt(0).toUpperCase() + word.slice(1))
      .replace(/\b\w{1,2}\b/g, (word) => word.toUpperCase());
  }

  selectGenre(genre: string) {
    this.authService.isLoggedIn();
    console.log('Selected genre:', genre);
    this.selectedGenre = genre;
    this.getMoviesByGenre(genre);
  }

  getMoviesByGenre(genre: string) {
    this.authService.isLoggedIn();
    this.movieListService.getMoviesByGenres([genre]).subscribe(
      (data: MovieDto[]) => {
        this.movies = data;
        this.updateDisplayMovies(this.movies);
      },
      (error: any) => {
        console.error('Error fetching movies by genre', error);
      }
    );
  }

  filterMoviesByRating(minRating: number, maxRating: number) {
    this.authService.isLoggedIn();
    this.movieListService.getMoviesByRatingRange(minRating, maxRating).subscribe(
      (data: MovieDto[]) => {
        this.filteredMovies = data;
        this.updateDisplayMovies(this.filteredMovies);
      },
      (error: any) => {
        console.error('Error filtering movies by rating', error);
      }
    );
  }

  onRatingFilterSubmit() {
    this.authService.isLoggedIn();
    if (this.minRating !== undefined && this.maxRating !== undefined) {
      this.filterMoviesByRating(this.minRating, this.maxRating);
    }
  }

  toggleRatingFilter() {
    this.authService.isLoggedIn();
    this.showRatingFilter = !this.showRatingFilter;
  }

  private updateDisplayMovies(movies: MovieDto[]) {
    this.displayMovies = movies;
  }

  

}

