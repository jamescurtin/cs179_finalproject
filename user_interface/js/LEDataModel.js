/*!
 * Lunch Express Data Module
 * Possibly for stubbing out data access
 */

(function(){
  var restaurants,
    searchIndex;

  // init restaurants data
  // the return value of getJSON will be used for synchronization as a Deferred Object
  var loadingRestaurants = $.getJSON( "js/data.json", function( data ) {
    restaurants = data;
  });

  var loadingSearchIndex = $.getJSON("js/search.json", function(data){
    searchIndex = data;
  });

  // returns a restaurant obj or all restaurants
  function getRestaurant(key){
    if(key == undefined){
      return restaurants;
    }
    return restaurants[key];
  }

  // returns a list of restaurant objects matching a keyword
  function getRestaurantsBySearchTerm(keyword){
    if(keyword in searchIndex){
      return searchIndex[keyword];
    }
    return [];
  }

  window.LE = {
    restaurants: {
      getRestaurant: getRestaurant,
      getRestaurantsBySearchTerm: getRestaurantsBySearchTerm
    },
    loadingRestaurants: loadingRestaurants,
    userData: {
      "restaurant": null,
      "items": null, 
      "info": null, 
      "credit_card": null
    }
  };
})();