$(document).ready(function(){
    //set Language
   $(".selAppLang a").on('click',function(e){
       var currentSelectedLanType = localStorage.getItem("ngStorage-defLanguageType");
       if(currentSelectedLanType != ""){
           var languageName = $(this).attr("data-selAppLang");
           app.getAppLanguage(languageName);           
       }
   }); 
   
   $("#btn-logout-yes").on('click',function(e){
	   app.closeApplication();	   
   });
   
   $("#select-product").bind("change",function(){
	   setOptionValue();
	   var selEstimatedPrice = $(this).attr("data-estimated-value");
	   if(selEstimatedPrice != ""){
		   $("#lbl-estimated-price").val(selEstimatedPrice);
	   }
   });
   
   $("#select-quantity").bind("change",function(){
	  var selEstimatedPrice = $(this).attr("data-estimated-value");
	   var selEstimatedPrice = $(this).attr("data-selected-product");
	   if(selEstimatedPrice != ""){
		  // $("#lbl-estimated-price").val(selEstimatedPrice);
	   }
	});
      
});


function setOptionValue(value){
  var reminderSettings = $("#select-product");
  reminderSettings.val(value).attr('selected', true).siblings('option').removeAttr('selected');  
	reminderSettings.selectmenu("refresh", true);  
}


function updateCommodityDetails(localStorageName){
	var locCommodityDetails = $.parseJSON(localStorage.getItem(localStorageName));
	if(locCommodityDetails != ""){
		//update drowdown fields
		var productitems = [];
		var quantityitems = [];
		$.each(locCommodityDetails,function(key,value){
			productitems.push("<option value='"+ key + "' data-placeholder='true' data-estimated-value='" + value.price + "' >" + value.item + "</option>");
			
			quantityitems.push("<option value='"+ key + "' data-placeholder='true' data-estimated-value='" + value.price + "'  data-selected-product='" + value.item +  "'>" + value.quantity + "</option>");
		});
		$('#select-product').append(productitems);
		
		$('#select-quantity').append(quantityitems);
				
	}
	
}

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
            case BookIt.Settings.language.wcf_lblPageContentHeading: 
            $("#wcf_lblPageContentHeading").html(value);
                break;
            case BookIt.Settings.language.wcf_lblselectLanguage:
                $("#wcf_lblselectLanguage").html(value);
                break;
            case BookIt.Settings.language.wcf_lblSignIn:
                $("#wcf_lblSignIn").html(value);
                break;
			case BookIt.Settings.language.wcf_lblSignUp:
                $("#wcf_lblSignUp").html(value);
                break;
			case BookIt.Settings.language.wcf_btnSignIn:
                $("#wcf_btnSignIn").html(value);
                break;
			case BookIt.Settings.language.wcf_btnSignUp:
                $("#wcf_btnSignUp").html(value);
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
			case BookIt.Settings.language.wcf_footerText:
                $("#wcf_footerText").html(value);
                break;	
            default:
                break;
            }
        }
                
    function updateSignUpPage(key,value){
              switch(key){
                case BookIt.Settings.language.suf_lblPageHeading:
					$("#suf_lblPageHeading").html(value);
					break;
                case BookIt.Settings.language.suf_lblPageContentHeading:
					$("#suf_lblPageContentHeading").html(value);
					break;
                case BookIt.Settings.language.suf_lblFirstname:
					$("#suf_lblFirstname").html(value);
					break;
				case BookIt.Settings.language.suf_lblLastname:
					$("#suf_lblLastname").html(value);
					break;
				case BookIt.Settings.language.suf_lblUserName:
					$("#suf_lblUserName").html(value);
					break;					
				case BookIt.Settings.language.suf_lblpassword:
					$("#suf_lblpassword").html(value);
					break;
				case BookIt.Settings.language.suf_lblConfirmPassword:
					$("#suf_lblConfirmPassword").html(value);
					break;
				case BookIt.Settings.language.suf_btnSubmit:
					$("#suf_btnSubmit").html(value);
					break;
				case BookIt.Settings.language.suf_footerText:
					$("#suf_footerText").html(value);
					break;
				default:
					break;
            }
        }
    
    function updateSignInPage(key,value){
		 switch(key){
            case BookIt.Settings.language.sif_lblPageHeading:
               $("#sif_lblPageHeading").html(value);
                break;
            case BookIt.Settings.language.wcf_lblPageContentHeading: 
            $("#wcf_lblPageContentHeading").html(value);
                break;
            case BookIt.Settings.language.sif_lblUserName:
                $("#sif_lblUserName").html(value);
                break;
            case BookIt.Settings.language.sif_lblPassword:
                $("#sif_lblPassword").html(value);
                break;
			case BookIt.Settings.language.sif_lblRememberMe:
                $("#sif_lblRememberMe").html(value);
                break;
			case BookIt.Settings.language.sif_lblCantAccessAccount:
                $("#sif_lblCantAccessAccount").html(value);
                break;
			case BookIt.Settings.language.sif_btnsubmit:
                $("#sif_btnsubmit").html(value);
                break;		
            case BookIt.Settings.language.sif_footerText:
                $("#sif_footerText").html(value);
                break;
            default:
                break;
            }
        }
    
    function updateSignupSucceededPage(key,value){
		switch(key){
            case BookIt.Settings.language.susf_lblSuccessMessage:
               $("#susf_lblSuccessMessage").html(value);
                break;
            case BookIt.Settings.language.susf_lblPageContentHeading: 
            $("#susf_lblPageContentHeading").html(value);
                break;
            case BookIt.Settings.language.susf_lblPageHeading:
                $("#susf_lblPageHeading").html(value);
                break;
            case BookIt.Settings.language.susf_btnSubmit:
                $("#susf_btnSubmit").html(value);
                break;
			case BookIt.Settings.language.susf_footerText:
                $("#susf_footerText").html(value);
                break;
			default:
                break;
        }
        
    }
    
    function updateDashboardPage(key,value){
        
    }
// End boilerplate code.
