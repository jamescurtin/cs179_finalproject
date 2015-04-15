/**
 * site.js
 * 
 */

var userid = null;

var hasStorage = false;

var userdata = window.LE.userData;

var _debug = true;

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

    //set currentRestaurant storage
    window.LE.userData.currentRestaurant = null;

    if(_debug){ console.log('initHome called'); }

    //prepare template that shows restaurant details
    var source   = $("#restaurant-info-template").html();
    var templateRestInfo = Handlebars.compile(source);

    $(function(){
        var homeScreen = window.LE.homeScreen;
        var getRestaurant = window.LE.restaurants.getRestaurant;
        var isSearch;

        // when the restaurant changes, we need to display rate and other data
        $("#restaurant").on("change", function(){
            var inputBox = $("#inputBox");
            
            var selectedVal = $(this).val();

            if(selectedVal){
                var selectedRestaurant = getRestaurant(selectedVal);

                // render restaurant info for selected restaurant
                var html  = templateRestInfo(selectedRestaurant);
                inputBox.html(html);
            }else{
                inputBox.html("");
            }
            isSearch = false;
        });

        // handler to process changes to the search bar for food
        $('#food').on("input", function(){
            var searchVal = $(this).val();

            //only is a search if there is content in the field
            isSearch = (searchVal.length > 0);
        });

        $("#home-screen-continue-button").on("click", function(){
            if(isSearch){
                //TODO
                // GET RESULTS THEN GET PAGE!
                getpage('select_restaurant');

                // cleanup old event handlers before leaving home context
                destroyHome();
            }else{
                // this is the restaurant id to render later
                var selectedVal = $("#restaurant").val();
                
                if(_debug){ console.log(selectedVal); }

                if(selectedVal == ""){
                    document.getElementById("id-alert").innerHTML = "Required.";
                }else{

                    // cleanup old event handlers before leaving home context
                    destroyHome();

                    userdata.currentRestaurant = selectedVal;
                    initSelectItem(selectedVal);
                    // ease scroll to top of next view
                    $("html, body").animate({ scrollTop: 0 }, "slow");
                }
            }
        });
    });

}

// call this function to deinitialize handlers for home_screen.html
function destroyHome(){
    $('#restaurant').off('change');
}

// call this to initialize for the select item screen
function initSelectItem(restaurantID){
    userdata.restaurant = restaurantID;
    $(function(){
        var r = window.LE.restaurants;

        //set currentRestaurant storage
        window.LE.userData.currentRestaurant = restaurantID;

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
        $('#getpage-section').html(html);

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
            selectedEntree.type = 'entree';
            if('prices' in selectedEntree){
                $('#select-entree-size').html(templateSize(selectedEntree));
                $('#select-entree-size').removeClass('hidden');
            }else{
                $('#select-entree-size').html("");
            }
        });

        // setup handler for displaying the drink size option box
        $('#drink').on('change', function(e){
            var restaurant = r.getRestaurant(restaurantID);
            var selectedDrink = restaurant.menu.drinks[this.value];
            selectedDrink.type = 'drink';
            if('prices' in selectedDrink){
                $('#select-drink-size').html(templateSize(selectedDrink));
                $('#select-drink-size').removeClass('hidden');
            }else{
                $('#select-drink-size').html("");
            }
        });

        // setup handler for displaying the side size option box
        $('#side').on('change', function(e){
            var restaurant = r.getRestaurant(restaurantID);
            var selectedSide = restaurant.menu.sides[this.value];
            selectedSide.type = 'side';
            if('prices' in selectedSide){
                $('#select-side-size').html(templateSize(selectedSide));
                $('#select-side-size').removeClass('hidden');
            }else{
                $('#select-side-size').html("");
            }
        });

        // handle going back 
        $('#select-item-back-button').on('click', function(e){
            initHome();
        });

        $('#select-item-continue-button').on('click', function(e){
            var items = [];
            var restaurant = r.getRestaurant(restaurantID);

            var entreeVal = $('#entree').val(),
                drinkVal = $('#drink').val(),
                sideVal = $('#side').val(),
                entreeSize = $('input[name="entree_size"]:checked').val(),
                drinkSize = $('input[name="drink_size"]:checked').val(),
                sideSize = $('input[name="side_size"]:checked').val();

            if(_debug){ 
                console.log("Entree: ", entreeVal, " Drink: ", drinkVal, " Side: ", sideVal); 
                console.log("EntreeSize: ", entreeSize, " drinkSize: ", drinkSize, " sideSize: ", sideSize);
            }

            // TODO: this needs to be changed to return results of validation,
            // not actually redirect/navigate/render itself
            // val('select_item-form');

            

            if(entreeVal){
                items.push(['entrees', entreeVal, entreeSize]);
            }
            if(drinkVal){
                items.push(['drinks', drinkVal, drinkSize]);
            }
            if(sideVal){
                items.push(['sides', sideVal, sideSize]);
            }

            if(items.length > 0){
                destroySelectItem();
                var cleanItems = preCheckoutPrepareItems(items, restaurant);
                initCheckout(cleanItems, restaurant);
            }else{
                // invalid or N/A order
                console.log('invalid order');
            }
        });
    });
}

function destroySelectItem(){
    $('#entree').off('change');
    $('#drink').off('change');
    $('#side').off('change');
    $('#select-item-back-button').off('click');
    $('#select-item-continue-button').off('click');
}

function testSelectItem(){
    // TODO remove after test
    initSelectItem("000001-a");
}

// loads correct section
// returns deferred for synchronization purposes
function getpage (id, callback) {
    if(callback != undefined){   
        callback;
    }
    var deferred = $.Deferred();
    var url = 'pages/' + id + '.html #section';
    if (id == "sign_in" || id == "register" || id== "login_screen" || id=="credit_card"){
        $("#getpage-section").load(url, function(){
            deferred.resolve();
        });
    }
    else{
        if(userid != null){
            if(id == "select_item"){initSelectItem(userdata.restaurant);}
            // uncomment after initcheckout is fixed
            //if(id == "check_out"){initcheckout(userdata.items);}
            else{
                $("#getpage-section").load(url,function(){
                     if(id == "home_screen"){initHome();}
                     else{}
                     deferred.resolve();
                });
            }
        }
    }
    return deferred;
}

function checkpassword(id){
    var password = document.getElementById("password").value;
    var cpassword =  document.getElementById("confirm_password").value;
    if(password == cpassword){
        var data = val(id);
        if(id == "register-form"){ 
            userdata.info = data;
            if(hasStorage) {
                localStorage.setItem("uinfo", JSON.stringify(data));
            }
        }
    }
    else{
        alert('The passwords do not match. Try again');
    }
}

function logout(){
    userid = null;
    if(hasStorage) {
        localStorage.removeItem("userid");
        localStorage.removeItem("uinfo");  
        localStorage.removeItem("upayment");   
    }
    getpage("login_screen");
    hide("home");
    hide("settings");
}

function login(){
    userid = 1;
    if(hasStorage) {
        localStorage.setItem("userid", 1);
    }
    show("home");
    show("settings");
}

function preCheckoutPrepareItems(items, restaurantObj){
    var subtotal = 0.00;

    var resultItems = [];

    // calculate all ordered items subtotal
    for(var i in items){
        var item = items[i];
        //item[0] = type of entrees, drinks, sides
        //item[1] = id of dish
        //item[2] = size of dish if applicable

        console.log('type of: ', item[0], ' id of dish: ', item[1], ' size of dish: ', item[2]);

        var price;
        var stringName;

        if(item[2]){
            // add sized price
            price = restaurantObj.menu[item[0]][item[1]]['prices'][item[2]];
            stringName = restaurantObj.menu[item[0]][item[1]].name + " - " + item[2];
        }else{
            // add non-sized price
            price = restaurantObj.menu[item[0]][item[1]]['price'];
            stringName = restaurantObj.menu[item[0]][item[1]].name;
        }
        subtotal += price;

        // processed clean names and prices for items
        resultItems.push({price: price, name: stringName});
    }

    if(_debug){ console.log('subtotal: ', subtotal); }

    var rate = 2;
    var effective_rate = rate - 1.00;
    var premium_paid = (subtotal * rate);
    var tax = (subtotal * 0.0625);
    var total = (subtotal + premium_paid + tax);
    var items = {
        items: resultItems,
        subtotal: subtotal,
        rate: rate,
        premium_paid: premium_paid,
        tax_paid: tax,
        total_paid: total
    };

    return items;
}

function initCheckout(items, restaurant){
    $(function(){
        var r = window.LE.restaurants;

        // prepare checkout-template
        var source   = $("#checkout-template").html();
        var template = Handlebars.compile(source);

        var html    = template(items);
        $('#getpage-section').html(html);
    });
}

$(function (){ 
    // local storage
    userid = null;
    userdata = {};
    if(typeof(Storage) !== "undefined") {
        hasStorage = true;
        if (localStorage.userid && localStorage.uinfo && localStorage.upayment) {
            userid = localStorage.getItem("userid");
            userdata.info = JSON.parse(localStorage.getItem("uinfo"));
            userdata.payment = JSON.parse(localStorage.getItem("upayment"));
            getpage('home_screen');
        }  
        else{
            getpage('login_screen');
            hide("home");
            hide("settings");  
        }
    }
    else{
        getpage('login_screen');
        hide("home");
        hide("settings");
    }
});

function load_data(id){
    var data = userdata[id];
    console.log(data);
    setTimeout(function(){
        for(i in data){
            if ($( "#" + i ).length ){
                document.getElementById(i).value = data[i];
                $("#" + i).change();
            }
        }
    },100);
}

//removes stored data from userdata by ID
function remove_data(id){
    console.log(id);
    userdata[id] = null;
}

// Countdown Timer for checkout.html
function startTimer(duration, display) {
    var start = Date.now(),
        diff,
        minutes,
        seconds;
    function timer() {
        // get the number of seconds that have elapsed since 
        // startTimer() was called
        diff = duration - (((Date.now() - start) / 1000) | 0);

        // does the same job as parseInt truncates the float
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds; 

        if (diff <= 0) {
            // add one second so that the count down starts at the full duration
            // example 05:00 not 04:59
            start = Date.now() + 1000;
        }
    };
    // we don't want to wait a full second before the timer starts
    timer();
    setInterval(timer, 1000);
}

// Set delay on allowing user to click through terms
function lockoutSubmit(button) {
    var oldValue = button.value;

    button.setAttribute('disabled', true);
    button.value = '...processing...';

    setTimeout(function(){
        button.value = oldValue;
        button.removeAttribute('disabled');
    }, 3000)
}
