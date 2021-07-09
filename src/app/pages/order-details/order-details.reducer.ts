import { createReducer, on } from '@ngrx/store';
import { UpdateProduct, UpdateOrder } from './order-details.actions';

 
const initialOrderState = {};
const initialProductsState: Object[]=[];
 
const _currentOrderReducer = createReducer(initialOrderState,
  on(UpdateOrder, (state,{currentOrder}) => {
    return currentOrder} ),
);

const _currentProductReducer = createReducer(initialProductsState,
  on(UpdateProduct,(state,{currentProducts})=>{
    return currentProducts;
  }))
 
export function currentOrderReducer(state, action) {
  return _currentOrderReducer(state, action);
}

export function currentProductsReducer(state,action){
  return _currentProductReducer(state,action);
}