var BookIt = BookIt || {};

BookIt.SignUpController = function () {

    this.$signUpPage = null;
    this.$btnSubmit = null;
    this.$ctnErr = null;
    this.$txtFirstName = null;
    this.$txtLastName = null;
    this.$txtUserName = null;
    this.$txtPassword = null;
    this.$txtPasswordConfirm = null;
    this.$lblPageHeading = null;
};

BookIt.SignUpController.prototype.init = function () {
    this.$signUpPage = $("#page-signup");
    this.$btnSubmit = $("#suf_btnSubmit", this.$signUpPage);
    this.$ctnErr = $("#ctn-err", this.$signUpPage);
    this.$txtFirstName = $("#txt-first-name", this.$signUpPage);
    this.$txtLastName = $("#txt-last-name", this.$signUpPage);
    this.$txtUserName = $("#txt-user-name", this.$signUpPage);
    this.$txtPassword = $("#txt-password", this.$signUpPage);
    this.$txtPasswordConfirm = $("#txt-password-confirm", this.$signUpPage);
};

BookIt.SignUpController.prototype.passwordsMatch = function (password, passwordConfirm) {
    return password === passwordConfirm;
};

BookIt.SignUpController.prototype.passwordIsComplex = function (password) {
    // TODO: implement complex password rules here.  There should be similar rule on the server side.
    return true;
};

BookIt.SignUpController.prototype.userNameIsValid = function (userName) {
    var url = BookIt.Settings.validateUserNameUrl;
	return true;
    $.post(url,{username: userName}, function(data){
    if(data.exists){
        return false;//user already exist . try new username
    }else{
        return true; //proceed with this UserName;
    }
 }, 'JSON');
    
};

BookIt.SignUpController.prototype.resetSignUpForm = function () {

    var invisibleStyle = "bi-invisible",
        invalidInputStyle = "bi-invalid-input";

    this.$ctnErr.html("");
    this.$ctnErr.removeClass().addClass(invisibleStyle);
    this.$txtFirstName.removeClass(invalidInputStyle);
    this.$txtLastName.removeClass(invalidInputStyle);
    this.$txtUserName.removeClass(invalidInputStyle);
    this.$txtPassword.removeClass(invalidInputStyle);
    this.$txtPasswordConfirm.removeClass(invalidInputStyle);

    this.$txtFirstName.val("");
    this.$txtLastName.val("");
    this.$txtUserName.val("");
    this.$txtPassword.val("");
    this.$txtPasswordConfirm.val("");
    
    
    

};

BookIt.SignUpController.prototype.onSignUpCommand = function () {

    var me = this,
        firstName = me.$txtFirstName.val().trim(),
        lastName = me.$txtLastName.val().trim(),
        userName = me.$txtUserName.val().trim(),
        password = me.$txtPassword.val().trim(),
        passwordConfirm = me.$txtPasswordConfirm.val().trim(),
        invalidInput = false,
        invisibleStyle = "bi-invisible",
        invalidInputStyle = "bi-invalid-input";

    // Reset styles.
    me.$ctnErr.removeClass().addClass(invisibleStyle);
    me.$txtFirstName.removeClass(invalidInputStyle);
    me.$txtLastName.removeClass(invalidInputStyle);
    me.$txtUserName.removeClass(invalidInputStyle);
    me.$txtPassword.removeClass(invalidInputStyle);
    me.$txtPasswordConfirm.removeClass(invalidInputStyle);

	var currentLanguage = localStorage.getItem("ngStorage-defLanguageType");
	
    // Flag each invalid field.
    if (firstName.length === 0) {
        me.$txtFirstName.addClass(invalidInputStyle);
        invalidInput = true;
    }
    if (lastName.length === 0) {
        me.$txtLastName.addClass(invalidInputStyle);
        invalidInput = true;
    }
    if (userName.length === 0) {
        me.$txtUserName.addClass(invalidInputStyle);
        invalidInput = true;
    }
    if (password.length === 0) {
        me.$txtPassword.addClass(invalidInputStyle);
        invalidInput = true;
    }
    if (passwordConfirm.length === 0) {
        me.$txtPasswordConfirm.addClass(invalidInputStyle);
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

    if (!me.userNameIsValid(userName)) {
         if(currentLanguage == "") {
			me.$ctnErr.html("<p>"+ BookIt.Settings.AppErrorMessage.english.userExist +".</p>");
		}else{
			switch(currentLanguage.toLowerCase()){
				case "hindi" :
				me.$ctnErr.html("<p>"+ BookIt.Settings.AppErrorMessage.hindi.userExist +".</p>");
				break;
				case "marathi" :
				me.$ctnErr.html("<p>"+ BookIt.Settings.AppErrorMessage.marathi.userExist +".</p>");
				break;
				default:
				me.$ctnErr.html("<p>"+ BookIt.Settings.AppErrorMessage.english.userExist +".</p>");
				break;
			}
		}
        me.$ctnErr.addClass("bi-ctn-err").slideDown();
        me.$txtUserName.addClass(invalidInputStyle);
        return;
    }

    if (!me.passwordsMatch(password, passwordConfirm)) {
         if(currentLanguage == "") {
			me.$ctnErr.html("<p>"+ BookIt.Settings.AppErrorMessage.english.passwordmismatch +".</p>");
		}else{
			switch(currentLanguage.toLowerCase()){
				case "hindi" :
				me.$ctnErr.html("<p>"+ BookIt.Settings.AppErrorMessage.hindi.passwordmismatch +".</p>");
				break;
				case "marathi" :
				me.$ctnErr.html("<p>"+ BookIt.Settings.AppErrorMessage.marathi.passwordmismatch +".</p>");
				break;
				default:
				me.$ctnErr.html("<p>"+ BookIt.Settings.AppErrorMessage.english.passwordmismatch +".</p>");
				break;
			}
		}
        me.$ctnErr.addClass("bi-ctn-err").slideDown();
        me.$txtPassword.addClass(invalidInputStyle);
        me.$txtPasswordConfirm.addClass(invalidInputStyle);
        return;
    }

    if (!me.passwordIsComplex(password)) {
        // TODO: Use error message to explain password rules.
        me.$ctnErr.html("<p>Your password is very easy to guess.  Please try a more complex password.</p>");
        me.$ctnErr.addClass("bi-ctn-err").slideDown();
        me.$txtPassword.addClass(invalidInputStyle);
        me.$txtPasswordConfirm.addClass(invalidInputStyle);
        return;
    }
	$.mobile.navigate("#page-signup-succeeded");
    return;
    $.ajax({
        type: 'POST',
        url: BookIt.Settings.signUpUrl,
        data: "userName=" + userName + "&firstName=" + firstName + "&lastName=" + lastName + "&password=" + password + "&passwordConfirm=" + passwordConfirm + "&lat=" + currentlatitute + "&long=" + currentlongitude,
        success: function (resp) {

            if (resp.success === true) {
                $.mobile.navigate("#page-signup-succeeded");
                return;
            } else {
                if (resp.extras.msg) {
                    switch (resp.extras.msg) {
                        case BookIt.ApiMessages.DB_ERROR:
                        case BookIt.ApiMessages.COULD_NOT_CREATE_USER:
                            // TODO: Use a friendlier error message below.
                            me.$ctnErr.html("<p>Oops! Sign up had a problem and could not register you.  Please try again in a few minutes.</p>");
                            me.$ctnErr.addClass("bi-ctn-err").slideDown();
                            break;
                        case BookIt.ApiMessages.EMAIL_ALREADY_EXISTS:
                            me.$ctnErr.html("<p>The user name that you provided is already registered.</p>");
                            me.$ctnErr.addClass("bi-ctn-err").slideDown();
                            me.$txtEmailAddress.addClass(invalidInputStyle);
                            break;
                    }
                }
            }
        },
        error: function (e) {
            console.log(e.message);
            // TODO: Use a friendlier error message below.
            me.$ctnErr.html("<p>Oops! BookIt had a problem and could not register you.  Please try again in a few minutes.</p>");
            me.$ctnErr.addClass("bi-ctn-err").slideDown();
        }
    });
};