import { AppResponse } from '../models/app.model';
import { Product } from '../models/product.model';

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Galaxy S3',
    category: 'Electronics',
    subCategory: 'mobile',
    price: 1000000,
    ratings: 4,
    reviews: [],
    unitsSoldInLastMonth: 1000,
  },
];

export const mockGetProductsResponse: AppResponse<Product[]> = {
  data: mockProducts,
};
