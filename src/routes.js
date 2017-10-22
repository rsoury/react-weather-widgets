import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import NotFound from './components/404/NotFound';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path='*' exact={true} component={NotFound} />
  </Route>
);
