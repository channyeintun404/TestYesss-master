import { createReducer, on } from '@ngrx/store';
import { Order } from 'src/app/models/order.modal';
import { UpdateOrderList } from './orders.actions';

 
const initialOrderListState =[];

 
const _orderListReducer = createReducer(initialOrderListState,
  on(UpdateOrderList, (state,{Type,OrderList}) => { 
    console.log("Type is",Type);
    switch(Type) {
      case "Clear":
        return initialOrderListState;
        case "Update":
        return [...state,...OrderList];
    }       
   } ),
);
 
export function orderListReducer(state, action) {
  return _orderListReducer(state, action);
}