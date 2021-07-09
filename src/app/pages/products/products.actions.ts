import { createAction,props } from '@ngrx/store';

export const UpdateProductList = createAction('[Current Product] UpdateProduct',props<{
    ProductList: any[],
}>()
);
