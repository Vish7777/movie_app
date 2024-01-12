import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WishlistComponent } from './wishlist.component';
import { WishlistDataService } from '../userservices/wishlistdata.service';
import { Router } from '@angular/router';
import { WishlistService } from '../userservices/wishlist.service';
import { LoginService } from '../userservices/login.service';
import { Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

class MockWishlistDataService {
  wishlistData$ = of([]);
}

class MockRouter {
  navigate() {
    console.log('navigating')
  }
}

class MockWishlistService {
  removeFromWishlist() {
    return of({});
  }

  clearWishlist() {
    return of({});
  }
}

class MockLoginService {
  getUsername() {
    return 'testUsername';
  }
}

describe('WishlistComponent', () => {
  let component: WishlistComponent;
  let fixture: ComponentFixture<WishlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WishlistComponent],
      providers: [
        { provide: WishlistDataService, useClass: MockWishlistDataService },
        { provide: Router, useClass: MockRouter },
        { provide: WishlistService, useClass: MockWishlistService },
        { provide: LoginService, useClass: MockLoginService },
      ],
    });

    fixture = TestBed.createComponent(WishlistComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  

  it('should clear wishlist', () => {
    spyOn(TestBed.inject(WishlistService), 'clearWishlist').and.returnValue(of({}));

    component.clearAll();

    expect(TestBed.inject(WishlistService).clearWishlist).toHaveBeenCalledWith('testUsername');
    expect(component.wishlistMovies).toEqual([]);
  });

  it('should handle error when clearing wishlist', () => {
    spyOn(TestBed.inject(WishlistService), 'clearWishlist').and.returnValue(
      new Observable((observer) => {
        observer.error(new HttpErrorResponse({ status: 500, statusText: 'Internal Server Error', error: 'Server error' }));
      })
    );

    spyOn(console, 'error');

    component.clearAll();

    expect(console.error).toHaveBeenCalledWith('Error clearing wishlist', jasmine.any(HttpErrorResponse));
    // Add more expectations based on your error handling logic
  });
});
