app.directive("coursDirective",function(){
    var controller = function ($scope) {
        $scope.editFormDisplay = false;

        $scope.editFormToggle = function(){
        $scope.editFormDisplay = !$scope.editFormDisplay;
        };

        $scope.setEditCourse = function(course){
            var s = Date.parse(course.start)
            $scope.editCourse.start = new Date();
            $scope.editCourse.start.setTime(s);
            $scope.editCourse.start.setHours($scope.editCourse.start.getHours() + 2)
            var e = Date.parse(course.end)
            $scope.editCourse.end = new Date();
            $scope.editCourse.end.setTime(e);
            $scope.editCourse.end.setHours($scope.editCourse.end.getHours() + 2)
            $scope.editCourse.topic = course.topic;
            $scope.editCourse.room = course.room;
        }

    };
    return{
        scope: true,
        templateUrl : 'partials/directives/cours-directive.html',
        controller : controller
    }
});
