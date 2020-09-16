import createSagaMiddleware from 'redux-saga';
import { fork, all } from 'redux-saga/effects';

import ProductsSaga from 'modules/products/ProductsSaga';
import HeaderSaga from 'modules/header/HeaderSaga';

const sagaMiddleware = createSagaMiddleware();

export default sagaMiddleware;

function* root() {
    yield all([fork(ProductsSaga), fork(HeaderSaga)]);
}

export const run = () => sagaMiddleware.run(root);
