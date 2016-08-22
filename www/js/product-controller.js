var BookIt = BookIt || {};

BookIt.productController = function () {
    this.$productUploadPage = null;
    this.$btnSubmit = null;
	this.$selProduct = null;
	this.$selQuantity = null;
	this.$txtQuotePrice = null;
	this.$lblEstimatedPrice = null;
	this.$ctnErr = null;
	this.$dlguploadproductsubmitsuccess = null;
};

BookIt.productController.prototype.init = function () {
    this.$productUploadPage = $("#page-uploadproducts");
    this.$btnSubmit = $("#btn-uploadproductsubmit", this.$productUploadPage);
    this.$selProduct = $("#select-product",this.$productUploadPage);
	this.$selQuantity = $("#select-quantity",this.$productUploadPage);
	this.$txtQuotePrice = $("#txt-quote-price",this.$productUploadPage);
	this.$lblEstimatedPrice = $("#lbl-estimated-price",this.$productUploadPage);
	this.$ctnErr = $("#product-ctn-err",this.$productUploadPage);
	this.$dlguploadproductsubmitsuccess = $("#dlg-uploadproductsubmit-success",this.$productUploadPage);
	
	
	var locCurrentLangType = localStorage.getItem("ngStorage-defLanguageType") == undefined ? "english" : localStorage.getItem("ngStorage-defLanguageType");
	app.getCommodity(locCurrentLangType.toLowerCase()); // read from localStorage
	    
};

BookIt.productController.prototype.resetProductForm = function () {

  var invisibleStyle = "bi-invisible",
      invalidInputStyle = "bi-invalid-input";
	  
	this.$ctnErr.html("");
    this.$ctnErr.removeClass().addClass(invisibleStyle);
    this.$txtQuotePrice.removeClass(invalidInputStyle);
    this.$selProduct.removeClass(invalidInputStyle);
	this.$selQuantity.removeClass(invalidInputStyle);
    this.$lblEstimatedPrice.val("");    
};

BookIt.productController.prototype.onProductSubmitCommand = function () { 
  var me = this,
        quotePrice = me.$txtQuotePrice.val(),
        selQuantity = me.$selQuantity.val(),
		selProduct = me.$selProduct.val(),
		estimatedPrice = me.$lblEstimatedPrice.val(),
        invalidInput = false,
        invisibleStyle = "bi-invisible",
        invalidInputStyle = "bi-invalid-input";
    // Reset styles.
    me.$ctnErr.removeClass().addClass(invisibleStyle);
    me.$txtQuotePrice.removeClass(invalidInputStyle);
    me.$selProduct.removeClass(invalidInputStyle);
	me.$selQuantity.removeClass(invalidInputStyle);
	me.$lblEstimatedPrice.removeClass(invalidInputStyle);
    // Flag each invalid field.
    if (quotePrice.length === 0) {
        me.$txtQuotePrice.addClass(invalidInputStyle);
        invalidInput = true;
    }
    if (selProduct.length === 0) {
        me.$selProduct.addClass(invalidInputStyle);
        invalidInput = true;
    }
	if (selQuantity.length === 0) {
        me.$selQuantity.addClass(invalidInputStyle);		
        invalidInput = true;
    }
	
	if(quotePrice < estimatedPrice){
		me.$ctnErr.html("<p>"+ BookIt.Settings.AppErrorMessage.english.QuotepricelessthanEstimatedPrice +".</p>");
        me.$ctnErr.addClass("bi-ctn-err").slideDown();
        return;
	}
    // Make sure that all the required fields have values.
    if (invalidInput) {
        me.$ctnErr.html("<p>" + BookIt.Settings.AppErrorMessage.english.requiredfield +".</p>");
        me.$ctnErr.addClass("bi-ctn-err").slideDown();
        return;
    }
    $("#dlg-uploadproductsubmit-success").popup('open');				
     return;
    $.mobile.loading("show");
    $.ajax({
        type: 'POST',
        url: BookIt.Settings.api.postProductDetail,
        data: "product=" + selProduct + "&qty=" + selQuantity + "&eprice=" + estimatedPrice + "&qprice=" + quotePrice,
        success: function (resp) {
            $.mobile.loading("hide");
            if (resp.success === true) {
                // Navigate to Order history Page                
                //$.mobile.navigate(me.mainMenuPageId);
				$("#dlg-uploadproductsubmit-success").popup('open');				
                return;
            } else {
                if (resp.extras.msg) {
                    switch (resp.extras.msg) {
                        case BookIt.ApiMessages.DB_ERROR:
                        // TODO: Use a friendlier error message below.
                            me.$ctnErr.html("<p>Oops! product upload had a problem. Please try again in a few minutes.</p>");
                            me.$ctnErr.addClass("bi-ctn-err").slideDown();
                            break;
                    }
                }
            }
        },
        error: function (e) {
            $.mobile.loading("hide");
            console.log(e.message);
            // TODO: Use a friendlier error message below.
            me.$ctnErr.html("<p>Oops! product upload had a problem. Please try again in a few minutes.</p>");
            me.$ctnErr.addClass("bi-ctn-err").slideDown();
        }
    });
};
