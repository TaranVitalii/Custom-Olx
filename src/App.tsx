import React from 'react';
import { ThemeContext } from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import theme from './components/Theme';
import Store from './store';
import Header from './modules/header';
import Products from './modules/products';

const App = () => (
    <ThemeContext.Provider value={theme}>
        <Store>
            <Header />
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Products />
                    </Route>
                </Switch>
            </Router>
        </Store>
    </ThemeContext.Provider>
);

export default App;
