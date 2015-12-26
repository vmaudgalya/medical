import Reflux from 'Reflux'
import DashboardActions from '../actions/DashboardActions'

let state = {
  isLoading: false,
  loggedIn: false,
  username: null,
  usernameErrorText: '',
  passwordErrorText: '',
  selectedTab: '0',
  drugRegulation: '',
  drugName: '',
  drugClass: '',
  drugSymptoms: '',
  drugInteractions: '',
  drugDosage: '',
  isEditing: false, // if its true, we'll do an UPDATE instead of an INSERT
  drugs: [],
  selectedDrugId: null,
  selectedRow: -1,
  selectedDrug: null
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

  onGetAllDrugsCompleted(response) {
    state.drugs = response
    if (state.selectedDrug) {
      state.selectedDrug = state.drugs[state.selectedRow].drug
    }
    this.trigger(state)
  },

  onGetAllDrugsFailed(response) {
    console.error('Server is down: ' + response)
  },

  onDeleteDrugCompleted(response) {
    state.selectedRow = -1
    state.selectedDrugId = null
    state.selectedDrug = null
    this.trigger(state)
    DashboardActions.getAllDrugs()
  },

  onDeleteDrugFailed(response) {
    console.error('Server is down: ' + response)
  },

  onUpdateDrugCompleted(response) {
    // Clear editing mode and show list
    DashboardActions.cancelEditDrug()
  },

  onUpdateDrugFailed(response) {
    console.error('Server is down: ' + response)
  },

  onSwitchTab(value) {
    state.selectedTab = value
    this.trigger(state)
  },

  onSelectRow(rowNumber, id, drug) {
    // console.log(`Row ${rowNumber} was selected with id:${id}`)
    state.selectedRow = rowNumber
    state.selectedDrugId = id
    state.selectedDrug = drug
    this.trigger(state)
  },

  onEditDrug() {
    state.drugRegulation = state.selectedDrug.drugRegulation
    state.drugName = state.selectedDrug.drugName
    state.drugClass = state.selectedDrug.drugClass
    state.drugSymptoms = state.selectedDrug.drugSymptoms
    state.drugInteractions = state.selectedDrug.drugInteractions
    state.drugDosage = state.selectedDrug.drugDosage
    state.isEditing = true
    this.trigger(state)
  },

  onCancelEditDrug() {
    state.drugRegulation = ''
    state.drugName = ''
    state.drugClass = ''
    state.drugSymptoms = ''
    state.drugInteractions = ''
    state.drugDosage = ''
    state.isEditing = false
    this.trigger(state)
    DashboardActions.switchTab('1')
  },

  onLogout() {
    state.isLoading = false
    state.loggedIn = false
    state.username = null
    state.usernameErrorText = ''
    state.passwordErrorText = ''
    state.selectedTab = '0'
    state.drugRegulation = ''
    state.drugName = ''
    state.drugClass = ''
    state.drugSymptoms = ''
    state.drugInteractions = ''
    state.drugDosage = ''
    state.isEditing = false
    state.drugs = []
    state.selectedDrugId = null
    state.selectedRow = -1
    state.selectedDrug = null
    this.trigger(state)
  }

})

export default Store
