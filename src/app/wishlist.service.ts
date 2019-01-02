import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { IItem } from './item';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private fetchItemUrl = '/api/wishlist/items';
  private deleteItemUrl = '/api/wishlist/deleteItem';
  private addItemUrl = 'api/wishlist/addItem';
  constructor(private http: HttpClient) { }

  /*getWishlistItems(): Observable<IItem[]> {
    return this.http.get<IItem[]>(this.fetchItemUrl).pipe(
      tap(data => console.log('wishlist items: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }*/
  
  getWishlistItems(): Observable<IItem[]> {
    return this.http.get<IItem[]>(this.fetchItemUrl);
  }
  deleteItem(itemId: number):Observable<IItem>{
    return this.http.delete<IItem>(this.deleteItemUrl+"/"+itemId, httpOptions);
  }

  addItem(item: IItem): Observable<IItem>{
    return this.http.post<IItem>(this.addItemUrl,item, httpOptions);
  }
}
