import Reflux from 'Reflux'
import React, { Component } from 'react'
import {Card, RaisedButton, TextField, Table, TableRow, TableHeader, TableHeaderColumn, TableBody, TableRowColumn } from 'material-ui'
import DashboardActions from '../actions/DashboardActions'
import Store from '../stores'
import { History, Link } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const MedicineList = React.createClass({

  mixins: [Reflux.connect(Store), History],

  componentWillMount() {
    if (!this.state.username) {
      console.info('redirecting unauthorized user')
      this.history.pushState(null, '/login', null)
    }
    // Fetch medicines from db
  },

  render() {
    return (
          <Table
            height={this.state.height}
            fixedHeader={this.state.fixedHeader}
            fixedFooter={this.state.fixedFooter}
            selectable={this.state.selectable}
            multiSelectable={this.state.multiSelectable}
            onRowSelection={this._onRowSelection}>
              <TableHeader enableSelectAll={this.state.enableSelectAll}>
                <TableRow>
                  <TableHeaderColumn tooltip='Medicine Name'>Name</TableHeaderColumn>
                  <TableHeaderColumn tooltip='Medicine Type'>Type</TableHeaderColumn>
                  <TableHeaderColumn tooltip='Current Status'>Status</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                deselectOnClickaway={this.state.deselectOnClickaway}
                showRowHover={this.state.showRowHover}
                stripedRows={this.state.stripedRows}>
              <TableRow>
                  <TableRowColumn>1</TableRowColumn>
                  <TableRowColumn>John Smith</TableRowColumn>
                  <TableRowColumn>Employed</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>2</TableRowColumn>
                  <TableRowColumn>Randal Peterson</TableRowColumn>
                  <TableRowColumn>Unemployed</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>3</TableRowColumn>
                  <TableRowColumn>Stephanie Sanders</TableRowColumn>
                  <TableRowColumn>Employed</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>4</TableRowColumn>
                  <TableRowColumn>Steve Howie</TableRowColumn>
                  <TableRowColumn>Employed</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>5</TableRowColumn>
                  <TableRowColumn>Joyce Whitten</TableRowColumn>
                  <TableRowColumn>Employed</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>6</TableRowColumn>
                  <TableRowColumn>Samuel Roberts</TableRowColumn>
                  <TableRowColumn>Unemployed</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>7</TableRowColumn>
                  <TableRowColumn>Adam Moore</TableRowColumn>
                  <TableRowColumn>Employed</TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
    )
  }

})

export default MedicineList
