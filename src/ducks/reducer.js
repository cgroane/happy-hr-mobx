import axios from 'axios';

const GET_DEALS = 'GET_DEALS';
const GET_LOCATIONS = 'GET_LOCATIONS';
const GET_USER_LOCATION = "GET_USER_LOCATION";
const SET_DISTANCE = "SET_DISTANCE";

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
        default:
            return state;
    }
}

export function sortDeals(array) {
    return {
        type: GET_DEALS,
        payload: array.sort((a, b) => a.distance - b.distance)
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