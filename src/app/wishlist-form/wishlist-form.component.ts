import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IItem } from '../item';
import { WishlistService } from '../wishlist.service';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-wishlist-form',
  templateUrl: './wishlist-form.component.html',
  styleUrls: ['./wishlist-form.component.css']
})
export class WishlistFormComponent implements OnInit {
  itemName: string = 'Choose...';
  errorMessage: string = '';
  successMessage: string = '';
  item: IItem;
  constructor(private router: Router, private wishlistService: WishlistService) { }

  ngOnInit() {
  }

  addItem(): void {
    this.errorMessage = '';
    this.successMessage='';
    //console.log("item selected: ", this.itemName);
    if(this.itemName === '' || this.itemName === 'Choose...'){
      this.errorMessage = "Please select Item";
    }else{
      if (this.itemName === 'Shoes') {
        this.item = new IItem();
        this.item.itemName = this.itemName;
        this.item.itemDesc = 'Puma Shoes';
        this.item.itemImgUrl = 'https://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png';
        this.item.itemValue = 3500;
      } else if (this.itemName === 'Headphone') {
        this.item = new IItem();
        this.item.itemName = this.itemName;
        this.item.itemDesc = 'Sony Headphone';
        this.item.itemImgUrl = 'https://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png';
        this.item.itemValue = 1500;
      } else if (this.itemName === 'Mobile') {
        this.item = new IItem();
        this.item.itemName = this.itemName;
        this.item.itemDesc = 'Nokia Mobile';
        this.item.itemImgUrl = 'https://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png';
        this.item.itemValue = 20500;
      } else if (this.itemName === 'Television') {
        this.item = new IItem();
        this.item.itemName = this.itemName;
        this.item.itemDesc = 'LG Television';
        this.item.itemImgUrl = 'https://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png';
        this.item.itemValue = 40500;
      }
      //console.log("Item sent from component: ", this.item);
      this.wishlistService.addItem(this.item).subscribe(
        results => {
          //console.log("Response for add: " + results);
          this.successMessage = "Item added to wishlist";
        },
        error => {
          //console.log("error: ", error);
          //console.log("error.message: ", error.statusText);
          this.errorMessage = error.statusText;
        }
      );
    }
  }
  backToHome(): void {
    this.router.navigateByUrl('/home');
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
