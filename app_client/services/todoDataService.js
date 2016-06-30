app.factory("todoDataService", function($http, authenticationService){
  var getTodos = function (){
    return $http({
        method : 'GET',
        url : '/todo',
        headers : {
          'x-access-token' : authenticationService.getToken()
        }
    });
  };

  var createTodo = function(task){
    var todo = {
      task : task,
      completed : false
    };
    return $http({
        method : 'POST',
        url : '/todo',
        headers : {
           'Content-Type': 'application/json',
           'x-access-token' : authenticationService.getToken()
         },
        data : todo
    });
  };

  var deleteTodo = function(id){
    return $http({
        method : 'DELETE',
        url : '/todo/'+id,
        headers : {
          'x-access-token' : authenticationService.getToken()
        }
    });
  };

  var editTodo = function(todo){
    return $http({
        method : 'PUT',
        url : '/todo/'+todo._id,
        headers : {
           'Content-Type' : 'application/json',
           'x-access-token' : authenticationService.getToken()
        },
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
