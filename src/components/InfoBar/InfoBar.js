import React from 'react';
import resultsFunctions from '../utility/functions';

const InfoBar = (props) => {
    // let {selected} = props.selected
    let content
    if (props.selected.title) {
        content = (
            <div className="infobarContent" >
            <div className="infoHeaders" >
                <span>
                    {props.selected.title}
                </span>
                <span>
                    {props.selected.restaurant.name}
                </span>
            </div>
            <div className="infobarDetails" >
            <ul style={{overflowX: 'scroll'}} >
                {resultsFunctions.days(props.selected.days)}
            </ul>
            <div >
                {props.selected.details}
            </div>
            <a className="link-to-map" href={`https://www.google.com/maps/search/?api=1&query=${props.selected.restaurant.name.split(' ').join('+')}&query_place_id=${props.selected.placeID}`} >{props.selected.restaurant.address}, {props.selected.restaurant.city}, {props.selected.restaurant.state}, {props.selected.restaurant.zip}</a>
            </div>
            </div>
        )
    } else {
        content = 'Tap on a marker to see more info'
    }
    return (
        <div className="infobar" >
            {content}
        </div>
    )
}
export default InfoBar;