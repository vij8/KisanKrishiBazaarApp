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
        //var options = { timeout: 30000 };
        //http://docs.phonegap.com/en/edge/cordova_geolocation_geolocation.md.html
        var options = { enableHighAccuracy: true };
        watchID = navigator.geolocation.watchPosition(this.geoLocationOnSuccess, this.geoLocationOnError, options);
    },
    
    // onSuccess Geolocation
    geoLocationOnSuccess : function(position){
         var element = document.getElementById('geolocation');
        element.innerHTML = "";    
        element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
                            'Longitude: ' + position.coords.longitude     + '<br />' +
                            '<hr />'      + element.innerHTML;
    },
    
    // onError Callback receives a PositionError object
    geoLocationOnError : function(error){
         alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
    },
    
    onLogoutConfirm : function(){
        alert('You selected button ' + buttonIndex);
        if(buttonIndex == 0){
                //navigator.app.exitApp(); // Exit app
            $.mobile.navigate("#page-index");
            
        }else{
            
        }
    },
    
    showLogoutConfirm : function() {
        navigator.notification.confirm(
            'Are you sure!', // message
             app.onLogoutConfirm,            // callback to invoke with index of button pressed
            'log out',           // title
            ['Ok','Cancel']         // buttonLabels
        );
    },
    
    getAppLanguage : function(languageName){
        var locCurrentData = localStorage.getItem("ngStorage-defLanguageData");
        var locCurrentLangType = localStorage.getItem("ngStorage-defLanguageType")
        if(locCurrentData == "" || locCurrentLangType != languageName)
        {
          $.getJSON( BookIt.Settings.getDefaultLanguage + "?type=" +languageName, {
            format: "json"
          })
            .done(function( data ) {
              var cacheData = data;
              localStorage.setItem('ngStorage-defLanguageType', languageName);
              localStorage.setItem('ngStorage-defLanguageData', JSON.stringify(data));
            })
              .fail(function( jqxhr, textStatus, error ) {
                var err = textStatus + ", " + error;
                console.log( "Application Language request failed: " + err );
          });
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
    }

    
    
};


app.initialize();
app.getAppLanguage("english");
app.getCommodity();

// End boilerplate code.

$(document).on("mobileinit", function (event, ui) {
    $.mobile.defaultPageTransition = "slide";
});

    // Show a custom confirmation dialog
    //
    
app.signupController = new BookIt.SignUpController();
app.singinController = new BookIt.SignInController();
app.signupSucceededController = new BookIt.signupSucceededController();
app.dashboardController = new BookIt.dashboardController();

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