import {css} from 'emotion';
import React from 'react';
export default {
    //styles
    gmap: css`
        padding: 0;
        margin: 0;
        /* position: absolute; */
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        height: 100%;
        width: 100vw;
    `,
    resultsContainer: css`
        display: inline-block;
        width: 100vw;
        height:100%;
        overflow-y: scroll;

    `,

    mapContainer: css`
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100vw;
        height: 100%;
        z-index: 1;
        @media(max-width: 768px){
            width: 0vw;
            display: none
        }
    `,

    dealList: css`
        position: absolute;
        top: 15px;
        left: 10px;
        padding: 10px;
        width: 30%;
        height: 90%;
        overflow-y: scroll;
        z-index: 2;
        @media(max-width: 768px) {
            width: 100vw;
        };
        background: ghostwhite;
    `,
    dealCard: css`
        width: 90%;
        height: 80%;
        display: flex;
        background: white;
        flex-direction: column;
        margin: 15px;
        padding: 10px;
        & h1 {
            
            border-bottom: 2px solid #365DD6;
        }
        & ul {
            list-style: none;
            display: flex;
            flex-direction: row;
            & li {
                margin: 3px;
            }
            & hover {
                background: #365DD6;
                color: white
            }
        }
        overflow-x: scroll
    `,
    header: css`
        position: fixed;
        top: 0;
        left: 0;
        height: 10vh;
        width: 100vw;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-around;
        align-items: stretch;
        align-content: stretch;
        padding: 15px;
        border: 1px solid white;
    `,
    filter: css`
        height: 100%;
        border-right: 1px solid ghostwhite;
        border-radius: 0;
    `
    // dealCard details

}
