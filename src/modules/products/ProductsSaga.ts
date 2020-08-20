import { all, takeEvery, call, put } from 'redux-saga/effects';

import { GET_PRODUCTS } from './ProductsActions';

import { getProducts } from '../../services';
import { successAction, failureAction } from '../../store/type';

/**
 * Fetch products
 * */
function* fetchProductsHandler() {
    try {
        // fetch get products
        const result = yield call(getProducts);

        // check result exist
        if (result) {
            yield put({ type: successAction(GET_PRODUCTS), payload: result });
        } else {
            yield put({ type: failureAction(GET_PRODUCTS) });
        }
    } catch (e) {
        yield put({ type: failureAction(GET_PRODUCTS) });
    }
}

/**
 * Products Saga
 */
function* productsSaga() {
    yield all([takeEvery(GET_PRODUCTS, fetchProductsHandler)]);
}

export default productsSaga;
