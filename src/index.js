import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {injectGlobal} from 'emotion';
import './index.css';
import App from './App';
import observableDealsStore from './mobx/store.js';

ReactDOM.render(
    
        
        <BrowserRouter>
            <App store={observableDealsStore} /> 
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