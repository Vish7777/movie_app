import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { MoviesComponent } from './movies.component';
import { MovieListService } from '../userservices/movielist.service';
import { WishlistService } from '../userservices/wishlist.service';
import { WishlistDataService } from '../userservices/wishlistdata.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MovieDto } from '../models/movie.dto';
import { MoviedetailsComponent } from '../moviedetails/moviedetails.component';
import { LoginService } from '../userservices/login.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Add this import

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  let matDialog: MatDialog;
  let loginService: LoginService;
  let movieListService: MovieListService;
  let wishlistService: WishlistService;
  let wishlistDataService: WishlistDataService;
  let authService: AuthenticationService;
  let router: Router;
  let spinnerService: NgxSpinnerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviesComponent],
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        RouterTestingModule,
        HttpClientTestingModule, // Add this line
      ],
      providers: [
        FormBuilder,
        MovieListService,
        WishlistService,
        WishlistDataService,
        AuthenticationService,
        { provide: MatDialog, useValue: {} },
        { provide: NgxSpinnerService, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    matDialog = TestBed.inject(MatDialog);
    loginService = TestBed.inject(LoginService);
    movieListService = TestBed.inject(MovieListService);
    wishlistService = TestBed.inject(WishlistService);
    wishlistDataService = TestBed.inject(WishlistDataService);
    authService = TestBed.inject(AuthenticationService);
    router = TestBed.inject(Router);
    spinnerService = TestBed.inject(NgxSpinnerService);

    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch top 100 movies on initialization if user is logged in', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    spyOn(movieListService, 'getTop100Movies').and.returnValue(of([]));

    component.ngOnInit();

    expect(movieListService.getTop100Movies).toHaveBeenCalled();
  });

  

  it('should sign out and redirect to the home page', () => {
    spyOn(localStorage, 'removeItem');
    spyOn(router, 'navigate');

    component.signOut();

    expect(localStorage.removeItem).toHaveBeenCalledWith('authToken');
    expect(localStorage.removeItem).toHaveBeenCalledWith('authUsername');
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

  it('should fetch wishlist and update wishlist data', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    spyOn(loginService, 'getUsername').and.returnValue('testUsername');
    spyOn(wishlistService, 'getWishlist').and.returnValue(of({ movies: [] }));
    spyOn(wishlistDataService, 'updateWishlistData');

    component.onClickWishlistIcon();

    expect(wishlistService.getWishlist).toHaveBeenCalledWith('testUsername');
    expect(wishlistDataService.updateWishlistData).toHaveBeenCalledWith([]);
  });

  it('should search movies', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    spyOn(movieListService, 'searchMovies').and.returnValue(of([]));
    component.searchForm.get('searchTitle')?.setValue('testTitle');

    component.searchMovies();

    expect(movieListService.searchMovies).toHaveBeenCalled();
  });
});
