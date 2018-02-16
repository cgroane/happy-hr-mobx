import axios from 'axios';

const GET_DEALS = 'GET_DEALS';
const GET_LOCATIONS = 'GET_LOCATIONS';
const GET_USER_LOCATION = "GET_USER_LOCATION";
const SET_DISTANCE = "SET_DISTANCE";
const SELECT_DEAL = "SELECT_DEAL";
const FILTER_DEALS = "FILTER_DEALS"
const SORT_DEALS = "SORT_DEALS";
const GET_DAY = "GET_DAY";
const SORT_DEALS_DECREASING = "SORT_DEALS_DECREASING";

const initialState = {
    userLocation: {},
    deals: [],
    staticDeals: [],
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_DEALS:
            return Object.assign({}, state, {deals: action.payload});
        case GET_LOCATIONS + "_PENDING":
            return Object.assign({}, state, {isLoading: true})
        case GET_LOCATIONS + "_FULFILLED":
            return Object.assign({}, state, {deals: action.payload, staticDeals: action.payload ,isLoading: false})
        case GET_USER_LOCATION:
            return Object.assign({}, state, {userLocation: action.payload})
        case FILTER_DEALS: 
            {
                let daysOfWeek = ["Monday", "Tuesday", "Wenesday", "Thursday", "Friday", "Saturday", "Sunday"]
                let now = new Date();
                now = now.getDay();
                now = daysOfWeek[now-1]
                var newArr = action.payload
                newArr = newArr.filter(x => x.days.find(day => day ==now))
                return Object.assign({}, state, {deals:newArr})
            }
        case SORT_DEALS:
        {
            var newArr = [...action.payload];
                newArr.sort((a, b) => a.distance.split(' ')[0]*1 - b.distance.split(' ')[0]*1)
                return Object.assign({}, state, {deals: newArr})
        }
        case GET_DAY:
            return Object.assign({}, state, {day: action.payload})
        case SORT_DEALS_DECREASING:
            {
                var newArr = [...action.payload];
                newArr.sort((a, b) => a.distance.split(' ')[0]*1 - b.distance.split(' ')[0]*1).reverse()
                return Object.assign({}, state, {deals: newArr})
            }
        default:
            return state;
    }
}
export function getDeals(arr) {
    return {
        type: GET_DEALS,
        payload: arr
    }
}

export function sortDeals(array) {
    return {
        type: SORT_DEALS,
        payload: array
    }
}
export function getLocations() {
    return {
        type: GET_LOCATIONS,
        payload: axios.get('/api/deals/location').then(response => response.data)
    }
}
export function getUserLocation(location) {
    return {
        type: GET_USER_LOCATION,
        payload: location
    }
}
export function setDistance(array) {
    return {
        type: SET_DISTANCE,
        payload: array
    }
}
export function selectDeal(obj) {
    return {
        type: SELECT_DEAL,
        payload: obj
    }
}
export function filterDeals(array) {
    return {
        type: FILTER_DEALS,
        payload: array
    }
}
export function getDayOfWeek(day) {
    return {
        type: GET_DAY,
        payload: day
    }
}
export function reverseSort(array) {
    return {
        type: SORT_DEALS_DECREASING,
        payload: array
    }
}