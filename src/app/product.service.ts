import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http: HttpClient = inject(HttpClient);

  getProducts(): Observable<any> {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('bearer')}`,
    };
    return this.http.get('/api/v1/products', { headers });
  }
}
