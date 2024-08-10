import { mockProducts } from '../../../shared/mock-test-data';
import { Product } from '../../../shared/models/product.model';
import { productListingsFetched } from '../actions';
import { ProductFeatureState, productReducer } from './products.reducer';

describe('Product reducer', () => {
  const initialState: ProductFeatureState = {
    products: [],
  };

  it('should update products', () => {
    const updatedState = productReducer(
      initialState,
      productListingsFetched({ products: mockProducts })
    );

    expect(updatedState.products).toHaveSize(1);
  });
});
