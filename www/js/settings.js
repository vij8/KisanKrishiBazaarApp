var BookIt = BookIt || {};
BookIt.Settings = BookIt.Settings || {};
BookIt.Settings.language = BookIt.Settings.language || {};
BookIt.Settings.api = BookIt.Settings.api || {};


BookIt.Settings.AppErrorMessage = BookIt.Settings.AppErrorMessage || {};
BookIt.Settings.AppErrorMessage.english = BookIt.Settings.AppErrorMessage.english || {};
BookIt.Settings.AppErrorMessage.hindi = BookIt.Settings.AppErrorMessage.hindi || {};
BookIt.Settings.AppErrorMessage.marathi = BookIt.Settings.AppErrorMessage.marathi || {};


BookIt.Settings.sessionTimeoutInMSec = "30000";
//BookIt.Settings.signUpUrl = "http://10.216.240.36:8080/retailer/register"; 
//BookIt.Settings.signInUrl =  "http://10.216.240.36:8080/farmer/login"; 
//BookIt.Settings.validateUserNameUrl = "http://10.216.240.36:8080/farmer/Isvaliduser"; // ?username=
//BookIt.Settings.getDefaultLanguage = "http://10.216.240.36:8080/farmer/translation"; //?Language=
//BookIt.Settings.getCommodity = "http://10.216.240.36:8080/farmer/getCommodity"; // ?languageReq=english
//BookIt.Settings.api.postProductDetail = "http://10.216.240.36:8080/farmer/orderInsert";//
//BookIt.Settings.api.getOrderHistoryByUserName = "http://10.216.240.36:8080/farmer/getOrderHistory"; //?Language,username

//BookIt.Settings.signUpUrl = "http://10.216.241.192:8080/retailer/register"; 
//BookIt.Settings.signInUrl =  "http://10.216.241.192:8080/farmer/login"; 
//BookIt.Settings.validateUserNameUrl = "http://10.216.241.192:8080/farmer/Isvaliduser"; // ?username=
//BookIt.Settings.getDefaultLanguage = "http://10.216.241.192:8080/farmer/translation"; //?Language=
//BookIt.Settings.getCommodity = "http://10.216.241.192:8080/farmer/getCommodity"; // ?languageReq=english
//BookIt.Settings.api.postProductDetail = "http://10.216.241.192:8080/farmer/orderInsert";//
//BookIt.Settings.api.getOrderHistoryByUserName = "http://10.216.241.192:8080/farmer/getOrderHistory"; //?Language,username


BookIt.Settings.signUpUrl = "http://52.76.193.103:8080/retailer/register"; 
BookIt.Settings.signInUrl =  "http://52.76.193.103:8080/farmer/login"; 
BookIt.Settings.validateUserNameUrl = "http://52.76.193.103:8080/farmer/Isvaliduser"; // ?username=
BookIt.Settings.getDefaultLanguage = "http://52.76.193.103:8080/farmer/translation"; //?Language=
BookIt.Settings.getCommodity = "http://52.76.193.103:8080/farmer/getCommodity"; // ?languageReq=english
BookIt.Settings.api.postProductDetail = "http://52.76.193.103:8080/farmer/orderInsert";//
BookIt.Settings.api.getOrderHistoryByUserName = "http://52.76.193.103:8080/farmer/getOrderHistory"; //?Language,username



BookIt.Settings.AppErrorMessage.english.QuotepricelessthanEstimatedPrice = "Quote price can not be greater than estimated-price";
BookIt.Settings.AppErrorMessage.hindi.QuotepricelessthanEstimatedPrice = "बोली का मूल्य अनुमान मूल्य से अधिक नहीं हो सकता है";
BookIt.Settings.AppErrorMessage.marathi.QuotepricelessthanEstimatedPrice = "कोट किंमत अंदाजे किंमत पेक्षा जास्त असू शकत नाही";

BookIt.Settings.AppErrorMessage.english.productRequiredField = "Please enter all the required fields";
BookIt.Settings.AppErrorMessage.hindi.productRequiredField = "सभी आवश्यक फ़ील्ड दर्ज करें";
BookIt.Settings.AppErrorMessage.marathi.productRequiredField = "सर्व आवश्यक फील्ड प्रविष्ट करा";

BookIt.Settings.AppErrorMessage.english.userExist = "user name already exist";
BookIt.Settings.AppErrorMessage.hindi.userExist = "उपयोगकर्ता नाम पहले से मौजूद";
BookIt.Settings.AppErrorMessage.marathi.userExist = "वापरकर्ता नाव आधीच अस्तित्वात";

BookIt.Settings.AppErrorMessage.english.passwordmismatch = "Your passwords don't match";
BookIt.Settings.AppErrorMessage.hindi.passwordmismatch = "आपके पासवर्ड मेल नहीं खाते";
BookIt.Settings.AppErrorMessage.marathi.passwordmismatch = "आपले संकेतशब्द जुळत नाही";

BookIt.Settings.AppErrorMessage.english.serverError = "Oops! server issue. Please try again in a few minutes";
BookIt.Settings.AppErrorMessage.hindi.serverError = "उफ़! सर्वर मुद्दा। कृपया कुछ देर बाद दुबारा कोशिश करे";
BookIt.Settings.AppErrorMessage.marathi.serverError = "अरेरे! सर्व्हर समस्या. काही मिनिटांत पुन्हा प्रयत्न करा";








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