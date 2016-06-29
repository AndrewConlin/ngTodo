app.directive('todoRow', function($compile){
 return {
   restrict : 'A',
   templateUrl : "directives/todoRow/todo.template.html",
   scope : {
     data : "=",
     delete : "=",
     edit : "="
   },
   link : function($scope, $element, $attr){
     $scope.editTask = {};

     $scope.clearForm = function(){
       $('#editForm').empty();
     };

     $scope.save = function(editTask){
       $('#editForm').empty();
       $scope.edit(editTask);
     };

     $scope.editform = function(data){
       $('#editForm').empty();
       $scope.editTask = angular.copy(data);
       var $editInput = "<input class='form-control' type='text' ng-model='editTask.task'>";
       var $submit = "<button class='btn' ng-click='save(editTask)'>Submit</button>";
       var $cancel = "<button class='btn' ng-click='clearForm()'>Cancel</button>";

       var compiledInput = $compile($editInput)($scope);
       var compiledSubmit = $compile($submit)($scope);
       var compiledCancel = $compile($cancel)($scope);

       $('#editForm').append(compiledInput,compiledSubmit,compiledCancel);
     };
   }
 };
});
