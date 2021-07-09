import { createAction,props } from '@ngrx/store';
import { Order } from 'src/app/models/order.modal';

export const UpdateOrderList = createAction('[Current Order] UpdateOrder',props<{
    Type: String,
    OrderList: Order[],
}>()
);
