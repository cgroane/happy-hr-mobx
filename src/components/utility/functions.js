import React from 'react';
import resultStyle from './../styles/resultStyle';
import ResultCard from './../ResultsView/ResultCard/ResultCard';

export default {
    // utilities and constants
    days: function(arr) {
        return arr.map((cur, ind, array) => {
            // console.log(arr)
            return (
                ind == array.length-1 ?
                <li key={cur.ind} >{cur}</li> : <li key={cur.ind} >{cur}, </li>
            )
        })
    },
    mapToCard: function (arr) {
        return arr.map((cur, ind, array) => {
            return <ResultCard 
                        key={cur.ind} 
                        value={cur.id} 
                        title={cur.title} 
                        restaurant={cur.restaurant} 
                        distance={cur.distance} 
                        days={cur.days} 
                        details={cur.details} 
                    />
        })
    },
}