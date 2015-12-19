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
    let data = {}
    data.isLoading = false
    response = JSON.parse(response)
    data.loggedIn = response.isAuthorized
    if (response.isAuthorized) {
      state.username = response.username
    } else {
      data.usernameErrorText = 'Unauthorized login'
      data.passwordErrorText = 'Unauthorized login'
    }
    this.trigger(data);
  },

  onLoginFailed(response) {
    console.error('Server is down: ' + response);
  },

  authenticateUser(username, password, login) {
    let userExists = false
    let user = { username, password }
    for (let i = 0; i < users.length; i++) {
      if (_.isEqual(users[i], user)) {
        userExists = true
      }
    }
    if (userExists) {
      state.username = username
      this.trigger({
        isLoading: false
      })
      login()
      console.info('Success!')
    } else {
      this.trigger({
        isLoading: false,
        usernameErrorText: 'Unauthorized login',
        passwordErrorText: 'Unauthorized login',
        username: null,
        password: null
      })
      console.info('Failure')
    }
  }

})

export default Store
