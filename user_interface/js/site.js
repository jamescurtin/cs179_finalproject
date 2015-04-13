/**
 * site.js
 * 
 */

var userid = null;
window.onload = function (){ 
    getpage('login_screen');
    // local storage
    userid = null;
};

//shows hidden element by id
function show(id){
    $( "#" + id ).removeClass("hidden");
}

//hides element by id
function hide(id){
    $( "#" + id ).addClass("hidden");
}


//detects if sizes is required when selecting items
function getsize(item, id){
    item = item.split("_");
    id = "select-" + id + "-size";
    if(item[item.length - 1] == "s"){
        $( "#" + id ).removeClass("hidden");
    }
    else{
        $( "#" + id ).addClass("hidden");
    }  
}

// call this function to initialize for home_screen.html
function initHome(){
    $(function(){
        var homeScreen = window.LE.homeScreen;

        $("#restaurant").on("change",function() {
            var selection = document.getElementById("restaurant");
            var inputBox = document.getElementById("inputBox");
            
            var selectedVal = $('#restaurant').find(':selected').text();
            if (document.getElementById('inputBox').innerHTML !== undefined ) {
                document.getElementById('inputBox').innerHTML = homeScreen.placeholderText[selectedVal];
            }

            console.log(selectedVal);
        });
    });
}

// loads correct section
function getpage (id) {
    var url = 'pages/' + id + '.html #section';
    if(userid != null){
        $("#section").load(url,function(){});
    }
    url = 'pages/login_screen.html #section';
    $("#section").load(url,function(){});
}

function checkpassword(){
    var password = document.getElementById("password").value;
    var cpassword =  document.getElementById("confirm_password").value;
    if(password == cpassword){
        val('register-form');
    }
    else{
        alert('The passwords do not match. Try again');
    }
}