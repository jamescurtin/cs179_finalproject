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

  // returns a restaurant obj or all restaurants
  function getRestaurant(key){
      console.log(key);
    if(key == undefined){
      return restaurants;
    }
    return restaurants[key];
  }

  window.LE = {
    restaurants: {
      getRestaurant: getRestaurant
    },
    loadingRestaurants: loadingRestaurants
  };
})();