/**
 * site.js
 * 
 */

var userid = null;
window.onload = function (){ 
    // local storage
    userid = null;
    if(typeof(Storage) !== "undefined") {
        if (localStorage.userid) {
            userid = localStorage.getItem("userid");
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

        // TODO - context is the object to pass into the template
        var context = {};
        var html    = templateSelect(context);
        $('#render').append(html);

        // synchronization structure.
        // wait for restaurants data to be loaded from JSON
        $.when(window.LE.loadingRestaurants).done(function(){
            var restaurant = r.getRestaurant(restaurantID);
            
            //render entrees
            html = templateChoice(restaurant.menu.entrees);
            $('#entree-render').after(html);

            //render drinks
            html = templateChoice(restaurant.menu.drinks);
            $('#drink-render').after(html);

            //render sides
            html = templateChoice(restaurant.menu.sides);
            $('#side-render').after(html);
        });

        // setup handler for displaying the entree size option box
        $('#entree').on('change', function(e){
            var restaurant = r.getRestaurant(restaurantID);
            var selectedEntree = restaurant.menu.entrees[this.value];
            if('prices' in selectedEntree){
                $('#select-entree-size').html(templateSize(selectedEntree.prices));
                $('#select-entree-size').removeClass('hidden');
            }else{
                $('#select-entree-size').addClass('hidden');
            }
        });

        // setup handler for displaying the drink size option box
        $('#drink').on('change', function(e){
            var restaurant = r.getRestaurant(restaurantID);
            var selectedDrink = restaurant.menu.drinks[this.value];
            if('prices' in selectedDrink){
                $('#select-drink-size').html(templateSize(selectedDrink.prices));
                $('#select-drink-size').removeClass('hidden');
            }else{
                $('#select-drink-size').addClass('hidden');
            }
        });

        // setup handler for displaying the side size option box
        $('#side').on('change', function(e){
            var restaurant = r.getRestaurant(restaurantID);
            var selectedSide = restaurant.menu.sides[this.value];
            if('prices' in selectedSide){
                $('#select-side-size').html(templateSize(selectedSide.prices));
                $('#select-side-size').removeClass('hidden');
            }else{
                $('#select-side-size').addClass('hidden');
            }
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
        if (localStorage.userid) {
            localStorage.removeItem("userid");
        }        
    }
    getpage("login_screen");
}

function login(){
    userid = 1;
    if(typeof(Storage) !== "undefined") {
        localStorage.setItem("userid", 1);
    }
}

function selectitemform(theForm){
    var entree = 'meal';
    var entree_cost = 1.00;
    var side = 'side';
    var side_cost = 1.00;
    var drink = 'meal';
    var drink_cost = 0.50;
    var subtotal = entree_cost + side_cost + drink_cost;
    var rate = 2
    var premium_paid = (subtotal * rate)
    var tax = (subtotal * 0.0625);
    var total = (subtotal + premium_paid + tax)
    var items = {entree: entree,
                 entree_cost: entree_cost,
                 side: side,
                 side_cost: side_cost,
                 drink: drink,
                 drink_cost: drink_cost,
                 subtotal: subtotal,
                 rate: rate,
                 premium_paid: premium_paid,
                 tax: tax,
                 total: total
                };
    localStorage.setItem('items', JSON.stringify(items));
    }

function initcheckout(){
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
            html = templateChoice(restaurant.menu.entrees);
            $('#entree-render').after(html);

            //render drinks
            html = templateChoice(restaurant.menu.drinks);
            console.log(restaurant.menu.drinks);
            $('#drink-render').after(html);

            //render sides
            templateChoice(restaurant.menu.sides);
            console.log(restaurant.menu.sides);
            $('#side-render').after(html);
        });
    });
}
