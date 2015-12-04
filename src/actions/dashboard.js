import Reflux from 'Reflux'

var DashboardActions = Reflux.createActions({
  'login' : {children: ['success', 'failure']}
});

module.exports = DashboardActions;
