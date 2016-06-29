app.factory("todoDataService", function($http){
  var getTodos = function (){
    return $http({
        method : 'GET',
        url : '/todos'
    });
  };

  var createTodo = function(task){
    var todo = {
      task : task,
      completed : false
    };
    return $http({
        method : 'POST',
        url : '/todos',
        data : todo
    });
  };

  var deleteTodo = function(id){
    console.log('in delete service');
    return $http({
        method : 'DELETE',
        url : '/todos/'+id
    });
  };

  var editTodo = function(todo){
    return $http({
        method : 'PUT',
        url : '/todos/'+todo._id,
        data: todo
    });
  };

  return {
    getTodos : getTodos,
    createTodo : createTodo,
    deleteTodo : deleteTodo,
    editTodo : editTodo
  };
});
