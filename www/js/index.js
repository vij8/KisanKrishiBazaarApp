var BookIt = BookIt || {};

// Begin boilerplate code generated with Cordova project.

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
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) { 
        //var options = { timeout: 30000 };
        //http://docs.phonegap.com/en/edge/cordova_geolocation_geolocation.md.html
        var options = { enableHighAccuracy: true };
        watchID = navigator.geolocation.watchPosition(this.geoLocationOnSuccess, this.geoLocationOnError, options);
       // app.checkLocale();
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
    
    checkLocale : function() {
      navigator.globalization.getLocaleName(
        function (locale) {alert('locale: ' + locale.value + '\n');},
        function () {alert('Error getting locale\n');}
      );
    }
    
};


app.initialize();

// End boilerplate code.

$(document).on("mobileinit", function (event, ui) {
    $.mobile.defaultPageTransition = "slide";
});

app.signupController = new BookIt.SignUpController();
app.singinController = new BookIt.SignInController();

$(document).on("pagecontainerbeforeshow", function (event, ui) {
    if (typeof ui.toPage == "object") {
        switch (ui.toPage.attr("id")) {
            case "page-signup":
                // Reset the signup form.
                app.signupController.resetSignUpForm();
                break;
                
            case "page-signin":
                app.singinController.resetSignInForm();
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

$(document).delegate("#page-signin", "pagebeforecreate", function () {

    app.singinController.init();

    app.singinController.$btnSubmit.off("tap").on("tap", function () {
        app.singinController.onSignInCommand();
    });

});