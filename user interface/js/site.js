/**
 * site.js
 * 
 */

(window.onload = function (){   
    console.log(1);
});

//shows hidden div by id
function show(id){
    $( "#" + id ).removeClass("hidden");
}

//shows hidden div by id
function hide(id){
    $( "#" + id ).addClass("hidden");
}


//detect if sizes is required
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