app.factory("userService", function($http){
  var createUser = function(user){
    return $http({
        method : 'POST',
        url : '/user',
        data : user
    });
  };

  // var loginUser = function(user){
  //   return $http({
  //       method : 'POST',
  //       url : '/user/login',
  //       data : user
  //   });
  // };

  return {
    createUser: createUser
  };
});
