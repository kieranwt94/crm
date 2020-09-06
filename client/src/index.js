import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Layout from 'layouts';
import { Dashboard } from 'pages/dashboard';
import { BrandsList, BrandSingle, BrandCreate, BrandEdit } from 'pages/brands';
import { CustomersList, CustomerSingle, CustomerCreate, CustomerEdit } from 'pages/customers';
import { OrdersList, OrderSingle, OrderCreate, OrderEdit } from 'pages/orders';
import { ServicesList, ServiceSingle, ServiceCreate, ServiceEdit } from 'pages/services';
import { UsersList, UserSingle, UserCreate, UserEdit } from 'pages/users';
import Spinner from 'components/spinner/spinner';

import './styles/style.scss';

const routing = (
  <>
    <Router>
      <Layout>
        <Switch>
          <Route path="/" children={<Dashboard />} exact />
          <Route path="/brands" children={<BrandsList />} exact />
          <Route path="/brands/:id" children={<BrandSingle />} exact />
          <Route path="/customers" children={<CustomersList />} exact />
          <Route path="/orders" children={<OrdersList />} exact />
          <Route path="/services" children={<ServicesList />} exact />
        </Switch>
      </Layout>
    </Router>
    <Spinner />
  </>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);