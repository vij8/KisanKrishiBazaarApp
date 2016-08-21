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
    this.mainMenuPageId = "#page-main-menu";
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
        me.$ctnErr.html("<p>Please enter all the required fields.</p>");
        me.$ctnErr.addClass("bi-ctn-err").slideDown();
        return;
    }
    
    $.mobile.loading("show");
    $.ajax({
        type: 'POST',
        url: BookIt.Settings.signInUrl,
        data: "email=" + userName + "&password=" + password,
        success: function (resp) {
            $.mobile.loading("hide");
            if (resp.success === true) {
                // Create session. 
                var today = new Date();
                var expirationDate = new Date();
                expirationDate.setTime(today.getTime() + BookIt.Settings.sessionTimeoutInMSec);
                BookIt.Session.getInstance().set({
                    userProfileModel: resp.extras.userProfileModel,
                    sessionId: resp.extras.sessionId,
                    expirationDate: expirationDate,
                    keepSignedIn:me.$chkKeepSignedIn.is(":checked")
                });
                // Go to main menu.
                $.mobile.navigate(me.mainMenuPageId);
                return;
            } else {
                if (resp.extras.msg) {
                    switch (resp.extras.msg) {
                        case BookIt.ApiMessages.DB_ERROR:
                        // TODO: Use a friendlier error message below.
                            me.$ctnErr.html("<p>Oops! BookIt had a problem and could not log you on.  Please try again in a few minutes.</p>");
                            me.$ctnErr.addClass("bi-ctn-err").slideDown();
                            break;
                        case BookIt.ApiMessages.INVALID_PWD:
                        case BookIt.ApiMessages.EMAIL_NOT_FOUND:
                            me.$ctnErr.html("<p>You entered a wrong username or password.  Please try again.</p>");
                            me.$ctnErr.addClass("bi-ctn-err").slideDown();
                            me.$txtEmailAddress
.addClass(invalidInputStyle);
                            break;
                    }
                }
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