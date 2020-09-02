import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './rootReducer';
import middlewares, { run } from './middlewares';

import { childrenProps } from '../interfaces';

const initialState = {};

const store = createStore(reducers, initialState, middlewares);
run();

const storeWrapper = ({ children }: childrenProps) => <Provider store={store}>{children}</Provider>;

export default storeWrapper;
