import { HttpRequest, provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { mockGetProductsResponse } from '../shared/mock-test-data';

describe('Product service', () => {
  let service: ProductService;
  let mockHttp: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ProductService,
      ],
    });

    service = TestBed.inject(ProductService);
    mockHttp = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that no unmatched requests are left
    mockHttp.verify();
  });

  it('should fetch all the products', () => {
    // ACT & ASSERT
    service.getProducts().subscribe((res) => {
      expect(res.data).toHaveSize(1);
    });

    const mockRequest = mockHttp.expectOne((req: HttpRequest<any>) => {
      return req.method === 'GET';
    }, '');

    expect(mockRequest.request.url).toBe('assets/data/product.json');

    mockRequest.flush(mockGetProductsResponse);
  });
});
