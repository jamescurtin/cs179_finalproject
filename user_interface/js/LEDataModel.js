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
    }
  };
});