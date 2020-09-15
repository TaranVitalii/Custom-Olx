import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import sagas, { run as runSagas } from '../rootSaga';

const middleware = [sagas];

export const run = () => runSagas();

export default composeWithDevTools(applyMiddleware(...middleware));
