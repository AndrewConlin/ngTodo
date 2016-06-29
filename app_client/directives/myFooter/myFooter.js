app.directive('myFooter', function() {
    return {
        restrict: 'E',
        templateUrl: "directives/myFooter/footer.template.html",
        scope: {
            data: "="
        },
        link: function($scope, $element, $attr) {
            $scope.numComplete = function() {
                var counter = 0;
                $scope.data.forEach(function(todo) {
                    if (todo.completed) {
                        counter++;
                    }
                });
                return counter;
            };
        }
    };
});
