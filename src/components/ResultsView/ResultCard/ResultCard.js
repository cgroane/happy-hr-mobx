import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectDeal, setDistance} from './../../../ducks/reducer';
import {updateDeals} from './../ResultsViewService';
import ResultCardStyles from './ResultCardStyle';
import resultsFunctions from './../../utility/functions';

class ResultCard extends Component {
    constructor(props) {
        super(props)
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (this.props.userLocation != prevProps.userLocation) {

            // calculate distance between user and deal
            var newDeals= updateDeals.call(this, this.props.deals)

            // newDeals.sort((a ,b) => a.distance - b.distance)
            // this.props.setDistance(newDeals)
                        
                // sort should not be done on mount - allow user to select this option
                // user will also be able to filter based on active or not -- need to get current date
            }
    }
    
    render() {
        let item = this.props;
        return (
            <div key={item.key} value={item.id} className={`${ResultCardStyles.dealCard}`} >
                <div>
                    <h1>{item.title}</h1>
                    <div className={`${ResultCardStyles.restaurantDetails}`} >
                        <h2>{item.restaurant.name}</h2>
                        <span>{item.restaurant.addressOne}, {item.restaurant.city}, {item.restaurant.state}, {item.restaurant.zip}</span>
                    </div>
                    <span>{item.distance}</span>
                </div>
                <ul> 
                    {resultsFunctions.days(item.days)}
                </ul>
                <div  >
                    {item.details}
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, {selectDeal, setDistance})(ResultCard)