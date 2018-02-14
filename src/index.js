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
body {
    background-color: ghostwhite;
    padding: 0;
    margin: 0;
    @font-face: {
        font-family: 'North-Header';
        font-style: bold;
        font-weight: 800;
        src: local('./assets/font/North-Regular.woff'),
        local('./assets/font/North-Regular.woff2');
    }
}
`