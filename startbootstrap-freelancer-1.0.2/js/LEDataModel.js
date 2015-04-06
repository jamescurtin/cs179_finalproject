/*!
 * Lunch Express Data Module
 * Possibly for stubbing out data access
 */

$(function(){
  var restaurantsArr;

  restaurantsArr = [
    {
      name: "Felipe's"
      // other restaurant attributes here
    }];

  // returns a restaurant or all restaurants
  function getRestaurants(index){
    if(index == undefined){
      return restaurantsArr;
    }
    return restaurantsArr[index];
  }

  window.LE = {
    restaurants: {
      getRestaurants: getRestaurants
    }
  };
});