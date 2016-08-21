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
        navigator.geolocation.getCurrentPosition(geoLocationOnSuccess, geoLocationOnError);
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
			  $.getJSON( BookIt.Settings.getDefaultLanguage + "?type=" +languageName, {
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
    
    getCommodity : function(){
        var locCommodity = localStorage.getItem("ngStorage-commodity");
        var locCommodityDate = localStorage.getItem("ngStorage-commodityDate")
        var currentDate = new Date().toJSON().slice(0,10);
        if(locCommodity == "" || locCommodityDate != currentDate)
        {
          $.getJSON( BookIt.Settings.getCommodity , {
            format: "json"
          })
            .done(function( data ) {
              var cacheData = data;
              localStorage.setItem('ngStorage-commodityDate', currentDate);
              localStorage.setItem('ngStorage-commodity', JSON.stringify(data));
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
app.getCommodity();

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
});
    
app.signupController = new BookIt.SignUpController();
app.singinController = new BookIt.SignInController();
app.signupSucceededController = new BookIt.signupSucceededController();
app.dashboardController = new BookIt.dashboardController();
app.productController = new BookIt.productController();

$(document).on("pagecontainerbeforeshow", function (event, ui) {
    if (typeof ui.toPage == "object") {
        switch (ui.toPage.attr("id")) {
            case "page-signup":
                // Reset the signup form.
                app.signupController.resetSignUpForm();
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
        }
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