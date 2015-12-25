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
    DashboardActions.getAllDrugs()
  },

  _onRowSelection(selectedRows) {
    let rowNumber = -1
    let drugId = null
    if (selectedRows.length < 1) {
      rowNumber = -1
      drugId = null
    } else {
      rowNumber = selectedRows[0]
      drugId = this.state.drugs[rowNumber].id
    }
    // console.log('the item is: ' + this.state.drugs[selectedRow].drug.drugName)
    // console.log('the item is: ' + this.state.drugs[rowNumber].id)
    DashboardActions.selectRow(rowNumber, drugId)

  },

  _handleEditClick(e) {
    // GET drug info by ID via an action, set the state in the store, then trigger and set selectedIndex to 0
    if (this.state.selectedDrugId === null) {
      return
    }
    console.log('Editing: ' + this.state.selectedDrugId)
  },

  _handleDeleteClick(e) {
    if (this.state.selectedDrugId === null) {
      return
    }
    DashboardActions.deleteDrug(this.state.selectedDrugId)
  },

  render() {
    let drugs = this.state.drugs.map((item, index) => {
      let drug = item.drug
      return (
        <TableRow key={item.id} selected={this.state.selectedRow === index}>
          <TableRowColumn>{drug.drugName}</TableRowColumn>
          <TableRowColumn>{drug.drugClass}</TableRowColumn>
          <TableRowColumn>{drug.drugRegulation}</TableRowColumn>
          <TableRowColumn>{drug.username}</TableRowColumn>
          <TableRowColumn>{drug.date ? drug.date : 'no date specified'}</TableRowColumn>
        </TableRow>
      )
    })

    return (
      <div>
        <Table
          height='300px'
          fixedHeader={true}
          selectable={true}
          onRowSelection={this._onRowSelection}
          style={{fontFamily: 'Roboto, sans-serif'}} >
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn colSpan="5" style={{textAlign: 'center'}}>
                Drug List
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip='Drug Name'>Name</TableHeaderColumn>
              <TableHeaderColumn tooltip='Drug Class'>Class</TableHeaderColumn>
              <TableHeaderColumn tooltip='Drug Regulation'>Regulation</TableHeaderColumn>
              <TableHeaderColumn tooltip='User who added this drug'>User</TableHeaderColumn>
              <TableHeaderColumn tooltip='Date drug added (YYYY-MM-DD)'>Date</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            deselectOnClickaway={false}
            showRowHover={true}
            >
            {drugs}
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
