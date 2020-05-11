import {observable, action, computed} from 'mobx';
import {firestore} from '../config/fire.js'

class DealsStore {
  @observable deals = null
  @observable userLocation = null
  @observable fetchStatus = 'none' /** pending, done, error */
  
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @action setDeals = deals => {

    this.deals = deals
  }

  @action getUserLocation = location => this.userLocation = location

  @computed get getDeals() {
    return this.deals.length < 1 ? 'No deals' : this.deals
  }
}

const observableDealsStore = new DealsStore();
export default observableDealsStore;