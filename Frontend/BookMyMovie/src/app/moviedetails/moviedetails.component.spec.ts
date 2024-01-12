import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MoviedetailsComponent } from './moviedetails.component';
import { WishlistService } from '../userservices/wishlist.service';
import { LoginService } from '../userservices/login.service';
import { ChangeDetectorRef } from '@angular/core';
import { of } from 'rxjs';

class MockWishlistService {
  addToWishlist() {
    return of({});
  }
}

class MockLoginService {
  getUsername() {
    return 'testuser';
  }
}

describe('MoviedetailsComponent', () => {
  let component: MoviedetailsComponent;
  let fixture: ComponentFixture<MoviedetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoviedetailsComponent],
      providers: [
        { provide: WishlistService, useClass: MockWishlistService },
        { provide: LoginService, useClass: MockLoginService },
        { provide: ChangeDetectorRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ],
    });

    fixture = TestBed.createComponent(MoviedetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
