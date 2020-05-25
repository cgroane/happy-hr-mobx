import {observable, action, computed, flow} from 'mobx';
import {firestore} from '../config/fire.js'
import {viewDeals} from '../firebase/getFBDeals';
export class DealsStore {
  @observable deals = []
  @observable selectedDeal = {}
  @observable userLocation = null
  @observable fetchStatus = 'done' /** pending, done, error */
  @computed get dealCount () {
    return this.deals.length
  }
  
  constructor(rootStore) {
    this.rootStore = rootStore
  }
  @action setSelected = deal => {
    console.log(this.selectedDeal, deal)
    this.selectedDeal = {...deal}
  }
  fetchDeals = flow(function * () {
    this.fetchStatus = 'pending'

    try {
      let deals = [];
      const response = yield firestore.collection('deals').get()
        .then((result) => result.forEach((cur) => deals.push(cur.data())
      ))

      this.deals = yield deals
      this.fetchStatus = 'done'
    } catch {
      this.fetchStatus = 'error'
    }
  })
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