import Reflux from 'Reflux'
import React, { Component } from 'react'
import { Card, FlatButton, RaisedButton, TextField, AppBar, Tabs, Tab } from 'material-ui'
import DrugDetails from './DrugDetails'
import DrugList from './DrugList'
import DashboardActions from '../actions/DashboardActions'
import Store from '../stores'
import { History, Link } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const Container = React.createClass({

  mixins: [Reflux.connect(Store), History],

  _handleChangeTabs(value, e, tab) {
    console.log("value: " + value)
  },

  componentDidUpdate() {
    if (!this.state.username) {
      console.info('redirecting unauthorized user')
      this.history.pushState(null, '/login', null)
    }
  },

  componentWillMount() {
    if (!this.state.username) {
      console.info('redirecting unauthorized user')
      this.history.pushState(null, '/login', null)
    }
  },

  _handleLogout() {
    console.log('logging out')
    DashboardActions.logout(this.state.username);
  },

  render() {
      var styles = {
        appBar: {
          flexWrap: 'wrap'
        },
        tabs: {
          paddingTop: '20px',
          width: '50%'
        },
        tab: {
          paddingBottom: '10px',
          fontSize: '18px'
        },
        inkBar: {
          backgroundColor: 'rgb(239, 249, 58)',
        },
        logout: {
          paddingBottom: '10px',
          fontSize: '18px',
          margin: '0px 0px 0px 0px',
          paddingRight: '10px',
          paddingTop: '20px',
          backgroundColor: 'rgba(34, 75, 12, 0)',
          color: 'rgba(255, 255, 255, 0.55)'
        }
      };

    return (
      <div>
        <AppBar title="Amazing Medical App" style={styles.appBar} showMenuIconButton={false} >
          <Tabs onChange={this._handleChangeTabs} inkBarStyle={styles.inkBar} style={styles.tabs}>
            <Tab label="ADD" value="0" style={styles.tab}><DrugDetails /></Tab>
            <Tab label="REVIEW" value="1" style={styles.tab}><DrugList /></Tab>
          </Tabs>
          <FlatButton style={styles.logout} onClick={this._handleLogout}>LOGOUT</FlatButton>
        </AppBar>
      </div>
    )
  }

})

export default Container
