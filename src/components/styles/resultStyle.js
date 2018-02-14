import {css} from 'emotion';
import React from 'react';
export default {
    //styles
    resultsContainer: css`
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 100vw;
        height:100%;
    `,

    mapContainer: css`
        bottom: 0;
        right: 0;
        width: 50vw;
        height: 100%;
    `,

    dealList: css`
        padding: 10px;
        width: 50%;
        overflow-y: scroll;
    `,
    dealCard: css`
        width: 90%;
        height: 80%;
        display: flex;
        flex-direction: column;
        & h1 {
            font-family: 'North-Header';
            border-bottom: 2px solid #365DD6;
        }
        & ul {
            list-style: none;
            display: flex;
            flex-direction: row;
            & li {
                margin: 3px;
            }
        }
    `,
    // dealCard details

}
