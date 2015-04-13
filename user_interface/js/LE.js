/*!
 * Lunch Express Main Module
 */

// create a namespace, for our Lunch Express specific stuff
// accessible through window.LE
if(!window.LE){
  window.LE = {};
}

function passwordcheck(username, p1, p2) {
    $("button").click(function(){
    if(p1 == p2){
        $.post("registration_2.html",
        {
            username: username,
            password: p1
        });
    } else {
        alert("The passwords do not match! Please try again.")
        location.reload();
    }
  });
}