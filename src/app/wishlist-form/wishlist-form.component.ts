import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IItem } from '../item';
import { WishlistService } from '../service/wishlist.service';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Product } from '../product';

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
  itemValues:string[] = ['Shoes', 'Headphone', 'Television', 'Mobile'];
  products: Product[] = [];
  constructor(private router: Router, private wishlistService: WishlistService) { }

  ngOnInit() {
    this.getProducts();
  }

  addItem(): void {
    this.errorMessage = '';
    this.successMessage = '';
    console.log("item selected: ", this.itemName);
    if (this.itemName === '' || this.itemName === 'Choose...') {
      this.errorMessage = "Please select Item";
    } else {
     /* if (this.itemName === 'Shoes') {
        this.item = new IItem();
        this.item.type = this.itemName;
        this.item.desc = 'Puma Shoes';
        this.item.imgUrl = 'https://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png';
        this.item.value = 3500;
      } else if (this.itemName === 'Headphone') {
        this.item = new IItem();
        this.item.type = this.itemName;
        this.item.desc = 'Sony Headphone';
        this.item.imgUrl = 'https://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png';
        this.item.value = 1500;
      } else if (this.itemName === 'Mobile') {
        this.item = new IItem();
        this.item.type = this.itemName;
        this.item.desc = 'Nokia Mobile';
        this.item.imgUrl = 'https://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png';
        this.item.value = 20500;
      } else if (this.itemName === 'Television') {
        this.item = new IItem();
        this.item.type = this.itemName;
        this.item.desc = 'LG Television';
        this.item.imgUrl = 'https://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png';
        this.item.value = 40500;
      }*/
      //console.log("Item sent from component: ", this.item);
      this.wishlistService.addItem(this.itemName).subscribe(
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

  getProducts():void {
    this.wishlistService.getProducts().subscribe(
      products => {
        this.products = products;
        console.log("Products ----> ", this.products);
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
