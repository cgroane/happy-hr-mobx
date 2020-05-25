import React from 'react';
import {Switch, Route} from 'react-router-dom';
import ResultsView from './components/ResultsView/ResultsView';
import AddNew from './components/AddNew/AddNew';
import observableDealsStore from './mobx/deals';
import { useObserver } from 'mobx-react';
import { ResultsHooked, HookedStoreProvider } from './components/ResultsHooked/ResultsHooked';
import { FunctionalResults } from './components/FunctionalResults/FunctionalResults';

// pass store to routes

const ResultsViewObserver = () => useObserver(() => <ResultsView store={observableDealsStore} />)
const HookedResultsObserver = () => <HookedStoreProvider><ResultsHooked/></HookedStoreProvider>
const FunctionalResultsView = () => <FunctionalResults store={observableDealsStore} />
const AddNewObserver = () => useObserver(() => <AddNew store={observableDealsStore} />)

export default (
    <Switch>
        <Route exact path="/" component={ResultsViewObserver}/>
        <Route path="/add_new" component={AddNewObserver} />
        <Route path ="/hooked" component={HookedResultsObserver} />
        <Route path="/functional-results" component={FunctionalResultsView} />
    </Switch>
)