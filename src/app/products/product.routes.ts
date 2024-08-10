import { Routes } from '@angular/router';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./products-container.component').then(
        (c) => c.ProductsContainerComponent
      ),
    // children: [
    //   {
    //     path: ':id',
    //     loadComponent: () =>
    //       import('./product-details/product-details.component').then(
    //         (c) => c.ProductDetailsComponent
    //       ),
    //   },
    // ],
  },
];
