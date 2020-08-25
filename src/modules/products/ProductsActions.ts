const namespace = 'PRODUCTS';
export const FETCH_PRODUCTS = `${namespace}/GET_PRODUCTS`;
export const FETCH_PRODUCT_BY_ID = `${namespace}/FETCH_PRODUCT_BY_ID`;
export const ADD_TO_BAG = `${namespace}/ADD_TO_BAG`;

export interface fetchProductByIdAction {
    type: typeof FETCH_PRODUCT_BY_ID;
    payload: {
        productId: string;
    };
}

export interface addToBagAction {
    type: typeof ADD_TO_BAG;
    payload: {
        productId: string;
    };
}

export const fetchProducts = () => ({ type: FETCH_PRODUCTS });

export const fetchProductById = (productId: fetchProductByIdAction) => ({
    type: FETCH_PRODUCT_BY_ID,
    payload: { productId },
});

export const addToBag = (productId: string) => ({
    type: ADD_TO_BAG,
    payload: {
        productId,
    },
});
