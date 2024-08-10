import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { ProductEffects } from './product.effects';
import { ProductService } from '../../product.service';
import { Product } from '../../../shared/models/product.model';
import { AppResponse } from '../../../shared/models/app.model';
import { productListingsFetched, productListingsViewed } from '../actions';

import { hot, cold } from 'jasmine-marbles';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  mockGetProductsResponse,
  mockProducts,
} from '../../../shared/mock-test-data';

describe('Product effects', () => {
  let actions$ = new Observable<Action>();
  let effects: ProductEffects;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductEffects,
        ProductService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideMockActions(() => actions$),
      ],
    });
    effects = TestBed.inject(ProductEffects);
    productService = TestBed.inject(ProductService);
  });

  it('should fetch all the products', () => {
    // ARRANGE
    const action = productListingsViewed();
    const outcome = productListingsFetched({ products: mockProducts });

    actions$ = hot('-a', { a: action });

    const response = cold('-a|', { a: mockGetProductsResponse });

    spyOn(productService, 'getProducts').and.returnValue(response);

    const expected = cold('--b', { b: outcome });

    // ACT & ASSERT
    expect(effects.getProducts$).toBeObservable(expected);
  });
});
