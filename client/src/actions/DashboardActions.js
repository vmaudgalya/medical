import Reflux from 'Reflux'
import $ from 'jquery'

const DashboardActions = Reflux.createActions({

  login : { children: ["completed", "failed"] },
  logout : {},
  addDrug : { children: ["completed", "failed"] }

});

DashboardActions.login.listen(function (username, password) {
    $.ajax({
        url: "http://localhost:10010/medicalapp/authdoc",
        type: "post",
        contentType: "application/json",
        // dataType: "json",
        // processData: false,
        data: JSON.stringify({ username, password })
    }).done(this.completed.bind(this))
    .fail(this.failed.bind(this));
});

DashboardActions.logout.listen(function (username) {
    $.ajax({
        url: "http://localhost:10010/medicalapp/logout",
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({ username })
    });
});

DashboardActions.addDrug.listen(function (drug) {
    $.ajax({
        url: "http://localhost:10010/medicalapp/drugs",
        type: "post",
        contentType: "application/json",
        data: JSON.stringify(drug)
    }).done(this.completed.bind(this))
    .fail(this.failed.bind(this));
});

// DashboardActions.getDrugs.listen(function () {
//     $.get("/medicalapp/drugs", {mode : "json"}).done(this.completed.bind(this))
//         .fail(this.failed.bind(this));
// });

export default DashboardActions;
