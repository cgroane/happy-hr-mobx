import React from 'react';
import resultStyle from './../styles/resultStyle';

export default {
    // utilities and constants
    days: function(arr) {
        return arr.map((cur, ind, array) => {
            console.log(arr)
            return (
                ind == array.length-1 ?
                <li>{cur}</li> : <li>{cur}, </li>
            )
        })
    },

}