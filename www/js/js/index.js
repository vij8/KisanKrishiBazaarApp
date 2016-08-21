var BookIt = BookIt || {};

$(document).ready(function(){
    //set Language
   $(".selAppLang a").on('click',function(e){
       var currentSelectedLanType = localStorage.getItem("ngStorage-defLanguageType");
       if(currentSelectedLanType != ""){
           var languageName = $(this).attr("data-selAppLang");
           app.getAppLanguage(languageName);
           $.mobile.loading("show");
              updateApplicationLanguage();
           $.mobile.loading("hide");
       }
   }); 
    
    
  

    function updateApplicationLanguage(){
        var readLanguageJson = JSON.parse(localStorage.getItem("ngStorage-defLanguageData"));
        $.each(readLanguageJson,function(key,value){
            if(key.toLowerCase().indexOf("wcf-") >= 0){
                updateWelcomePage(key,value);
            }
            else if(key.toLowerCase().indexOf("suf-") >= 0){
                updateSignUpPage(key,value);
            }
            else if(key.toLowerCase().indexOf("sif-") >= 0){
                updateSignInPage(key,value);
            }
            else if(key.toLowerCase().indexOf("susf-") >= 0){
                updateSignupSucceededPage(key,value);
            }
            else if(key.toLowerCase().indexOf("db-") >= 0){
                updateDashboardPage(key,value);
            }
                
        });
    }
    
    
    function updateWelcomePage(key,value){
        switch(key){
            case BookIt.Settings.language.wcf_lblPageHeading:
               $("#wcf_lblPageHeading").html(value);
                break;
            case BookIt.Settings.language.wcf_lblPageConentHeading: 
            $("#wcf_lblPageConentHeading").html(value);
                break;
            case BookIt.Settings.language.wcf_lblselectLanguage:
                $("#wcf_lblselectLanguage").html(value);
                break;
            case BookIt.Settings.language.wcf_lblSignIn:
                $("#wcf_lblSignIn").html(value);
                break;
            case BookIt.Settings.language.wcf_lblselectLanguage:
                $("#wcf_lblselectLanguage").html(value);
                break;
            case BookIt.Settings.language.wcf_lblselectLanguage:
                $("#wcf_lblselectLanguage").html(value);
                break;
            case BookIt.Settings.language.wcf_lblselectLanguage:
                $("#wcf_lblselectLanguage").html(value);
                break;
            default:
                break;
            }
        }
                
    function updateSignUpPage(key,value){
              switch(key){
                  case BookIt.Settings.language.suf_lblPageHeading:
               $("#suf-lbl-pageHeading").html(value);
                break;
                  case BookIt.Settings.language.suf_lblPageContentHeading:
            $("#suf_lblPageContentHeading").html(value);
                break;
                  case BookIt.Settings.language.suf_lblFirstname:
                $("#suf_lblFirstname").html(value);
                break;
                  default:
                break;
            }
        }
    
    function updateSignInPage(key,value){
                
        }
    
    function updateSignupSucceededPage(key,value){
        
    }
    
    function updateDashboardPage(key,value){
        
    }
      
    
});