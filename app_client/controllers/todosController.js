app.controller('todosController', function($scope, todoDataService){
    $scope.todos = [];

    $scope.loadData = function(){
      todoDataService.getTodos()
        .then(function(response){
          $scope.todos = response.data;
      });
    };
    $scope.loadData();

    $scope.addTodo =  function(task){
      todoDataService.createTodo(task).then(function(response){
          $scope.loadData();
      });
      $scope.task = "";
    };

    $scope.deleteTodo =  function(id){
      todoDataService.deleteTodo(id).then(function(response){
          $scope.loadData();
      });
    };

    $scope.editTodo =  function(todo){
      todoDataService.editTodo(todo).then(function(response){
          $scope.loadData();
      });
    };

    $scope.numTasks = function(){
        var counter = 0;
        $scope.todos.forEach(function(todo){
            if(todo.completed === false){
              counter++;
            }
        });
        return counter;
    };

    $scope.showComplete = false;
});
