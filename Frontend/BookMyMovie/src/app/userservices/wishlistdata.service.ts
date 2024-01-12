// wishlist-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistDataService {
  private wishlistDataSubject = new BehaviorSubject<any[]>([]);
  wishlistData$: Observable<any[]> = this.wishlistDataSubject.asObservable();

  updateWishlistData(data: any[]): void {
    this.wishlistDataSubject.next(data);
  }
}
