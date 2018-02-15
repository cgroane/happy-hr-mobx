import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux'
import {injectGlobal} from 'emotion';
import './index.css';
import App from './App';
import store from './store';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App /> 
        </Provider>
    </BrowserRouter>,

document.getElementById('root'));
registerServiceWorker();

injectGlobal`
@import url('https://fonts.googleapis.com/css?family=Roboto:700');
@import url('https://fonts.googleapis.com/css?family=BioRhyme+Expanded|Roboto:700');
body {
    background-color: ghostwhite;
    padding: 0;
    margin: 0;
    font-family: 'BioRhyme Expanded', serif;

}

`