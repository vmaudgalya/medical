import Reflux from 'Reflux'
import React, { Component } from 'react'
import { Table, TableRow, TableHeader, TableHeaderColumn, TableBody, TableRowColumn, TableFooter, RaisedButton } from 'material-ui'
import DashboardActions from '../actions/DashboardActions'
import Store from '../stores'
import { History, Link } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const DrugList = React.createClass({

  mixins: [Reflux.connect(Store), History],

  componentWillMount() {
    // Fetch medicines from db
  },

  _onRowSelection(selectedRows) {
    console.log('row selected: ' + selectedRows)
    // save this to state
  },

  _handleEditClick() {
    // get drug info by ID, go to details screen and set fields with current info
  },

  _handleDeleteClick() {
    // get drug by ID and delete it from the db
  },

  render() {
    let rows = []
    for (let i = 1; i <= 100; i++) {
      rows.push(
        <TableRow key={i}>
          <TableRowColumn>{i}</TableRowColumn>
          <TableRowColumn>Benadryl</TableRowColumn>
          <TableRowColumn>Allergy Medication</TableRowColumn>
          <TableRowColumn>admin</TableRowColumn>
        </TableRow>
      )
    }
    return (
      <div>
        <Table
          height={500}
          fixedHeader={this.state.fixedHeader}
          selectable={this.state.selectable}
          onRowSelection={this._onRowSelection}>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn colSpan="4" tooltip='Super Header' style={{textAlign: 'center'}}>
                Drug List
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip='The ID'>ID</TableHeaderColumn>
              <TableHeaderColumn tooltip='Drug Name'>Name</TableHeaderColumn>
              <TableHeaderColumn tooltip='Drug Type'>Type</TableHeaderColumn>
              <TableHeaderColumn tooltip='User who added this drug'>User</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            >
            {rows}
          </TableBody>
        </Table>
        <div style={{float: 'right', margin: '20px 50px 0px 0px'}}>
          <RaisedButton label="EDIT" secondary={true} onClick={this._handleEditClick} />
          {' '}
          <RaisedButton label="DELETE" primary={true} onClick={this._handleDeleteClick} />
        </div>
      </div>
    )
  }

})

export default DrugList
