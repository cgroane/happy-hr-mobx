import {css} from 'emotion';
import React from 'react';

export default {
    app:css`
        width: 100vw;
        height: 100%;
        
    `,
    appContainer: css`
        position: absolute;
        top: 20%;
        right: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        height: 80%;
        width:100%
  `,
    componentContainer: css`
        display: block;
    `,
    header: css`
        position: fixed;
        top: 0;
        left: 0;
        height: 20%;
        width: 100vw;
    `
}