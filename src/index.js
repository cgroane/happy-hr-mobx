import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {injectGlobal} from 'emotion';
import './index.css';
import App from './App';
import observableDealsStore from './mobx/deals.js';

import { useLocalStore } from 'mobx-react';

export const StoreContext = React.createContext()

const StoreProvider = ({ children }) => {
    return (
    <StoreContext.Provider value={observableDealsStore} >{children}</StoreContext.Provider>
    )
}

ReactDOM.render(
    <BrowserRouter>
        <StoreProvider>
            <App store={observableDealsStore} /> 
        </StoreProvider>
    </BrowserRouter>
    ,

document.getElementById('root'));


injectGlobal`
@import url('https://fonts.googleapis.com/css?family=Roboto:700');
@import url('https://fonts.googleapis.com/css?family=BioRhyme+Expanded|Roboto:700');
body {
    padding: 0;
    margin: 0;
    font-family: 'BioRhyme Expanded', serif;
    

}
a {
    text-decoration: none;
    color: #365DD6
}

`