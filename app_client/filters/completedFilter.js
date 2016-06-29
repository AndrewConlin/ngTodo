app.filter('customTodoFilter', function(){
   return function(tasks, showComplete) {
     var results = [];
     tasks.forEach(function(task){
       if (task.completed === false || showComplete === true) {
         results.push(task);
       }
     });
     return results;
   };
 });
