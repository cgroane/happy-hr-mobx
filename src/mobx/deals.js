import {observable, action, computed, flow} from 'mobx';
import {firestore} from '../config/fire.js'
import {viewDeals} from '../firebase/getFBDeals';
class DealsStore {
  @observable deals = []
  @observable userLocation = null
  @observable fetchStatus = 'asdf' /** pending, done, error */
  
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  fetchDeals = flow(function * () {
    this.fetchStatus = 'pending'

    try {
      let deals = [];
      const response = yield firestore.collection('deals').get()
        .then((result) => result.forEach((cur) => deals.push(cur.data())
      ))

      this.deals = yield deals
      console.log(this.deals)
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