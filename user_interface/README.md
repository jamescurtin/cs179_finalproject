## Javascript Documentation

### Data Access

LE.js:
  Store everything under the `LE` namespace which is attached to window in the LE.js script.
  All other scripts should be imported following.

  Access variables through i.e. `window.LE.restaurants.getRestaurant`.

  User Data can be accessed through `window.LE.userData`.

LEDataModel.js: 
  manage and expose dummy data objects to any scripts that take the role as controllers.

site.js:
  control all renders
  attach and detach event handlers

