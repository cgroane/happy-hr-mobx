import {css} from 'emotion';

export default {
    formContainer: css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `,
    formText: css`
        background: none;
        font-size: 25px;
        margin: 5px;
        border: none;
        border-bottom: 2px solid #365DD6;
        text-align: center;
         focus{
            outline: none;
        }
    `,
    checkBoxContainer: css`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        text-align: center;
        flex-wrap: wrap;
    `,
    checks: css`
    display: block;
    margin: 5px;
    text-align: center;
    & label {
        display: block;
    }
    `
}