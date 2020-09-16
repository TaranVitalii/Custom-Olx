import * as R from 'ramda';
import { all, takeEvery, call, put } from 'redux-saga/effects';

import { createProductStatus } from 'models';
import { createProductRequest, createOrderRequest } from 'services';
import { productTypes, createOrderProps } from 'interfaces';

import { createProductTypes, createOrderTypes, CREATE_PRODUCT, CREATE_ORDER } from './HeaderActions';
import { successAction } from 'store/type';

/**
 * Create order
 */
function* createProductHandler(action: createProductTypes) {
    const product: productTypes | null = R.pathOr(null, ['payload', 'product'], action);
    const setCreatedStatus: ((value: string | null) => void | undefined) | null = R.pathOr(
        null,
        ['payload', 'setCreatedStatus'],
        action,
    );
    const setIsLoading: ((value: boolean) => void | undefined) | null = R.pathOr(
        null,
        ['payload', 'setIsLoading'],
        action,
    );

    try {
        if (!R.isNil(product)) {
            const result = yield call(createProductRequest, { product });

            if (result && !R.isNil(setCreatedStatus) && !R.isNil(setIsLoading)) {
                yield call(setCreatedStatus, createProductStatus.created);
                yield call(setIsLoading, false);
            }
        }
    } catch (e) {
        if (!R.isNil(setCreatedStatus) && !R.isNil(setIsLoading)) {
            yield call(setCreatedStatus, createProductStatus.failed);
            yield call(setIsLoading, false);
        }
        //show error modal
    }
}

/**
 * Create order handler
 */
function* createOrderHandler(action: createOrderTypes) {
    const payload: createOrderProps | null = R.propOr(null, 'payload', action);

    try {
        if (!R.isNil(payload)) {
            yield call(createOrderRequest, payload);

            yield put({ type: successAction(CREATE_ORDER) });
        }
    } catch (e) {
        // show error modal
    }
}
/**
 * Products Saga
 */
function* headerSaga() {
    yield all([takeEvery(CREATE_PRODUCT, createProductHandler)]);
    yield all([takeEvery(CREATE_ORDER, createOrderHandler)]);
}

export default headerSaga;
