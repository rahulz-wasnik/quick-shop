import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, Signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, map, Observable, switchMap } from 'rxjs';
import { AppResponse } from '../shared/models/app.model';
import { Product } from '../shared/models/product.model';

@Injectable()
export class ProductService {
  private readonly http: HttpClient = inject(HttpClient);

  readonly products: Signal<Product[]> = toSignal(
    this.http
      .get<AppResponse<Product[]>>('assets/data/products.json')
      .pipe(map((res) => res.data)),
    { initialValue: [] }
  );

  productId = signal(0);

  getProductDetails: Observable<Product> = toObservable(this.productId).pipe(
    filter((id) => id != 0),
    switchMap(() =>
      this.http
        .get<AppResponse<Product>>('assets/data/product.json')
        .pipe(map((res) => res.data))
    )
  );

  readonly product: Signal<Product | undefined> = toSignal(
    this.getProductDetails,
    {
      initialValue: undefined,
    }
  );
}
