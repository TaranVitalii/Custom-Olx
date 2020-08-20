import { GET_PRODUCTS } from './ProductsActions';

import { successAction, failureAction } from '../../store/type';

import { productSummaryProps } from '../../interfaces';

interface initialStateProps {
    productsReducer: {
        productsList?: Array<productSummaryProps>;
    };
}

const initialState = {
    productsList: null,
};

export default function Products(state = initialState, action: any) {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
            };
        case successAction(GET_PRODUCTS):
            return {
                ...state,
                productsList: action.payload.items,
            };
        case failureAction(GET_PRODUCTS):
            return {
                ...state,
                productsList: null,
            };

        default:
            return state;
    }
}

export const getProductsSelector = (state: initialStateProps) => state.productsReducer.productsList;
