// import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
// import promiseMiddleware from "redux-promise-middleware";
// import { reactReduxFirebase, firebaseReducer, firebaseStateReducer } from 'react-redux-firebase';
// import { reduxFirestore, firestoreReducer} from 'redux-firestore'
// import {default as fb} from 'firebase';
// import 'firebase/firestore';
// import { devToolsEnhancer } from "redux-devtools-extension";
// import reducer from './ducks/reducer';

// const firebaseConfig = {
//   apiKey: 'AIzaSyDGZqyetqHHP3oU100ZNwa6HDUD1xYBQUk',
//   authDomain: 'happy-hr-195117.firebaseapp.com',
//   databaseURL: 'https://happy-hr-195117.firebasio.com',
//   projectId: 'happy-hr-195117',
//   storageBucket: 'happy-hr-195117.appspot.com',
// }


// const firebase = fb.initializeApp(firebaseConfig);
// const firestore = firebase.firestore();

// const rrfConfig = {
//   deals: 'deals',
//   useFirestoreForProfile: true,
// }

// const createStoreWithFirebase = compose(
//   reactReduxFirebase(fb, rrfConfig),
//   reduxFirestore(fb),
// )(createStore)

// const rootReducer = combineReducers({
//   firebase: firebaseStateReducer,
//   firestore: firestoreReducer,
//   main: reducer
// })


// const initialState = {}
// const store = createStoreWithFirebase(rootReducer, initialState)

// const rrfProps = {
//   firebase,
//   config: rrfConfig,
//   dispatch: store.dispatch
// }

// export default store;