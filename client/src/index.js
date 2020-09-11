import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Layout from 'layouts';
import { Dashboard } from 'pages/dashboard';
import { Login } from 'pages/login';
import { BrandsList, BrandSingle, BrandCreate, BrandEdit } from 'pages/brands';
import { CustomersList, CustomerSingle, CustomerCreate, CustomerEdit } from 'pages/customers';
import { OrdersList, OrderSingle, OrderCreate, OrderEdit } from 'pages/orders';
import { ServicesList, ServiceSingle, ServiceCreate, ServiceEdit } from 'pages/services';
import { UsersList, UserSingle, UserCreate, UserEdit } from 'pages/users';
import Spinner from 'components/spinner/spinner';

import './styles/style.scss';

const App = () => (
  <>
    <Router>
      <Layout>
        <Switch>
          <Route path="/login" children={<Login />} />
          <Route path="/brands" children={<BrandsList />} />
          <Route path="/brands/:id" children={<BrandSingle />} />
          <Route path="/customers" children={<CustomersList />} />
          <Route path="/customers/:id" children={<CustomerSingle />} />
          <Route path="/orders" children={<OrdersList />} />
          <Route path="/orders/:id" children={<OrderSingle />} />
          <Route path="/services" children={<ServicesList />} />
          <Route path="/services/:id" children={<ServiceSingle />} />
          <Route path="/" children={<Dashboard />} />
        </Switch>
      </Layout>
    </Router>
    <Spinner />
  </>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);