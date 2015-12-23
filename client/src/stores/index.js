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
  isEditing: false // if its true, we'll do an UPDATE instead of an INSERT
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

  onLogout() {
    state.username = null;
    state.loggedIn = false;
    state.usernameErrorText = ''
    state.passwordErrorText = ''
    this.trigger(state);
  }

})

export default Store
