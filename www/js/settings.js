var BookIt = BookIt || {};
BookIt.Settings = BookIt.Settings || {};
BookIt.Settings.language = BookIt.Settings.language || {};
BookIt.Settings.api = BookIt.Settings.api || {};
BookIt.Settings.AppErrorMessage = BookIt.Settings.AppErrorMessage || {};
BookIt.Settings.AppErrorMessage.english = BookIt.Settings.AppErrorMessage.english || {};
BookIt.Settings.AppErrorMessage.hindi = BookIt.Settings.AppErrorMessage.hindi || {};
BookIt.Settings.AppErrorMessage.marathi = BookIt.Settings.AppErrorMessage.marathi || {};

BookIt.Settings.signUpUrl = "http://192.168.1.104:30000/api/account/register"; 
BookIt.Settings.signInUrl =  "http://10.216.240.36:4567/retailer/login";//"http://10.216.240.36:4567/kkb/login"; 
BookIt.Settings.validateUserNameUrl = "http://192.168.1.104:30000/api/account/register";
BookIt.Settings.getDefaultLanguage = "/json/language.json";
BookIt.Settings.getCommodity = "/json/commodity_hindi.json";//"http://10.216.240.36:4567/farmer/getCommodity/";//"/json/commodity_response.json";
BookIt.Settings.api.postProductDetail = "http://10.216.240.36:4567/kkb/postproductDetail";



BookIt.Settings.AppErrorMessage.english.requiredfield = "Quote price can not be greater than estimated-price";
BookIt.Settings.AppErrorMessage.english.QuotepricelessthanEstimatedPrice = "Quote price can not be greater than estimated-price";












BookIt.Settings.language.wcf_lblPageHeading = "wcf-lblPageHeading";
BookIt.Settings.language.wcf_lblPageContentHeading= "wcf-lblPageContentHeading";
BookIt.Settings.language.wcf_lblSignIn ="wcf-lblSignIn";
BookIt.Settings.language.wcf_lblSignUp ="wcf-lblSignUp";
BookIt.Settings.language.wcf_btnSignIn ="wcf-btnSignIn";
BookIt.Settings.language.wcf_btnSignUp ="wcf-btnSignUp";
BookIt.Settings.language.wcf_lblselectLanguage = "wcf-lblselectLanguage";
BookIt.Settings.language.wcf_footerText = "wcf_footerText";
BookIt.Settings.language.sif_lblPageHeading = "sif-lblPageHeading";
BookIt.Settings.language.sif_lblPageContentHeading = "sif-lblPageContentHeading";
BookIt.Settings.language.sif_lblUserName = "sif-lblUserName";
BookIt.Settings.language.sif_lblPassword ="sif-lblPassword";
BookIt.Settings.language.sif_btnsubmit ="sif-btnsubmit";
BookIt.Settings.language.sif_lblRememberMe ="sif-lblRememberMe";
BookIt.Settings.language.sif_lblCantAccessAccount = "sif-lblCantAccessAccount";
BookIt.Settings.language.sif_footerText = "sif-footerText";
BookIt.Settings.language.suf_lblPageHeading = "suf-lblPageHeading";
BookIt.Settings.language.suf_lblPageContentHeading = "suf-lblPageContentHeading";
BookIt.Settings.language.suf_lblFirstname = "suf-lblFirstname";
BookIt.Settings.language.suf_lblLastname ="suf-lblLastname";
BookIt.Settings.language.suf_lblUserName ="suf-lblUserName";
BookIt.Settings.language.suf_lblpassword ="suf-lblpassword";
BookIt.Settings.language.suf_lblConfirmPassword ="suf-lblConfirmPassword";
BookIt.Settings.language.suf_btnSubmit ="suf-btnSubmit";
BookIt.Settings.language.suf_footerText ="suf-footerText";
BookIt.Settings.language.susf_btnSubmit ="susf-btnSubmit";
BookIt.Settings.language.susf_lblSuccessMessage = "susf-lblSuccessMessage";
BookIt.Settings.language.susf_lblPageContentHeading ="susf-lblPageContentHeading";
BookIt.Settings.language.susf_lblPageHeading ="susf-lblPageHeading";
BookIt.Settings.language.susf_footerText ="susf-footerText";