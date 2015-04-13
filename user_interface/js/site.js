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

// loads correct section
function getpage (id) {
    var url = 'pages/' + id + '.html #section';
    console.log(url);
    $("#section").load(url,function(){
    });
}

function checkpassword(){
    var password = document.getElementById("password");
    var cpassword =  document.getElementById("confirm_password");
    if(password = cpassword){
        return true;
    }
    else{
        return false;
    }
}