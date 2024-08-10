import { createAction, props } from '@ngrx/store';
import { Product } from '../../../shared/models/product.model';

export const productListingsViewed = createAction(
  '[Products] Product listings viewed'
);
export const productListingsFetched = createAction(
  '[Products] Product listings fetched',
  props<{ products: Product[] }>()
);

export const productListingsFetchErrored = createAction(
  '[Products] Error occured when fetching product listings'
);
