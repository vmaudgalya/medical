import Reflux from 'Reflux'
import DashboardActions from '../actions/DashboardActions'
import _ from 'lodash'

let users = [
    {"username":"admin", "password":"admin"},
    {"username":"user2", "password":"password2"},
    {"username":"user3","password":"password3"}
]

const Login = Reflux.createStore({
  listenables: [DashboardActions],

  authenticateUser(username, password, login) {
    let userExists = false
    let user = { username, password }
    for (let i = 0; i < users.length; i++) {
      if (_.isEqual(users[i], user)) {
        userExists = true
      }
    }
    if (userExists) {
      this.trigger({
        loggedIn: true,
        isLoading: false
      })
      login()
      console.log('Success!');
    } else {
      this.trigger({
        isLoading: false,
        usernameErrorText: 'Invalid login',
        passwordErrorText: 'Invalid login'
      })
      console.log('Failure');
    }
  },

  onLogin(username, password, router) {
    // Perform authentication here
    this.trigger({
      isLoading: true
    })
    let errorMessage = "This field is required"
    if (!username && !password) {
      this.trigger({
        usernameErrorText: errorMessage,
        passwordErrorText: errorMessage
      })
      return
    } else if (!username) {
      this.trigger({
        usernameErrorText: errorMessage,
        passwordErrorText: ""
      })
      return
    } else if (!password) {
      this.trigger({
        usernameErrorText: "",
        passwordErrorText: errorMessage
      })
      return
    }
    this.trigger({
      usernameErrorText: "",
      passwordErrorText: ""
    })

    setTimeout(() => this.authenticateUser(username, password, router), 3000) // Simulate API call

  },

  getInitialState() {
    return {
      isLoading: false,
      loggedIn: false,
      username: null,
      password: null,
      usernameErrorText: "",
      passwordErrorText: ""
    }
  }
})

export default Login
