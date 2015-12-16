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

  onLogin(username, password, router) {
    // Perform authentication here
    this.trigger({
      isLoading: true
    })
    setTimeout(() => this.authenticateUser(username, password, router), 3000) // Simulate API call
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
