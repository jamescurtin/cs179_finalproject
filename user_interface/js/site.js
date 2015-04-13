/**
 * site.js
 * 
 */

(window.onload = function (){ 
    getpage('login_screen');
});

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
            $('#entree-render').after(html);

            //render drinks
            templateChoice(restaurant.menu.drinks);

            //render sides
            templateChoice(restaurant.menu.sides);
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
    console.log(url);
    $("#section").load(url,function(){
    });
}
