import { createReducer, on } from '@ngrx/store';
import { UpdateProductList } from './products.actions';

 
const initialProductListState = [];

 
const _productListReducer = createReducer(initialProductListState,
  on(UpdateProductList, (state,{ProductList}) => {
    return ProductList} ),
);
 
export function productListReducer(state, action) {
  return _productListReducer(state, action);
}