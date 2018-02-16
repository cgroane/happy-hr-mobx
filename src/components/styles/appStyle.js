import {css} from 'emotion';
import React from 'react';


export default {
    app: css`
        width: 100vw;
        height: 100%;
        display: flex;
        flex-direction: column;
        font-family: 'Roboto', sans-serif;
    `,
    appContainer: css`
        position: absolute;
        top: 10vh;
        right: 0;
        left: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        height: 90vh;
        width:100%;
  `,
    header: css`
        position: fixed;
        top: 0;
        left: 0;
        height: 10vh;
        width: 100vw;
    `,
    footer: css`
        position: fixed;
        background: ghostwhite;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 40px;
        z-index: 90;
        padding: 5px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items:center;
        font-size: 1.2rem;
    `
}

// @font-face: {
//     font-family: 'North-Header';
//     font-style: bold;
//     font-weight: 800;
//     src:    local('./assets/font/North-Regular.woff')
//             local('./assets/font/North-Regular.woff2');
// }