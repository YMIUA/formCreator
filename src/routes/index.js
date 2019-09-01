import React from 'react'
import { BrowserRouter, Route } from "react-router-dom";

import Home from './Home'
import NewForm from './NewForm'
import EditForm from './EditForm'
import SeeAllForms from './SeeAllForms'


const Routes = () =>
    (
        <BrowserRouter>
            <Route path="/" exact component={Home} />
            <Route path="/newForm" component={NewForm} />
            <Route path="/editForm" component={EditForm} />
            <Route path="/seeAllForms" component={SeeAllForms} />
        </BrowserRouter>
    )

export default Routes