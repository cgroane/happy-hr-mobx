import React from 'react';
import ResultCard from '../ResultCard/ResultCard';
import resultStyle from '../../styles/resultStyle';
import {Element} from 'react-scroll';

const ResultsList = (props) => {
    return (
        <div className={`${resultStyle.dealList}`}  id="deal-list" >{
            props.deals.map((cur, ind, arr) => {
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
                            lat={cur.lat}
                            lng={cur.lng}
                            placeID={cur.placeID}
                        />
                    </Element>
                )
            })
        }</div>
    )
}

export default ResultsList;