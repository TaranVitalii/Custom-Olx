const namespace = 'PRODUCTS';
export const GET_PRODUCTS = `${namespace}/GET_PRODUCTS`;

export const getProducts = () => ({ type: GET_PRODUCTS });
