import { createAction,props } from '@ngrx/store';

export const UpdateOrder = createAction('[Current Order] UpdateOrder',props<{
    currentOrder: Object,
}>()
);

export const UpdateProduct = createAction('[Current Products] UpdateProduct',props<{
    currentProducts: Object[],
}>()
);