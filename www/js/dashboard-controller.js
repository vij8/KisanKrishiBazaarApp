var BookIt = BookIt || {};

BookIt.dashboardController = function () {

    this.$signUpSucceededPage = null;
    this.$btnSubmit = null;
};

BookIt.dashboardController.prototype.init = function () {
    this.$signUpSucceededPage = $("#page-signup-succeeded");
    this.$btnSubmit = $("#btn-submit", this.$signUpSucceededPage);
    this.$tblCommodity = $("#commodity-table",this.$signUpSucceededPage);
    
    //load Commodity price
    $.mobile.loading("show");
      //  app.getCommodity();
       // updateCommodityTable();
    $.mobile.loading("hide");
};

  function updateCommodityTable(){
    var commodityResponse = JSON.parse(localStorage.getItem("ngStorage-commodity"));
    var items = [];
    $.each(commodityResponse.Commodity_Report.Items, function() {
        items.push("<tr><th><b class='ui-table-cell-label'>Rank</b>"+this['Rank']+"</th>");
        items.push("<td><b class='ui-table-cell-label'>Market Center</b>"+this['Market_Center']+"</td>");
        items.push("<td><b class='ui-table-cell-label'>Goods</b>"+this['Goods'] +"</td>");
        items.push("<td><b class='ui-table-cell-label'>Arrivals</b>"+this['Arrivals'] +"</td>");
        items.push("<td><b class='ui-table-cell-label'>Units of Arrivals</b>"+this['Units_of_Arrivals'] +"</td>");
        items.push("<td><b class='ui-table-cell-label'>Origin</b>"+this['Origin'] +"</td>");
        items.push("<td><b class='ui-table-cell-label'>Variety</b>"+this['Variety'] +"</td>");
        items.push("<td><b class='ui-table-cell-label'>Grade</b>"+this['Grade'] +"</td>");
        items.push("<td><b class='ui-table-cell-label'>Minimum Price</b>"+this['Minimum_Price'] +"</td>");
        items.push("<td><b class='ui-table-cell-label'>Maximum Price</b>"+this['Maximum_Price'] +"</td>");
        items.push("<td><b class='ui-table-cell-label'>Modal Price</b>"+this['Modal_Price'] +"</td></tr>");
    });
      $('#commodity-table')
		.find('tbody').append(items)
		.trigger('update');
    }
BookIt.dashboardController.prototype.resetDashboardForm = function () {

  //var invisibleStyle = "bi-invisible",
//      invalidInputStyle = "bi-invalid-input";
};

BookIt.dashboardController.prototype.onDashboardCommand = function () { 
//$.mobile.navigate("#page-dashboard");
    return;
};
