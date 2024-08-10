import { ProductFeatureState } from './products.reducer';

export * from './products.reducer';

export const PRODUCTS_REDUCER_FEATURE_KEY = 'marketList';

export interface AppState {
  [PRODUCTS_REDUCER_FEATURE_KEY]: ProductFeatureState;
}
