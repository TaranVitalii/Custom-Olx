import React from 'react';
import { ThemeContext } from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import theme from './components/Theme';
import Store from './store';
// Header components
import Header from './modules/header';
import Bag from './modules/header/pages/Bag';
// Product components
import Products from './modules/products/pages/Products';
import ProductInfo from './modules/products/pages/ProductInfo';

const App = () => (
    <ThemeContext.Provider value={theme}>
        <Store>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Header />

                        <Products />
                    </Route>
                    <Route path="/products/:productId">
                        <Header />

                        <ProductInfo />
                    </Route>
                    <Route path="/bag">
                        <Bag />
                    </Route>
                </Switch>
            </Router>
        </Store>
    </ThemeContext.Provider>
);

export default App;
