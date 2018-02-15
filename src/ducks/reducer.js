import axios from 'axios';

const GET_DEALS = 'GET_DEALS';
const GET_LOCATIONS = 'GET_LOCATIONS';
const GET_USER_LOCATION = "GET_USER_LOCATION";
const SET_DISTANCE = "SET_DISTANCE";
const SELECT_DEAL = "SELECT_DEAL";
const FILTER_DEALS = "FILTER_DEALS"
const SORT_DEALS = "SORT_DEALS";

const initialState = {
    userLocation: {},
    deals: [],
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_DEALS + "_PENDING":
            return Object.assign({}, state, {isLoading: true});
        case GET_DEALS + "_FULFILLED":
            return Object.assign({}, state, {deals: action.payload, isLoading: false})
        case GET_LOCATIONS + "_PENDING":
            return Object.assign({}, state, {isLoading: true})
        case GET_LOCATIONS + "_FULFILLED":
            return Object.assign({}, state, {deals: action.payload, isLoading: false})
        case GET_USER_LOCATION:
            return Object.assign({}, state, {userLocation: action.payload})
        case FILTER_DEALS: 
            return Object.assign({}, state, {deals:action.payload})
        case SORT_DEALS:
            return Object.assign({}, state, {deals: action.payload})
        default:
            return state;
    }
}

export function sortDeals(array) {
    return {
        type: SORT_DEALS,
        payload: array.sort((a, b) => a.distance.split(' ')[0]*1 - b.distance.split(' ')[0]*1)
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
export function filterDeals(array, date) {
    return {
        type: FILTER_DEALS,
        payload: array.filter(x => x.days.findIndex(day => day !==date))
    }
}