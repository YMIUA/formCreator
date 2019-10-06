import React from 'react'
import { BrowserRouter, Route } from "react-router-dom";

import Home from './Home'
import FormConstructorPage from './FormConstructorPage'
import Fills from './Fills'
import Form from './Form'


const Routes = () => (
  <BrowserRouter>
    <Route path="/" exact component={Home} />
    <Route path="/newForm" component={FormConstructorPage} />
    <Route path="/editForm/:formId" component={FormConstructorPage} />
    <Route path="/fills/:formId" component={Fills} />
    <Route path="/form/:formId" component={Form} />
  </BrowserRouter>
);

export default Routes