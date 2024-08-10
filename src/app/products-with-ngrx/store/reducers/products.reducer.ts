import { createFeature, createReducer, on } from '@ngrx/store';
import { Product } from '../../../shared/models/product.model';
import {
  productListingsFetched,
  productListingsFetchErrored,
} from '../actions';

export interface ProductFeatureState {
  products: Product[];
}

export const initialState: ProductFeatureState = {
  products: [],
};

export const productReducer = createReducer(
  initialState,
  on(
    productListingsFetched,
    (state, { products }): ProductFeatureState => ({ ...state, products })
  ),
  on(productListingsFetchErrored, (state): ProductFeatureState => {
    console.error('An error occured when fetching products');
    return state;
  })
);

export const productsFeature = createFeature({
  name: 'products',
  reducer: productReducer,
});

export const { name, reducer, selectProductsState, selectProducts } =
  productsFeature;
