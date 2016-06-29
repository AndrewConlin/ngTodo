app.controller('todosController', function($scope, todoService){
    $scope.todos = todoService.getTodos();

    $scope.addTodo =  function(todo){
      $scope.task = "";
      todoService.createTodos(todo);
    };
    $scope.deleteTodo =  todoService.deleteTodo;

    $scope.editTodo =  todoService.editTodo;

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
