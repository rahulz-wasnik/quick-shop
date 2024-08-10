import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      import('./products/product.routes').then((r) => r.PRODUCT_ROUTES),
  },
  {
    path: 'products-with-ngrx',
    loadChildren: () =>
      import('./products-with-ngrx/product.routes').then(
        (r) => r.PRODUCT_ROUTES
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
