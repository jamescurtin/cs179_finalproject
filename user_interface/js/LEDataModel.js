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

  // takes a search term and returns a list of restaurant ids that match the keyword
  function getRestaurantsBySearch(keyword){
    if(keyword in searchIndex){
      return searchIndex[keyword];
    }else{
      return [];
    }
  }

  window.LE = {
    restaurants: {
      getRestaurant: getRestaurant,
      getRestaurantsBySearch: getRestaurantsBySearch
    },
    loadingRestaurants: loadingRestaurants,

    // user data can be stored here
    userData: {
      currentRestaurant: null,
      items: null,
      info: null,
      credit_card: null
    }
  };
})();