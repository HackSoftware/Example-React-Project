import { Router, Route, Redirect, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { HOME_URL, LOGIN_URL } from 'config/urls';

import Home from 'pages/Home';
import Login from 'pages/Login';

export const history = createBrowserHistory();

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={HOME_URL} component={Home} />
        <Route exact path={LOGIN_URL} component={Login} />

        <Route exact path="/">
          <Redirect to={HOME_URL} />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
