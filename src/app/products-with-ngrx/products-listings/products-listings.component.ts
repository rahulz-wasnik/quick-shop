import {
  ChangeDetectionStrategy,
  Component,
  input,
  Input,
} from '@angular/core';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-products-listings',
  standalone: true,
  imports: [],
  templateUrl: './products-listings.component.html',
  styleUrl: './products-listings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListingsComponent {
  @Input() products!: Product[];

  productsFromSignal = input<Product[]>();
}
