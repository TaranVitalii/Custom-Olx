import { combineReducers } from 'redux';

import productsReducer, { STATE_KEY as PRODUCTS_STATE_KEY } from '../modules/products/ProductsReducer';

export default combineReducers({ [PRODUCTS_STATE_KEY]: productsReducer });
