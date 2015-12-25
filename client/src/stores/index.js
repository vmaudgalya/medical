import Reflux from 'Reflux'
import DashboardActions from '../actions/DashboardActions'

let state = {
  isLoading: false,
  loggedIn: false,
  username: null,
  usernameErrorText: '',
  passwordErrorText: '',
  selectedTab: 0,
  drugRegulation: '',
  drugName: '',
  drugClass: '',
  drugSymptoms: '',
  drugInteractions: '',
  drugDosage: '',
  isEditing: false, // if its true, we'll do an UPDATE instead of an INSERT
  drugs: []
}

const Store = Reflux.createStore({
  listenables: [DashboardActions],

  getInitialState() {
    return state;
  },

  onLoginCompleted(response) {
    state.isLoading = false
    response = JSON.parse(response)
    state.loggedIn = response.isAuthorized
    if (response.isAuthorized) {
      state.username = response.username
    } else {
      state.usernameErrorText = 'Unauthorized login'
      state.passwordErrorText = 'Unauthorized login'
    }
    this.trigger(state);
  },

  onLoginFailed(response) {
    console.error('Server is down: ' + response)
  },

  onGetAllDrugsCompleted(response) {
    state.drugs = response
    this.trigger(state)
  },

  onGetAllDrugsFailed(response) {
    console.error('Server is down: ' + response)
  },

  onSwitchTab(value) {
    state.selectedTab = value
    this.trigger(state)
  },

  onLogout() {
    state.isLoading = false
    state.loggedIn = false
    state.username = null
    state.usernameErrorText = ''
    state.passwordErrorText = ''
    state.selectedTab = 0
    state.drugRegulation = ''
    state.drugName = ''
    state.drugClass = ''
    state.drugSymptoms = ''
    state.drugInteractions = ''
    state.drugDosage = ''
    state.isEditing = false
    state.drugs = []
    this.trigger(state)
  }

})

export default Store
