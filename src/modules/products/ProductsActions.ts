const namespace = 'PRODUCTS';
export const FETCH_PRODUCTS = `${namespace}/GET_PRODUCTS`;
export const FETCH_PRODUCT_BY_ID = `${namespace}/FETCH_PRODUCT_BY_ID`;
export const ADD_TO_BAG = `${namespace}/ADD_TO_BAG`;
export const REMOVE_FROM_ORDER = `${namespace}/REMOVE_FROM_ORDER`;
export const INCREASE_PRODUCT_COUNT = `${namespace}/INCREASE_PRODUCT_COUNT`;
export const DECREASE_PRODUCT_COUNT = `${namespace}/DECREASE_PRODUCT_COUNT`;
export const UPDATE_PRODUCT_COUNT = `${namespace}/UPDATE_PRODUCT_COUNT`;

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

export interface removeFromOrderAction {
    type: typeof REMOVE_FROM_ORDER;
    payload: {
        productId: string;
    };
}

export interface increaseProductCountAction {
    type: typeof INCREASE_PRODUCT_COUNT;
    payload: {
        productId: string;
    };
}

export interface decreaseProductCountAction {
    type: typeof DECREASE_PRODUCT_COUNT;
    payload: {
        productId: string;
    };
}

export interface updateProductCountAction {
    type: typeof UPDATE_PRODUCT_COUNT;
    payload: {
        productId: string;
        count: number;
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

export const removeFromOrder = (productId: string) => ({
    type: REMOVE_FROM_ORDER,
    payload: {
        productId,
    },
});

export const increaseProductCount = (productId: string) => ({
    type: INCREASE_PRODUCT_COUNT,
    payload: {
        productId,
    },
});

export const decreaseProductCount = (productId: string) => ({
    type: DECREASE_PRODUCT_COUNT,
    payload: {
        productId,
    },
});

export const updateProductCount = (productId: string, count: number) => ({
    type: UPDATE_PRODUCT_COUNT,
    payload: {
        productId,
        count,
    },
});
