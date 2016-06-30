app.controller('registrationController', function($scope, $location, userService){
  $scope.createUser =  function(user){
    userService.createUser(user).then(function(response){
        if (response.status === 201) {
          $location.url('/todos');
        }
    });
  };
});
