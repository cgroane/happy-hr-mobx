import React from 'react';
import resultStyle from './../styles/resultStyle';
import AddNewStyle from './../AddNew/AddNewStyle';
import ResultCard from './../ResultsView/ResultCard/ResultCard';
import Element from 'react-scroll';

export default {
    // utilities and constants
    days: function(arr) {
        return arr.map((cur, ind, array) => {
            return (
                ind == array.length-1 ?
                <li key={ind} >{cur}</li> : <li key={ind} >{cur}, </li>
            )
        })
    },
    mapToCard: function (arr) {
        return arr.map((cur, ind, array) => {
            return (
                <Element name={cur.id} key={ind} >
                    <ResultCard 
                        key={ind} 
                        value={cur.id} 
                        title={cur.title} 
                        restaurant={cur.restaurant} 
                        distance={cur.distance} 
                        days={cur.days} 
                        details={cur.details} 
                    />
                </Element>
            )
        })
    },
    daysBoxes: function(arr, onChangeFunc) {
        return arr.map((cur, ind, array) => {
            return (
                <div className={`${AddNewStyle.checks}`} key={ind} >
                    <label>
                        <input type="checkbox" name={cur} value={cur} onChange={onChangeFunc} />{cur}
                    </label>
                </div>
            )
        })
    }
}