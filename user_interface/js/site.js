/**
 * site.js
 * 
 */

var userid = null;
window.onload = function (){ 
    // local storage
    userid = null;
    if(typeof(Storage) !== "undefined") {
        if (localStorage.exp_userid) {
            userid = localStorage.getItem("exp_userid");
            getpage('home_screen');
        }  
        else{
            getpage('login_screen');
        }
    }
    else{
        getpage('login_screen');
    }
}

//shows hidden element by id
function show(id){
    $( "#" + id ).removeClass("hidden");
}

//hides element by id
function hide(id){
    $( "#" + id ).addClass("hidden");
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
    if (id == "sign_in" || id == "register" || id== "login_screen"){
         $("#section").load(url,function(){});
    }
    else{
        if(userid != null){
            $("#section").load(url,function(){});
        }
    }
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

function logout(){
    userid = null;
    if(typeof(Storage) !== "undefined") {
        if (localStorage.exp_userid) {
            localStorage.removeItem("exp_userid");
        }        
    }
    getpage("login_screen");
}

function login(){
    userid = 1;
    if(typeof(Storage) !== "undefined") {
        localStorage.setItem("exp_userid", 1);
    }        
}