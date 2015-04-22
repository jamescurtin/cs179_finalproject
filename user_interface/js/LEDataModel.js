/*!
 * Lunch Express Data Module
 * Possibly for stubbing out data access
 */

(function(){
  var restaurants,
    searchIndex;

  var _ddebug = true;

  // init restaurants data
  // the return value of getJSON will be used for synchronization as a Deferred Object
  var loadingRestaurants = $.getJSON( "js/data.json", function( data ) {
    restaurants = data;
  });

  var loadingSearchIndex = $.getJSON("js/search.json", function(data){
    searchIndex = data;

    if(_ddebug){ console.log('loaded search index: ', searchIndex); }
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
    var qualified = [];
    var returnObjects = [];
    if(keyword in searchIndex){
      qualified = searchIndex[keyword];
    }

    if(_ddebug){ console.log(qualified); }
    
    // fill out the restaurant objects, because qualified is only a list of qualifying ids
    if(qualified.length > 0){
      for(var i in qualified){
        returnObjects.push(getRestaurant(qualified[i]));
      }
    }
    return returnObjects;
  }

  window.LE = {
    restaurants: {
      getRestaurant: getRestaurant,
      getRestaurantsBySearchTerm: getRestaurantsBySearchTerm
    },
    loadingRestaurants: loadingRestaurants,
    loadingSearchIndex: loadingSearchIndex,
    userData: {
      currentRestaurant: null,
      items: null,
      info: null,
      credit_card: null

    },
    wait: {
      cancel: 5, //30,
      checkout: 5//180
    }
  };
})();