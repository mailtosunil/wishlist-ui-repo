import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IItem } from '../item';
import { Product } from '../product';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private fetchItemUrl = '/wishlist/items';
  private deleteItemUrl = '/wishlist/deleteItem';
  private addItemUrl = '/wishlist/addItem';
  private productUrl = '/wishlist/products';
  constructor(private http: HttpClient) { }


  getWishlistItems(): Observable<IItem[]> {
    return this.http.get<IItem[]>(this.fetchItemUrl);
  }
  deleteItem(id: number): Observable<IItem> {
    return this.http.delete<IItem>(this.deleteItemUrl + "/" + id, httpOptions);
  }

  addItem(prodId: string): Observable<IItem> {
    return this.http.post<IItem>(this.addItemUrl, prodId, httpOptions);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl);
  }
}
