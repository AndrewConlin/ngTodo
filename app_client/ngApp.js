var app = angular.module('ngTodo',['ngRoute'])
.config(function($routeProvider, $locationProvider){
  $routeProvider
  .when('/',{
    templateUrl: 'views/home.view.html',
    controller: 'homeController'
  })
  .when('/login',{
    templateUrl: 'views/login.view.html',
    controller: 'loginController'
  })
  .when('/register',{
    templateUrl: 'views/register.view.html',
    controller: 'registrationController'
  })
  .when('/todos',{
    templateUrl: 'views/todos.view.html',
    controller: 'todosController'
  })
  .otherwise({
    redirectTo:'/'
  });

  $locationProvider.html5Mode({
      enabled: true, // turn html5Mode on
      requireBase: true // require a '<base> tag'
    });
});
