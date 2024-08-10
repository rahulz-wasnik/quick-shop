import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../../shared/models/product.model';
import { selectProducts } from '../store/reducers';
import { ProductsListingsComponent } from './products-listings.component';

@Component({
  selector: 'app-products-listing-container',
  standalone: true,
  imports: [ProductsListingsComponent, CommonModule],
  template: `
    <app-products-listings
      [products]="(products$ | async) ?? []"
      [productsFromSignal]="products()"
    ></app-products-listings>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListingContainerComponent {
  store = inject(Store);

  products$: Observable<Product[]> = this.store.select(selectProducts);

  products = this.store.selectSignal(selectProducts);
}
