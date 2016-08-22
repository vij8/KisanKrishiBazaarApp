var BookIt = BookIt || {};

BookIt.negotiateOrderController = function () {
	this.$negotiateHistoryPage = null; 
	this.$btnSubmit = null;	
};

BookIt.negotiateOrderController.prototype.init = function () {
    this.$negotiateHistoryPage = $("#page-negotiateHistory");
};

  
BookIt.negotiateOrderController.prototype.resetNegotiateOrderForm = function () {
  var invisibleStyle = "bi-invisible",
      invalidInputStyle = "bi-invalid-input";
};

BookIt.negotiateOrderController.prototype.onNegotiateOrderHistoryCommand = function () { 
//$.mobile.navigate("#page-dashboard");
    return;
};
