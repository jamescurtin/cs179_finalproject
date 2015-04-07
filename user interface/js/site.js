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