var BookIt = BookIt || {};

BookIt.signupSucceededController = function () {

    this.$signUpSucceededPage = null;
    this.$btnSubmit = null;
};

BookIt.signupSucceededController.prototype.init = function () {
    this.$signUpSucceededPage = $("#page-signup-succeeded");
    this.$btnSubmit = $("#btn-submit", this.$signUpSucceededPage);
};


BookIt.signupSucceededController.prototype.resetSignUpSucceededForm = function () {

  //var invisibleStyle = "bi-invisible",
//      invalidInputStyle = "bi-invalid-input";
};

BookIt.signupSucceededController.prototype.onSignupSuccessCommand = function () { 
$.mobile.navigate("#page-dashboard");
    return;
};