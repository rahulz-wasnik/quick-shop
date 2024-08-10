import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ProductService } from '../../product.service';
import {
  productListingsFetched,
  productListingsFetchErrored,
  productListingsViewed,
} from '../actions';
import { Action } from '@ngrx/store';

@Injectable()
export class ProductEffects implements OnInitEffects {
  actions$ = inject(Actions);
  productService = inject(ProductService);

  ngrxOnInitEffects(): Action {
    return { type: '[Products] Product listings viewed' };
  }

  getProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productListingsViewed),
      switchMap(() =>
        this.productService.getProducts().pipe(
          map((res) => productListingsFetched({ products: res.data })),
          catchError(() => of(productListingsFetchErrored()))
        )
      )
    )
  );
}
