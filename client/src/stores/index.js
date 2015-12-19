import Reflux from 'Reflux'
import DashboardActions from '../actions/DashboardActions'
import _ from 'lodash'

let users = [
    {"username":"admin", "password":"admin"},
    {"username":"user2", "password":"password2"},
    {"username":"user3","password":"password3"}
]

let state = {
  isLoading: false,
  loggedIn: false,
  username: null,
  usernameErrorText: "",
  passwordErrorText: "",
  fixedHeader: true,
  fixedFooter: false,
  stripedRows: false,
  showRowHover: true,
  selectable: true,
  multiSelectable: true,
  enableSelectAll: false,
  deselectOnClickaway: true,
  height: '300px'
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
    console.error('Server is down: ' + response);
  },

  onLogout() {
    state.username = null;
    state.loggedIn = false;
    this.trigger(state);
  }

})

export default Store
