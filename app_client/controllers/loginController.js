app.controller('loginController', function($scope, $location, authenticationService){
  $scope.login =  function(user){
    authenticationService.loginUser(user).then(function(response){
      $location.url('/todos');
    });
  };
});
