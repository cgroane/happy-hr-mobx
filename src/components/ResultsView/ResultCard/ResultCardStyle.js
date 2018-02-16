import {css} from 'emotion';

export default {
    dealCard: css`
        width: 90%;
        height: 60%;
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
            padding-left: 0;
            & li {
                margin: 3px;
            }
        }
        & h2 {
            margin-bottom: 5px;
        }
    `,
    restaurantDetails: css`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-bottom 1px solid #365DD6;
        & span {
            font-size: 0.7rem;
            color: slategrey;
        }
    `
}