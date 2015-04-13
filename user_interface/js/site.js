/**
 * site.js
 * 
 */

var userid = null;
window.onload = function (){ 
    getpage('login_screen');
    // local storage
    userid = null;
    if(typeof(Storage) !== "undefined") {
        if (localStorage.exp_userid) {
            userid = localStorage.getItem("exp_userid");
        }        
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
    index.href = index.html;
}

function login(){
    userid = 1;
    if(typeof(Storage) !== "undefined") {
        if (localStorage.exp_userid) {
            localStorage.setItem("exp_userid", 1);
        }        
    }
}

function selectitemform(theForm){
    var entree = theForm.entree;
    var entree_cost = theForm.entree_size;
    var side = theForm.side;
    var side_cost = theForm.side_size;
    var drink = theForm.drink;
    var drink_cost = theForm.drink_size;
    var subtotal = entree_cost + side_cost + drink_cost;
    var tax = subtotal * 0.0625;
    
    var items = {
}