/*!
 * Lunch Express Data Module
 * Possibly for stubbing out data access
 */

(function(){
  var restaurants;

  // init restaurants data
  // the return value of getJSON will be used for synchronization as a Deferred Object
  var loadingRestaurants = $.getJSON( "js/data.json", function( data ) {
    restaurants = data;
    console.log(data);
  });

  // returns a restaurant or all restaurants
  function getRestaurant(key){
    if(key == undefined){
      return restaurants;
    }
    return restaurants[key];
  }

  window.LE = {
    restaurants: {
      getRestaurant: getRestaurant
    },
    homeScreen: {
      placeholderText: {
        "Pinocchios Pizza":"Rate: <b>1.4 x</b><br>Wait time: <b>3 min</b><br>Distance: <b>0.4 miles</b><br>",
        "Al's Sandwiches":"Rate: <b>1.9 x</b><br>Wait time: <b>5 min</b><br>Distance: <b>0.2 miles</b><br>",
        "Corner Diner":"Rate: <b>2.1 x</b><br>Wait time: <b>2 min</b><br>Distance: <b>0.3 miles</b><br>",
        "Central Chinese Kitchen":"Rate: <b>1.1 x</b><br>Wait time: <b>1 min</b><br>Distance: <b>0.4 miles</b><br>",
        "Crema Cafe":"Rate: <b>1.5 x</b><br>Wait time: <b>3 min</b><br>Distance: <b>0.6 miles</b><br>",
        "Au Bon Pain":"Rate: <b>1.5 x</b><br>Wait time: <b>3 min</b><br>Distance: <b>0.6 miles</b><br>"
      }
    },
    loadingRestaurants: loadingRestaurants
  };
})();