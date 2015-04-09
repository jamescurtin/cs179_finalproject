/**
 * site.js
 * 
 */

(window.onload = function (){   
    console.log(1);
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
    var homeScreen = window.LE.homeScreen;

    $("#restaurant").on("change",function() {
        var selection = document.getElementById("restaurant");
        var inputBox = document.getElementById("inputBox");
        
        var selectedVal = $('#restaurant').find(':selected').text();
        if (document.getElementById('inputBox').innerHTML !== undefined ) {
            document.getElementById('inputBox').innerHTML = homeScreen.placeholderText[selectedVal];
        }
    });
}