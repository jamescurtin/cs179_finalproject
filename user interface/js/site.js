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