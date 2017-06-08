app.directive("coursDirective",function(){
    var controller = function ($scope) {
        $scope.editFormDisplay = false;

        $scope.editFormToggle = function(course){
        $scope.editFormDisplay = !$scope.editFormDisplay;
        };

        $scope.setEditCourse = function(course){
            let c = $scope.editCourse
            c.start = new Date(course.start);
            c.end = new Date(course.end)
            c.topic = course.topic;
            c.room = course.room;
            c.teacher = course.teacher;
            console.log(c);

        }

    };
    return{
        scope: true,
        templateUrl : 'partials/directives/cours-directive.html',
        controller : controller
    }
});
