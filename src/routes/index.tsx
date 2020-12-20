import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';
import NotFound from '../pages/errors/NotFound';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/404" component={NotFound} />

    <Route path="/repositories/:repository+" component={Repository} />

    <Route render={() => <Redirect to="/" />} />
  </Switch>
);

export default Routes;
