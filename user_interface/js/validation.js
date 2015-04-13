/**
 * Validation.js
 * 
 */
 
// form validation


page = {"register-form":"credit_card", }
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
        if(isrequired != "notrequired"){
	        if (input.value == "" || input.value == null){
	            input_check = false;
	            var alert_id = input.getAttribute("id") + "-alert";
                console.log(alert_id);
	            document.getElementById(alert_id).innerHTML = isrequired;
	        }
	    }
    }
    if (input_check){
	    //get page
        getpage(page[form_id]);
    }
}
