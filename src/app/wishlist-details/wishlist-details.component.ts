import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WishlistService } from '../service/wishlist.service';
import { IItem } from '../item';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-wishlist-details',
  templateUrl: './wishlist-details.component.html',
  styleUrls: ['./wishlist-details.component.css']
})
export class WishlistDetailsComponent implements OnInit {
  wishlistItems: IItem[] = [];
  errorMessage: string = '';
  imageWidth = 50;
  imageMargin = 2;
  successMessage: string = '';
  stringResult: string = '';
  pageTitle:string='';
  constructor(private router: Router, private wishlistService: WishlistService) { }

  ngOnInit() {
    this.fetchWishlistItems();
    this.pageTitle='Wishlist Page';
  }

  backToHome(): void {
    this.router.navigateByUrl('/home');
  }

  deleteItem(id: number) {
    this.errorMessage = '';
    this.successMessage='';
    //console.log("Item selected to delete: " + itemId);
    this.wishlistService.deleteItem(id).subscribe(
      results => {
        //console.log("Response for delete: " + results);
        this.successMessage = "Item deleted from wishlist";
        this.fetchWishlistItems();
      },
      error => {
        //console.log("error: ", error);
        this.errorMessage = error.statusText;
      }
    );
  }

  fetchWishlistItems() {
    this.wishlistService.getWishlistItems().subscribe(
      items => {
        this.wishlistItems = items;
        //console.log("----> ", this.wishlistItems);
      },
      error => this.errorMessage = error.statusText
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
