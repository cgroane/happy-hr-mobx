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

            var newDeals= updateDeals.call(this, this.props.deals)
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
                        <span>{item.restaurant.address}, {item.restaurant.city}, {item.restaurant.state}, {item.restaurant.zip}</span>
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