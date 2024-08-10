import { Component, inject } from '@angular/core';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductService } from './product.service';
import { ProductListingComponent } from './product-listings/product-listings.component';

@Component({
  selector: 'app-products-container',
  standalone: true,
  imports: [ProductListingComponent, ProductDetailsComponent],
  template: `
    <app-products
      [products]="products()"
      [(productId)]="productId"
    ></app-products>
    <app-product-details [product]="product()"></app-product-details>
  `,
  providers: [ProductService],
})
export class ProductsContainerComponent {
  productService = inject(ProductService);

  products = this.productService.products;

  productId = this.productService.productId;

  product = this.productService.product;
}
