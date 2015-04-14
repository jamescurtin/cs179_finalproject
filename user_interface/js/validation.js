/**
 * Validation.js
 * 
 */
 
// form validation
// page to get
var page = {"register-form":"credit_card",
           "creditcard-form":"welcome",
           "login-form":"home_screen",
            "select_item-form":"check_out"
           };
           
// function to execute
var fx = {"login-form": login, "register-form": login};

// validation function
function val(id){
    var form_id = id
    var values = document.getElementById(form_id).querySelectorAll('input, select');
    var formdata = {};
    // boolean check
    var input_check = true; 
    for (i = 0; i < values["length"]; i++){
        var input = values[i];
        var isrequired = values[i].getAttribute("data-validation-required-message");
        formdata[input.getAttribute("id")] = input.value;
        if(isrequired != "Not Required."){
	        if (input.value == "" || input.value == null){
	            input_check = false;
	            var alert_id = input.getAttribute("id") + "-alert";
	            document.getElementById(alert_id).innerHTML = isrequired;
	        }
	    }
    }
    if (input_check){
	    //get page
        if(page[form_id] != undefined && fx[form_id] != undefined){
            getpage(page[form_id],fx[form_id]());
        }
        else if(page[form_id] != undefined){
            getpage(page[form_id]);
        }
        else{
        }
    }
}