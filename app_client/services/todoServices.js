app.factory("todoService", function(){
  var todosCreated = 3;
  var todos = [
                  {id:1, task : "get milk", completed: true},
                  {id:2, task : "eat cheeese", completed: false},
                  {id:3, task : "make milkshake", completed: false}
              ];

  var getTodos = function (){
    return todos;
  };

  var createTodos = function(task){
    var id = todosCreated++;
    var todo = {
      id: id,
      task : task,
      completed : false
    };
    todos.push(todo);
  };

  var deleteTodo = function(todo){
    todos.splice(todos.indexOf(todo),1);
  };

  var editTodo = function(editTodo){
    todos.forEach(function(todo, index){
      if(todo.id === editTodo.id){
        todos[index] = editTodo;
      }
    });
  };

  return {
    getTodos : getTodos,
    createTodos : createTodos,
    deleteTodo : deleteTodo,
    editTodo : editTodo

  };
});
