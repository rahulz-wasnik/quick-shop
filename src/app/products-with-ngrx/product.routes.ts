import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { productsFeature } from './store/reducers';
import { provideEffects } from '@ngrx/effects';
import { ProductEffects } from './store/effects/product.effects';
import { ProductService } from './product.service';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./products-listings/products-listing-container.component').then(
        (c) => c.ProductsListingContainerComponent
      ),
    providers: [
      provideState(productsFeature),
      provideEffects([ProductEffects]),
      ProductService,
    ],
  },
];
