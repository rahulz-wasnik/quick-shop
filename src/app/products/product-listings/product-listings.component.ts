import { Component, input, model } from '@angular/core';
import { DerivedProduct, Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './product-listings.component.html',
  styleUrl: './product-listings.component.scss',
  providers: [],
})
export class ProductListingComponent {
  products = input([], {
    transform: toDerievedProducts,
  });

  productId = model<number>();
}

export function toDerievedProducts(products: Product[]): DerivedProduct[] {
  if (!products) {
    return [];
  }
  return products.map((product) => ({
    ...product,
    mostPurchased: product.unitsSoldInLastMonth > 100,
  }));
}
