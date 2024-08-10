import { Observable } from 'rxjs';
import { Product } from '../shared/models/product.model';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppResponse } from '../shared/models/app.model';

@Injectable()
export class ProductService {
  http = inject(HttpClient);

  getProducts(): Observable<AppResponse<Product[]>> {
    return this.http.get<AppResponse<Product[]>>('assets/data/product.json');
  }
}
