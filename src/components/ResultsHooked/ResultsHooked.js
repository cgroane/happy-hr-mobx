import React, { useEffect, useCallback, memo } from 'react';
import {flow} from 'mobx';
import { useObserver, useLocalStore } from 'mobx-react';
import ResultsList from '../ResultsView/ResultsList/ResultsList';
import {firestore} from '../../config/fire.js'
import { initMap, initMapWithHooks } from '../ResultsView/ResultsViewService';
import resultStyle from '../styles/resultStyle';

export const HookedStoreContext = React.createContext();
export const HookedStoreProvider = ({children}) => {
  const store = useLocalStore(() => ({
    deals: [],
    fetchStatus: 'done',
    userLocation: {},
    get dealCount() {
      return store.deals.length
    },
    fetchDeals: flow(function*() {
      store.fetchStatus = 'pending'

      try {
        let deals = [];
        const response = yield firestore.collection('deals').get()
          .then((result) => result.forEach((cur) => deals.push(cur.data())
        ))

        store.deals = yield deals
        store.fetchStatus = 'done'
      } catch {
        store.fetchStatus = 'error'
      }
    }),
    setUserLocation: (location) => store.userLocation = {...location},
  }))

  return (<HookedStoreContext.Provider value={store}>{children}</HookedStoreContext.Provider>)
}
export const ResultsHooked = () => {
  const gmap = React.useRef()
  const map = React.useRef()
  const [height, setHeight] = React.useState()
  const [width, setWidth] = React.useState()
  const updateWindowDimensions = () => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }
  useEffect(() => {
    store.fetchDeals()
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
          store.setUserLocation({lat:position.coords.latitude, lng:position.coords.longitude})
      })
  }
    // updateWindowDimensions()
    // window.addEventListener('resize', updateWindowDimensions)
    let uluru = {
        lat: 32.813085, 
        lng: -96.762331
    }
    // const onLoad = () => initMapWithHooks(gmap.current, uluru)
    // window.addEventListener('load', onLoad);

  })
  const store = React.useContext(HookedStoreContext)
  const memoMap = useCallback(<div id="gmap" ref={gmap} />)
  return useObserver(() => (
    <div>
      <div>{store.dealCount}</div>
      <ResultsList deals={store.deals} />
      <div className={`${resultStyle.mapContainer}`} >
        {memoMap}
      </div>
    </div>
  ))
}