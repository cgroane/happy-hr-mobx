import React, { useEffect, useCallback, memo } from 'react';
import {flow} from 'mobx';
import { useObserver, useLocalStore } from 'mobx-react';
import ResultsList from '../ResultsView/ResultsList/ResultsList';
import {firestore} from '../../config/fire.js'
import { initMap, initMapWithHooks } from '../ResultsView/ResultsViewService';
import resultStyle from '../styles/resultStyle';

export const HookedStoreContext = React.createContext();
export const FunctionalResults = (props) => {
  const gmap = React.useRef()
  const map = React.useRef()
  const [height, setHeight] = React.useState()
  const [width, setWidth] = React.useState()
  const updateWindowDimensions = () => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }
  useEffect(() => {
    props.store.fetchDeals()
    // updateWindowDimensions()
    // window.addEventListener('resize', updateWindowDimensions)
    let uluru = {
        lat: 32.813085, 
        lng: -96.762331
    }
    // const onLoad = () => initMapWithHooks(gmap.current, uluru)
    // window.addEventListener('load', onLoad);

  })
  const memoMap = useCallback(<div id="gmap" ref={gmap} />)
  return useObserver(() => (
    <div>
      <div>{props.store.dealCount}</div>
      <ResultsList deals={props.store.deals} />
      <div className={`${resultStyle.mapContainer}`} >
        {memoMap}
      </div>
    </div>
  ))
}