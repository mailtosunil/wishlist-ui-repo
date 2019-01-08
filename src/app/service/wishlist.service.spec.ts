import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WishlistService } from './wishlist.service';

describe('WishlistService', () => {
  let httpTestingController: HttpTestingController;
  let service: WishlistService;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

 // httpTestingController = TestBed.get(HttpTestingController);
  //service = TestBed.get(WishlistService);

  it('should be created', () => {
    const service: WishlistService = TestBed.get(WishlistService);
    expect(service).toBeTruthy();
  });
});
