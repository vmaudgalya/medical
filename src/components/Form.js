import React, { Component } from 'react'
import mui, {Card, RaisedButton, TextField, Tabs, Tab, Table, TableRow, TableHeader, TableHeaderColumn, TableBody, TableRowColumn } from 'material-ui'
import actions from '../actions/dashboard'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

class Form extends Component {

  constructor(props) {
    super(props)
    this.state = {
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
  }

  render() {
    return (
      <Tabs inkBarStyle={{backgroundColor: "rgb(244, 255, 38)"}}>
        <Tab label="Add">
          <Card className="addItemCard">
            <TextField
              hintText="Medicine Name"
              floatingLabelText="Medicine Name" />
            <br />
            <TextField
              hintText="Class"
              floatingLabelText="Class" />
            <br />
            <TextField
              hintText="Symptoms"
              floatingLabelText="Symptoms" />
            <br />
            <TextField
              hintText="Interactions"
              floatingLabelText="Interactions" />
            <br />
            <TextField
              hintText="Dosage"
              floatingLabelText="Dosage" />
            <br />
            <RaisedButton label="Submit" primary={true}/>
          </Card>
        </Tab>
        <Tab label="Review" >
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
          </Tab>
      </Tabs>
    )
  }

}

export default Form
