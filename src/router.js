import React from 'react';
import {Switch, Route} from 'react-router-dom';
import ResultsView from './components/ResultsView/ResultsView';
import AddNew from './components/AddNew/AddNew';

export default (
    <Switch>
        <Route exact path="/" component={ResultsView}/>
        <Route path="/add_new" component={AddNew} />
    </Switch>
)