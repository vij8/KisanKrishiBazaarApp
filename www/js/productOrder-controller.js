var BookIt = BookIt || {};

BookIt.productOrderController = function () {
    this.$orderHistoryPage = null;
	this.$btnSubmit = null;	
};

BookIt.productOrderController.prototype.init = function () {
    this.$orderHistoryPage = $("#page-orderHistory");
};

 
BookIt.productOrderController.prototype.resetproductOrderForm = function () {
  var invisibleStyle = "bi-invisible",
      invalidInputStyle = "bi-invalid-input";
};

BookIt.productOrderController.prototype.onprodutOrderHistoryCommand = function () { 
//$.mobile.navigate("#page-dashboard");
    return;
};
