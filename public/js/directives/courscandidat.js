app.directive("coursCandidatDirective",function(){
    var controller = function ($scope) {
        $scope.regFormDisplay = false;

        $scope.regFormToggle = function(){
        $scope.regFormDisplay = !$scope.regFormDisplay;
        }
    };
    return{
        scope: true,
        templateUrl : 'partials/directives/courscandidat-directive.html',
        controller : controller
    }
});
