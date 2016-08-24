	var BookIt = BookIt || {};

BookIt.SignInController = function () {

    this.$signInPage = null;
    this.$btnSubmit = null;
    this.$txtUserName = null;
    this.$txtPassword = null;
    this.$chkKeepSignedIn = null;
    this.$ctnErr = null;
    this.mainMenuPageId = null;
};

BookIt.SignInController.prototype.init = function () {
    this.$signInPage = $("#page-signin");
    this.mainMenuPageId = "#page-dashboard";
    this.$btnSubmit = $("#btn-submit", this.$signInPage);
    this.$ctnErr = $("#ctn-err", this.$signInPage);
    this.$txtUserName = $("#txt-UserName", this.$signInPage);
    this.$txtPassword = $("#txt-password", this.$signInPage);
    this.$chkKeepSignedIn = $("#chk-keep-signed-in", this.$signInPage);  
};


BookIt.SignInController.prototype.resetSignInForm = function () {

  var invisibleStyle = "bi-invisible",
      invalidInputStyle = "bi-invalid-input";
    
    this.$ctnErr.html("");
    this.$ctnErr.removeClass().addClass(invisibleStyle);
    this.$txtUserName.removeClass(invalidInputStyle);
    this.$txtPassword.removeClass(invalidInputStyle);
    this.$txtUserName.val("");
    this.$txtPassword.val("");
    this.$chkKeepSignedIn.prop("checked", false);

};

BookIt.SignInController.prototype.onSignInCommand = function () {
    var me = this,
        userName = me.$txtUserName.val().trim(),
        password = me.$txtPassword.val().trim(),
        invalidInput = false,
        invisibleStyle = "bi-invisible",
        invalidInputStyle = "bi-invalid-input";
    // Reset styles.
    me.$ctnErr.removeClass().addClass(invisibleStyle);
    me.$txtUserName.removeClass(invalidInputStyle);
    me.$txtPassword.removeClass(invalidInputStyle);
	
	var currentLanguage = localStorage.getItem("ngStorage-defLanguageType");
	
    // Flag each invalid field.
    if (userName.length === 0) {
        me.$txtUserName.addClass(invalidInputStyle);
        invalidInput = true;
    }
    if (password.length === 0) {
        me.$txtPassword.addClass(invalidInputStyle);
        invalidInput = true;
    }
    // Make sure that all the required fields have values.
    if (invalidInput) {
        if(currentLanguage == "") {
			me.$ctnErr.html("<p>"+ BookIt.Settings.AppErrorMessage.english.productRequiredField +".</p>");
		}else{
			switch(currentLanguage.toLowerCase()){
				case "hindi" :
				me.$ctnErr.html("<p>"+ BookIt.Settings.AppErrorMessage.hindi.productRequiredField +".</p>");
				break;
				case "marathi" :
				me.$ctnErr.html("<p>"+ BookIt.Settings.AppErrorMessage.marathi.productRequiredField +".</p>");
				break;
				default:
				me.$ctnErr.html("<p>"+ BookIt.Settings.AppErrorMessage.english.productRequiredField +".</p>");
				break;
			}
		}
        me.$ctnErr.addClass("bi-ctn-err").slideDown();
        return;
    }
    
    $.mobile.loading("show");
    $.ajax({
        type: 'POST',
        url: BookIt.Settings.signInUrl,
        data: "username=" + userName + "&password=" + password,
        success: function (resp) {
            $.mobile.loading("hide");
			if(resp != ""){
				var locUsrDetails = $.parseJSON(resp);
				if(locUsrDetails != ""){
					localStorage.setItem("loggedInUser",resp)
					
				}
				if (locUsrDetails.username != "") {
					// Create session. 
					localStorage.setItem("ngStorage-loggedInUserName",locUsrDetails.username)
					var today = new Date();
					var expirationDate = new Date();
					expirationDate.setTime(today.getTime() + BookIt.Settings.sessionTimeoutInMSec);
					BookIt.Session.getInstance().set({
						userProfileModel: locUsrDetails.username,
						sessionId: locUsrDetails.username +'-'+ today.getTime() + BookIt.Settings.sessionTimeoutInMSec,//resp.extras.sessionId,
						expirationDate: expirationDate,
						keepSignedIn:me.$chkKeepSignedIn.is(":checked")
					});
					// Go to main menu.
					$.mobile.navigate(me.mainMenuPageId);
					return;
				}
				else{
				 // TODO: Use a friendlier error message below.
					me.$ctnErr.html("<p>Oops! BookIt had a problem and could not log you on.  Please try again in a few minutes.</p>");
					me.$ctnErr.addClass("bi-ctn-err").slideDown();	
				}
			}
			else {
                 // TODO: Use a friendlier error message below.
				me.$ctnErr.html("<p>Oops! BookIt had a problem and could not log you on.  Please try again in a few minutes.</p>");
                me.$ctnErr.addClass("bi-ctn-err").slideDown();
            }
        },
        error: function (e) {
            $.mobile.loading("hide");
            console.log(e.message);
            // TODO: Use a friendlier error message below.
            me.$ctnErr.html("<p>Oops! BookIt had a problem and could not log you on.  Please try again in a few minutes.</p>");
            me.$ctnErr.addClass("bi-ctn-err").slideDown();
        }
    });
};