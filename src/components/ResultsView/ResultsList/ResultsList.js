import React from 'react';
import ResultCard from '../ResultCard/ResultCard';
import resultStyle from '../../styles/resultStyle';


const ResultsList = (props) => {
    return (
        <div className={`${resultStyle.dealList}`} >{
            props.deals.map((cur, ind, arr) => {
                return (
                    <ResultCard 
                        key={ind} 
                        value={cur.id} 
                        title={cur.title} 
                        restaurant={cur.restaurant} 
                        distance={cur.distance} 
                        days={cur.days} 
                        details={cur.details}
                    />
                )
            })
        }</div>
    )
}

export default ResultsList;