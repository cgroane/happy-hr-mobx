import {css} from 'emotion';

export default {
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
        }
    `
}