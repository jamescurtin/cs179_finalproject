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

// call this to initialize for the select item screen
function initSelectItem(restaurantID){
    $(function(){
        var r = window.LE.restaurants;

        // prepare select-item-template
        var source   = $("#select-item-template").html();
        var templateSelect = Handlebars.compile(source);

        // prepare item-choice-template
        source = $("#item-choice-template").html();
        templateChoice = Handlebars.compile(source);

        // prepare item-choice-template
        source = $("#item-size-template").html();
        templateSize = Handlebars.compile(source);

        // TODO - context is the object to pass into the template for checkout
        var context = {};
        var html    = templateSelect(context);
        $('#render').append(html);

        // synchronization structure.
        // wait for restaurants data to be loaded from JSON
        $.when(window.LE.loadingRestaurants).done(function(){
            var restaurant = r.getRestaurant(restaurantID);
            
            //render entrees
            console.log(restaurant.menu.entrees);
            html = templateChoice(restaurant.menu.entrees);
            console.log(html);
            $('#entree-render').append(html);

            //render drinks
            html = templateChoice(restaurant.menu.drinks);
            $('#drink-render').append(html);

            //render sides
            templateChoice(restaurant.menu.sides);
            $('#side-render').append(html);
        });
    });
}

function testSelectItem(){
    // TODO remove after test
    initSelectItem("000001-a");
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
        if (localStorage.exp_userid) {
            localStorage.setItem("exp_userid", 1);
        }        
    }
}
