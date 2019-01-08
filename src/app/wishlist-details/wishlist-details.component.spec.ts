import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistDetailsComponent } from './wishlist-details.component';
import { WishlistService } from '../service/wishlist.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('WishlistDetailsComponent', () => {
  let component: WishlistDetailsComponent;
  let fixture: ComponentFixture<WishlistDetailsComponent>;
  let mockWishlistService;
  let router: Router;
  let items;
  class MockRouter {
    navigate = jasmine.createSpy("navigate");
  }

  class MockActivatedRoute {
    navigate = jasmine.createSpy("navigate");
  }

  beforeEach(async(() => {
    items = [{
      itemId: 101,
      itemName: 'Shoes',
      itemDesc: 'Puma Shoes',
      itemImgUrl: 'https://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png',
      itemValue: 3500
    }];
    mockWishlistService = jasmine.createSpyObj(['getWishlistItems', 'deleteItem']);
    TestBed.configureTestingModule({
      declarations: [WishlistDetailsComponent],
      providers: [{ provide: WishlistService, useValue: mockWishlistService }, { provide: Router, useClass: MockRouter }, { provide: ActivatedRoute, useClass: MockActivatedRoute }],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistDetailsComponent);
    mockWishlistService.getWishlistItems.and.returnValue(of(items));
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
  });

  it('should create wishlist-details', () => {
    expect(component).toBeTruthy();
  });
  it('should have page title', ()=>{
    const wishlistForm = fixture.debugElement.componentInstance;
    expect(wishlistForm.pageTitle).toEqual('Wishlist Page');
  });

  it('should have valid item list in fetchWishlistItems', ()=>{
    mockWishlistService.getWishlistItems.and.returnValue(of(items));
    const wishlistForm = fixture.debugElement.componentInstance;
    expect(wishlistForm.wishlistItems.length).toEqual(1);
  });
  it('should delete an item to wishlist deleteItem',()=>{
    //mockWishlistService.deleteItem(101).returnValue(items);

  })
});
