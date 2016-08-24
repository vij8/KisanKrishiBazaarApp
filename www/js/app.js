var BookIt = BookIt || {};

var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
       // this.getDafultLanguage(); //set default App Language
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) { 
        //https://github.com/apache/cordova-plugin-geolocation
        //navigator.geolocation.getCurrentPosition(geoLocationOnSuccess, geoLocationOnError);
    },
            
    getAppLanguage : function(languageName){
		$.mobile.loading("show");
        var locCurrentLangType = localStorage.getItem("ngStorage-defLanguageType");	
		var locCurrentData = localStorage.getItem("ngStorage-defLanguageData");
		if((languageName == "" || locCurrentLangType == languageName) && locCurrentData != ""){
			updateApplicationLanguage(); //update app language
			$.mobile.loading("hide");
		}
		else{
			if(locCurrentData == "" || locCurrentLangType != languageName)
			{
			  languageName = languageName == "" ? "english" : languageName; //set default lang English 	
			  $.getJSON( BookIt.Settings.getDefaultLanguage + "?Language=" +languageName, {
				format: "json"
			   })
				.done(function( data ) {
				  localStorage.setItem('ngStorage-defLanguageType', languageName);
				  localStorage.setItem('ngStorage-defLanguageData', JSON.stringify(data));
				  updateApplicationLanguage(); //update app language
				  $.mobile.loading("hide");
				})
				  .fail(function( jqxhr, textStatus, error ) {
					var err = textStatus + ", " + error;
					console.log( "Application Language request failed: " + err );
					$.mobile.loading("hide");
			  });
			}	
		}
    },
    
    getCommodity : function(languageName){
		languageName = languageName == "" ? "english" : languageName; //set default lang English 
		var ngStorage_commodity = "ngStorage-commodity-" + languageName;
        var locCommodity = localStorage.getItem(ngStorage_commodity);
        var locCommodityDate = localStorage.getItem("ngStorage-commodityDate");
	    var currentDate = new Date().toJSON().slice(0,10);
		if((locCommodity != null || locCommodity != "") && locCommodityDate == currentDate){
			updateCommodityDetails(ngStorage_commodity);
		}
	    else if(locCommodity == "" || locCommodityDate != currentDate)
        {
		  $.getJSON( BookIt.Settings.getCommodity , {
		  //$.getJSON( BookIt.Settings.getCommodity + "&languageReq=" + languageName , {
            format: "json"
          })
            .done(function( data ) {
              var cacheData = data;
              localStorage.setItem('ngStorage-commodityDate', currentDate);
              localStorage.setItem(ngStorage_commodity, JSON.stringify(data));
			  updateCommodityDetails(ngStorage_commodity);
            })
              .fail(function( jqxhr, textStatus, error ) {
                var err = textStatus + ", " + error;
                console.log( "Commodity request failed: " + err );
          });
        }
    },
	
	 getOrders : function(languageName){
		languageName = languageName == "" ? "english" : languageName; //set default lang English 
		var userSession =$.parseJSON(localStorage.getItem("bookit-session"));
		var ngStorage_orders = "ngStorage-orders-"+ userSession.username + "-" +  languageName;
        var locOrders = localStorage.getItem(ngStorage_orders);
        if(locOrders != null || locOrders != ""){
			updateOrderHistoryForm(ngStorage_orders);
		}
	    else
        {
		  $.getJSON( BookIt.Settings.api.getOrderHistoryByUserName + "?username=" + userSession + "&language=" + languageName.toLowerCase() , {
		    format: "json"
          })
            .done(function( data ) {
				if(data != ""){
					localStorage.setItem(ngStorage_commodity, JSON.stringify(data));
					updateOrderHistoryForm(ngStorage_orders);
				}
            })
              .fail(function( jqxhr, textStatus, error ) {
                var err = textStatus + ", " + error;
                console.log( "Commodity request failed: " + err );
          });
        }
    },
	
	closeApplication : function(){
		 navigator.app.exitApp();
	}
};


app.initialize();

app.getAppLanguage(""); //read from localStorage if not update with default language 'english'
//app.getCommodity(""); // read from localStorage

// onSuccess Geolocation
     function geoLocationOnSuccess(position){
        alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n');
    }
    
    // onError Callback receives a PositionError object
     function geoLocationOnError(error){
          alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
 
$(document).on("mobileinit", function (event, ui) {
    $.mobile.defaultPageTransition = "slide";
	$.mobile.selectmenu.prototype.options.nativeMenu = false;
});
    
app.signupController = new BookIt.SignUpController();
app.singinController = new BookIt.SignInController();
app.signupSucceededController = new BookIt.signupSucceededController();
app.dashboardController = new BookIt.dashboardController();
app.productController = new BookIt.productController();
app.productOrderController = new BookIt.productOrderController();
app.negotiateOrderController = new BookIt.negotiateOrderController();

$(document).on("pagecontainerbeforeshow", function (event, ui) {
	if (typeof ui.toPage !== "object") return;
	
    switch (ui.toPage.attr("id")) {
			case "page-index":
            if (!ui.prevPage) {
                // Check session.keepSignedIn and redirect to main menu.
                var session = BookIt.Session.getInstance().get(),
                    today = new Date();
                if (session && session.keepSignedIn && new Date(session.expirationDate).getTime() > today.getTime()) {
                    ui.toPage = $("#page-dasboard");                }
            }
			break;
            case "page-signup":
                app.signupController.resetSignUpForm();// Reset the signup form.
                break;
                
            case "page-signup-succeeded":
                app.signupSucceededController.resetSignUpSucceededForm();
                break;
            
            case "page-signin":
                app.singinController.resetSignInForm();
                break;
            
            case "page-dasboard":
                app.dashboardController.resetDashboardForm();
                break;
			case "page-uploadproducts":
                app.productController.resetProductForm();
                break;
			case "page-orderHistory":
                app.productOrderController.resetproductOrderForm();
                break;	
			case "page-negotiateHistory":
                app.negotiateOrderController.resetNegotiateOrderForm();
                break;	
    }
 });

$(document).delegate("#page-signup", "pagebeforecreate", function () {
    app.signupController.init();
    app.signupController.$btnSubmit.off("tap").on("tap", function () {
        app.signupController.onSignUpCommand();
    });
});

$(document).delegate("#page-signup-succeeded", "pagebeforecreate", function () {
    app.signupSucceededController.init();
    app.signupSucceededController.$btnSubmit.off("tap").on("tap", function () {
        app.signupSucceededController.onSignupSuccessCommand();
    });
});

$(document).delegate("#page-signin", "pagebeforecreate", function () {
    app.singinController.init();
    app.singinController.$btnSubmit.off("tap").on("tap", function () {
        app.singinController.onSignInCommand();
    });
});

$(document).delegate("#page-dashboard", "pagebeforecreate", function () {
    app.dashboardController.init();
    app.dashboardController.$btnSubmit.off("tap").on("tap", function () {
        app.dashboardController.onDashboardCommand();
    });
});

$(document).delegate("#page-uploadproducts", "pagebeforecreate", function () {
    app.productController.init();
    app.productController.$btnSubmit.off("tap").on("tap", function () {
        app.productController.onProductSubmitCommand();
    });
});

$(document).delegate("#page-orderHistory", "pagebeforecreate", function () {
    app.productOrderController.init();
   // app.productOrderController.$btnSubmit.off("tap").on("tap", function () {
    //    app.productOrderController.onprodutOrderHistoryCommand();
    //});
});

$(document).delegate("#page-negotiateHistory", "pagebeforecreate", function () {
    app.negotiateOrderController.init();
   // app.negotiateOrderController.$btnSubmit.off("tap").on("tap", function () {
   //     app.negotiateOrderController.onNegotiateOrderHistoryCommand();
  //  });
});


$(document).on('pagebeforeshow', '#page-uploadproducts', function(){ 
   
   var locCurrentLangType = localStorage.getItem("ngStorage-defLanguageType") == undefined ? "english" : localStorage.getItem("ngStorage-defLanguageType");
   var ngStorage_commodity = "ngStorage-commodity-" + locCurrentLangType.toLowerCase();
   
   var locCommodityDetails = $.parseJSON(localStorage.getItem(ngStorage_commodity));
	if(locCommodityDetails != ""){
		//update drowdown fields
		var productitems = [];
		var quantityitems = [];
		productitems.push("<option value='' data-placeholder='true' data-estimated-value='' >select product</option>");
		quantityitems.push("<option value='' data-placeholder='true' data-estimated-value=''  data-selected-product=''>select quantity</option>");
		
		$.each(locCommodityDetails,function(key,value){
			productitems.push("<option value='"+ key + "' data-placeholder='true' data-estimated-value='" + value.price + "' >" + value.item + "</option>");
			quantityitems.push("<option value='"+ key + "' data-placeholder='true' data-estimated-value='" + value.price + "'  data-selected-product='" + value.item +  "'>" + value.quantity + "</option>");
		});
	
	   $("#select-product").append(productitems);
	   $("#select-quantity").append(quantityitems);
	   $("#select-product").selectmenu();
	   $("#select-product").selectmenu('refresh', true);
	   $("#select-quantity").selectmenu();
	   $("#select-quantity").selectmenu('refresh', true);
	}
		
	$("#select-product").on("change",function(){
		var lblEstimateValue = $('option:selected', this).attr('data-estimated-value');
		$("#lbl-estimated-price").val(lblEstimateValue);		
	});	
	
	$("#select-quantity").on("change",function(){
		var lblEstimateValue = $('option:selected', this).attr('data-selected-product"');		
	});	
	
});

$(document).on('pagebeforeshow', '#page-orderHistory', function(){ 
    var j=0;
   var items = [];
   for(j=0;j<=5;j++){
        items.push("<tr><th><b class='ui-table-cell-label'>Submitted Date</b>"+j+"</th>");
        items.push("<td><b class='ui-table-cell-label'>Product</b>maek"+j+"</td>");
        items.push("<td><b class='ui-table-cell-label'>Estimated Price</b>good"+j +"</td>");
        items.push("<td><b class='ui-table-cell-label'>Quoted Price</b>arr"+j +"</td>");        
        items.push("<td><b class='ui-table-cell-label'>Status</b><select  class='flipswitch'  name='flip-min' id='flip-min"+j+"' data-role='slider'><option value='off"+j+"'>Switch Off</option<option value='on"+j+"'>Switch On</option></select>");
    }
      $('#orderHistoryTable')
		.find('tbody').append(items)
		.trigger('update');
		 
		 $(".flipswitch").slider();
			$(".flipswitch").slider( "refresh" );	

		$(".flipswitch").on("change",function(){
			var selectedValue = $( "option:selected", this ).val();
			alert(selectedValue);
		});
});