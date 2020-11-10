import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Layout from 'layouts';
import { Dashboard } from 'pages/dashboard';
import Login from 'pages/login';
import { BrandsList, BrandSingle } from 'pages/brands';
import { CustomersList, CustomerSingle } from 'pages/customers';
import { OrdersList, OrderSingle } from 'pages/orders';
import { ServicesList, ServiceSingle } from 'pages/services';
import { UsersList, UserSingle } from 'pages/users';
import Spinner from 'components/spinner/spinner';
import PrivateRoute from 'components/routing';
import store from './store';
import { loadUser } from 'actions/auth';
import { setAuthToken } from 'utils';

import './styles/style.scss';

const App = () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute exact path="/brands" component={BrandsList} />
            <PrivateRoute exact path="/brands/:id" component={BrandSingle} />
            <PrivateRoute exact path="/customers" component={CustomersList} />
            <PrivateRoute exact path="/customers/:id" component={CustomerSingle} />
            <PrivateRoute exact path="/orders" component={OrdersList} />
            <PrivateRoute exact path="/orders/:id" component={OrderSingle} />
            <PrivateRoute exact path="/services" component={ServicesList} />
            <PrivateRoute exact path="/services/:id" component={ServiceSingle} />
            <PrivateRoute exact path="/users" component={UsersList} />
            <PrivateRoute exact path="/users/:id" component={UserSingle} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Layout>
      </Router>
      <Spinner />
    </Provider>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);