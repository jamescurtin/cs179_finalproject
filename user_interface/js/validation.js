/**
 * Validation.js
 * Enrique Meneses
 * 
 */
 
// form validation
function val(id){
	id = id.split("-");
	document.getElementById(id.join("-")).disabled = true;
    var form_id = id[0] + "-form";
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
	            document.getElementById(alert_id).innerHTML = isrequired;
	        }
	    }
    }
    if (input_check){
	    //DO SOMETHING BASED on id[0]

    }
}
