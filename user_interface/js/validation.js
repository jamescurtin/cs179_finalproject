/**
 * Validation.js
 * 
 */
 
// form validation
// page to get
var page = {"register-form":"credit_card",
           "creditcard-form":"welcome"
           };
           
// function to execute
var fx = {"login-form": checkuser, 
          "creditcard-form": login,
         };

// validation function
function val(id){
    var form_id = id;
    var values = document.getElementById(form_id).querySelectorAll('input, select, textarea');
    var formdata = {};
    // boolean check
    var input_check = true;
    var radio_names = {};
    var ischecked = 0;
    for (i = 0; i < values["length"]; i++){
        var input = values[i];
        var isrequired = values[i].getAttribute("data-validation-required-message");
        if(input.type == "radio"){
            radio_names[input.name] = 1;
            if(input.checked){
                formdata[input.name] = input.value; 
                ischecked += 1;
            }
        }
        else{formdata[input.getAttribute("id")] = input.value;}
        if(isrequired != "Not Required."){
	        if (input.value == "" || input.value == null){
	            input_check = false;
	            var alert_id = input.getAttribute("id") + "-alert";
	            document.getElementById(alert_id).innerHTML = isrequired;
	        }
	    }
    }
    c = 0;
    for (i in radio_names){ c+= radio_names[i];}
    if(c > ischecked){
        input_check = false;
        document.getElementById("sizes-alert").innerHTML = "Please select sizes for your item(s).";
    }

    // on select form page, 
    // check to make sure we don't submit with all None's for the dish fields
    if(form_id == "select_item-form"){
        var selItemIds = ["entree", "side", "drink"];
        var hasOrder = false;
        var sid;

        for(i = 0; i < values["length"]; i++){
            var sinput = values[i];
            var attrid = sinput.getAttribute("id");
            if($.inArray(attrid, selItemIds) >= 0){
                var isNone = (sinput.value === "None") || (sinput.value === undefined);

                if(!isNone){
                    hasOrder = true;
                }
            }
        }

        if(!hasOrder){
            document.getElementById("sizes-alert").innerHTML = "Cannot make an empty order.";
            input_check = false;
            return undefined;
        }
        
    }


    if (input_check){
	    //get page
        if(page[form_id] != undefined && fx[form_id] != undefined){
            getpage(page[form_id],fx[form_id]());
        }else if(page[form_id] != undefined){
            getpage(page[form_id]);
        }else if(fx[form_id] != undefined){
            fx[form_id](formdata);
        }else{
        }

        if(id == "creditcard-form"){
            userdata.payment = formdata;
            if(hasStorage) {
                localStorage.setItem("upayment", JSON.stringify(formdata));
            }
        }else if(id == "settings_info"){
            if(formdata.password == formdata["confirm_password"]){
                userdata.info = formdata;
                if(hasStorage) {
                    localStorage.setItem("uinfo", JSON.stringify(userdata.info));
                }
                hide('edit_info');
                alert("success");
            }
            else{
                alert("Passwords do not match.");
            }
            //TODO hide div
        }else if(id == "settings_payment"){
            userdata.payment = formdata;
            if(hasStorage) {
                localStorage.setItem("upayment", JSON.stringify(userdata.payment));
            } 
            hide('edit_payment');
            alert("success");
        }else{}
        return formdata;
    }
}