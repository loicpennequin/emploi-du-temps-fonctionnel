app.directive("listecoursDirective",function(){
    var controller = function ($scope) {
        $scope.addFormDisplay = false;

        $scope.addFormToggle = function(){
        $scope.addFormDisplay = !$scope.addFormDisplay;
        }
    };
    return{
        scope: true,
        templateUrl : 'partials/directives/listecours-directive.html',
        controller : controller
    }
});
