import createSagaMiddleware from 'redux-saga';
import { fork, all } from 'redux-saga/effects';

import ProductsSaga from '../modules/products/ProductsSaga';

const sagaMiddleware = createSagaMiddleware();

export default sagaMiddleware;

function* root() {
    yield all([fork(ProductsSaga)]);
}

export const run = () => sagaMiddleware.run(root);
