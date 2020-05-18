import React from 'react';
import ResultCard from '../ResultCard/ResultCard';
import resultStyle from '../../styles/resultStyle';
import {Element} from 'react-scroll';

const ResultsList = (props) => {
    let hideList;
    if (props.mapOrList && props.dimensions.width < 768) {
        hideList = {
            display: 'none'
        }
    } else {
        hideList = null
    }
    // console.log(props)
    return (
        <div className={`${resultStyle.dealList}`}  style={hideList} id="deal-list" >{
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