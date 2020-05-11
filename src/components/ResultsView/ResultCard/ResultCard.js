import React, {Component} from 'react';
import {selectDeal, setDistance} from './../../../ducks/reducer';
import {updateDeals} from './../ResultsViewService';
import {
    Link,
    DirectLink,
    Element,
    Events,
    animateScroll as scroll,
    scrollSpy,
    scroller
  } from "react-scroll";
import ResultCardStyles from './ResultCardStyle';
import resultsFunctions from './../../utility/functions';

class ResultCard extends Component {
    constructor(props) {
        super(props)
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (this.props.userLocation != prevProps.userLocation) {

            var newDeals= updateDeals.call(this, this.props.deals)
            }
    }
    
    render() {
        let item = this.props;
        return (
            <Element name={item.id} >
                <div key={item.key} value={item.id} className={`${ResultCardStyles.dealCard}`} >
                    <div>
                        <h1>{item.title}</h1>
                        <div className={`${ResultCardStyles.restaurantDetails}`} >
                            <h2>{item.restaurant.name}</h2>
                            <a className="link-to-map" href={`https://www.google.com/maps/search/?api=1&query=${item.restaurant.name.split(' ').join('+')}&query_place_id=${item.placeID}`} >{item.restaurant.address}, {item.restaurant.city}, {item.restaurant.state}, {item.restaurant.zip}</a>
                        </div>
                        <span>{item.distance}</span>
                    </div>
                    <ul style={{overflowX: 'scroll', paddingBottom: '20px'}} > 
                        {resultsFunctions.days(item.days)}
                    </ul>
                    <div  >
                        {item.details}
                    </div>
                </div>
            </Element>
        )
    }
}
export default (ResultCard)