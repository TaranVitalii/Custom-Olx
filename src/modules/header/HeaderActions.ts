import { productProps, createOrderProps } from 'interfaces';

const namespace = 'HEADER';
export const CREATE_PRODUCT = `${namespace}/CREATE_PRODUCT`;
export const CREATE_ORDER = `${namespace}/CREATE_ORDER`;

export interface createProductTypes {
    type: typeof CREATE_PRODUCT;
    payload: productProps;
}

export interface createOrderTypes {
    type: typeof CREATE_ORDER;
    payload: createOrderProps;
}

export const createProduct = (payload: productProps) => ({
    type: CREATE_PRODUCT,
    payload,
});

export const createOrder = (payload: createOrderProps) => ({
    type: CREATE_ORDER,
    payload,
});
