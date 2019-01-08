import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistFormComponent } from './wishlist-form.component';
import { WishlistService } from '../service/wishlist.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('WishlistFormComponent', () => {
  let component: WishlistFormComponent;
  let fixture: ComponentFixture<WishlistFormComponent>;
  let mockWishlistService;
  let mockRouter;
  let products;
  beforeEach(async(() => {
    products = [{
      itemId: 101,
      itemName: 'Shoes',
      itemDesc: 'Puma Shoes',
      itemImgUrl: 'https://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png',
      itemValue: 3500
    }];
    mockWishlistService = jasmine.createSpyObj(['addItem','getProducts']);
    mockRouter= jasmine.createSpyObj;
    TestBed.configureTestingModule({
      imports:[FormsModule],
      declarations: [ WishlistFormComponent ],
      providers:[{provide:WishlistService, useValue:mockWishlistService},{provide: Router, useValue: mockRouter}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistFormComponent);
    mockWishlistService.getProducts.and.returnValue(of(products));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create wishlist-form', () => {
    expect(component).toBeTruthy();
  });

  it('should have page title', ()=>{
    const wishlistForm = fixture.debugElement.componentInstance;
    expect(wishlistForm.pageTitle).toEqual('Add Item to Wishlist');
  });

  it('should have a valid product', ()=>{
    mockWishlistService.getProducts.and.returnValue(of(products));
    const wishlistForm = fixture.debugElement.componentInstance;
    expect(wishlistForm.products.length).toEqual(1);
  })
});
