import { applyMiddleware } from 'redux';
import sagas, { run as runSagas } from '../rootSaga';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [sagas];

export const run = () => runSagas();

export default composeWithDevTools(applyMiddleware(...middleware));
