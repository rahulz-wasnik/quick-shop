import { Component, input } from '@angular/core';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  product = input<Product>();
}
