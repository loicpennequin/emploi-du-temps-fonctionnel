app.controller('planningCtrl', function($scope, $http, roomsFactory, topicsFactory, candidatsFactory, teachersFactory,  planningFactory, ){
    //////////////////////////////////////
    //////Global Variables/////
    /////////////////////////////////////
    $scope.jours = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi']
    $scope.formations = [];
    $scope.formation = {};
    $scope.week;
    $scope.weekIndex = 0;
    $scope.newWeek = {};
    $scope.formationIsSelected = false;
    $scope.editCourse = {};
    $scope.newCourse = {};
    var d = new Date();
    d.setHours( 0 );
    d.setMinutes( 0 );
    $scope.newCourse.start = $scope.newCourse.end = $scope.editCourse.start = $scope.editCourse.end = d;
    $scope.candidats = [];
    $scope.teachers= [];


    ////////////////////////////////////
    /////TOGGLES///////
    ///////////////////////////////////

    $scope.addWeekFormDisplay = false;
    $scope.addTopicFormDisplay = false;
    $scope.addRoomFormDisplay = false;
    $scope.addCandidatFormDisplay = false;
    $scope.addTeacherFormDisplay = false;
    $scope.topicListDisplay = false;
    $scope.roomListDisplay = false;
    $scope.teacherListDisplay = false

    $scope.addWeekFormToggle = function(){
        $scope.addWeekFormDisplay = !$scope.addWeekFormDisplay;
    }

    $scope.addTopicFormToggle = function(){
        $scope.addTopicFormDisplay = !$scope.addTopicFormDisplay;
    }

    $scope.addRoomFormToggle = function(){
        $scope.addRoomFormDisplay = !$scope.addRoomFormDisplay;
    }

    $scope.addCandidatFormToggle = function(){
        $scope.addCandidatFormDisplay = !$scope.addCandidatFormDisplay;
    }

    $scope.addTeacherFormToggle = function(){
        $scope.addTeacherFormDisplay = !$scope.addTeacherFormDisplay;
    }

    $scope.topicListToggle = function(){
        $scope.topicListDisplay= !$scope.topicListDisplay
    }

    $scope.roomListToggle = function(){
        $scope.roomListDisplay= !$scope.roomListDisplay
    }

    $scope.teacherListToggle = function(){
        $scope.teacherListDisplay= !$scope.teacherListDisplay
    }

    //////////////////////////////////////
    //////FORMATIONS/////////
    /////////////////////////////////////

    //fetch all formations
    $scope.getFormations = function(){
        planningFactory.getFormations()
            .then(function(response){
                $scope.formations = response.data;
            }, function(error){
                console.log(error);
            })
    }
    $scope.getFormations();

    //fetch the selected formation
    $scope.getFormation = function(formation){
        planningFactory.getFormation(formation)
            .then(function(response){
                $scope.formation = response.data;
                $scope.getCandidats($scope.formation);
                $scope.getTeachers($scope.formation);
                $scope.week = $scope.formation.weeks[$scope.weekIndex];
                $scope.formationIsSelected = true;
            }, function(error){
                console.log(error);
            })
    }
    //////////////////////////////////////
    //////////WEEKS////////////////
    /////////////////////////////////////

    //week navigations
    $scope.nextWeek = function(){
        $scope.weekIndex++;
        $scope.week = $scope.formation.weeks[$scope.weekIndex];
    }

    $scope.prevWeek = function(){
        $scope.weekIndex--;
        $scope.week = $scope.formation.weeks[$scope.weekIndex];
    }

    //buttons disabling
    $scope.isLastWeek = function(){
        var res;
        if ($scope.weekIndex == $scope.formation.weeks.length-1 || $scope.formation.weeks.length == 0){
            res = true;
        }else{
            res = false;
        }
        return res;
    }

    $scope.isFirstWeek = function(){
        var res;
        if ($scope.weekIndex == 0){
            res= true;
        }else{
            res = false;
        }
        return res;
    }

    //adding a new week to the currently selected formation, then populating it with 5 days
    $scope.addWeek = function(){
        //tne bootstrap datepicker substracts a day for some reason ????
        $scope.newWeek.start.setDate($scope.newWeek.start.getDate() + 1);
        $scope.newWeek.end.setDate($scope.newWeek.end.getDate() + 1)
        //converting to MySQL format
        $scope.newWeek.startToMYSQL = $scope.newWeek.start.toISOString().slice(0, 19).replace('T', ' ');
        $scope.newWeek.endToMYSQL = $scope.newWeek.end.toISOString().slice(0, 19).replace('T', ' ');
        $scope.newWeek.formation_id = $scope.formation.id;
        planningFactory.addWeek($scope.newWeek)
            .then(function(response){
            for (let i = 0 ; i < 5 ; i++){
                $scope.addDay(response.data.id)
            }
            planningFactory.getFormation($scope.formation)
                .then(function(response){
                    $scope.formation = response.data;
                    $scope.addWeekFormDisplay = false;
                }, function(error){
                    console.log(error);
                })
        }, function(error){
            console.log(error);
        })
    }

    $scope.addDay = function(weekId, callback){
        $scope.newDay = {};
        $scope.newDay.week_id = weekId;
        planningFactory.addDay($scope.newDay)
            .then(function(response){
            }, function(error){
                console.log(error);
            })
    }

    //////////////////////////////////////
    //////////COURSES///////////
    /////////////////////////////////////

    //get the duration of a course
    $scope.getDuration = function(course){
        var start = new Date(course.start);
        var end = new Date(course.end);

        var startHour = start.getHours();
        var startMinutes;
        var endHour = end.getHours();
        var endMinutes;
        if (start.getMinutes() == 30){
            startMinutes = 0.5
        }else{
            startMinutes = 0
        }
        if (end.getMinutes() == 30){
            endMinutes = 0.5
        }else{
            endMinutes = 0
        }
        start = startHour + startMinutes;
        end = endHour + endMinutes;
        var duration = end-start;
        return 'width-' + duration*10
    }

    //adding a new course
    $scope.addCourse = function(day){
        //converting the start and end Dates to MySQL Time format
        if($scope.newCourse.start.getHours() < 10 && $scope.newCourse.start.getMinutes() < 10 ){
            $scope.newCourse.startToMYSQL = '1000-01-01 0' + $scope.newCourse.start.getHours() + ":0" + $scope.newCourse.start.getMinutes() + ":00"
        } else if ($scope.newCourse.start.getHours() < 10 && $scope.newCourse.start.getMinutes() > 10) {
            $scope.newCourse.startToMYSQL = '1000-01-01 0' + $scope.newCourse.start.getHours() + ":" + $scope.newCourse.start.getMinutes() + ":00"
        } else if ($scope.newCourse.start.getHours() > 10 && $scope.newCourse.start.getMinutes() < 10) {
            $scope.newCourse.startToMYSQL = '1000-01-01 ' + $scope.newCourse.start.getHours() + ":0" + $scope.newCourse.start.getMinutes() + ":00"
        } else {
            $scope.newCourse.startToMYSQL = '1000-01-01 ' + $scope.newCourse.start.getHours() + ":" + $scope.newCourse.start.getMinutes() + ":00"
        }

        if($scope.newCourse.end.getHours() < 10 && $scope.newCourse.end.getMinutes() < 10 ){
            $scope.newCourse.endToMYSQL = '1000-01-01 0' + $scope.newCourse.end.getHours() + ":0" + $scope.newCourse.end.getMinutes() + ":00"
        } else if ($scope.newCourse.end.getHours() < 10 && $scope.newCourse.end.getMinutes() > 10) {
            $scope.newCourse.endToMYSQL = '1000-01-01 0' + $scope.newCourse.end.getHours() + ":" + $scope.newCourse.end.getMinutes() + ":00"
        } else if ($scope.newCourse.end.getHours() > 10 && $scope.newCourse.end.getMinutes() < 10) {
            $scope.newCourse.endToMYSQL = '1000-01-01 ' + $scope.newCourse.end.getHours() + ":0" + $scope.newCourse.end.getMinutes() + ":00"
        } else {
            $scope.newCourse.endToMYSQL = '1000-01-01 ' + $scope.newCourse.end.getHours() + ":" + $scope.newCourse.end.getMinutes() + ":00"
        }

        //POSTing the course
        $scope.newCourse.day_id = day.id;
        planningFactory.addCourse($scope.newCourse)
            .then(function(response){
                $scope.getDuration(response.data)
                planningFactory.getFormation($scope.formation)
                    .then(function(response){
                        $scope.formation = response.data
                        $scope.week = $scope.formation.weeks[$scope.weekIndex];
                        $scope.newCourse = {};
                        $scope.newCourse.start = $scope.newCourse.end= d;
                    }, function(error){
                        console.log(error);
                    })
            }, function(error){
                console.log(error);
            })
    }

    //updating a course

    $scope.updateCourse = function(id){
        //converting the start and end Dates to MySQL Time format
        if($scope.editCourse.start.getHours() < 10 && $scope.editCourse.start.getMinutes() < 10 ){
            $scope.editCourse.startToMYSQL = '1000-01-01 0' + $scope.editCourse.start.getHours() + ":0" + $scope.editCourse.start.getMinutes() + ":00"
        } else if ($scope.editCourse.start.getHours() < 10 && $scope.editCourse.start.getMinutes() > 10) {
            $scope.editCourse.startToMYSQL = '1000-01-01 0' + $scope.editCourse.start.getHours() + ":" + $scope.editCourse.start.getMinutes() + ":00"
        } else if ($scope.editCourse.start.getHours() > 10 && $scope.editCourse.start.getMinutes() < 10) {
            $scope.editCourse.startToMYSQL = '1000-01-01 ' + $scope.editCourse.start.getHours() + ":0" + $scope.editCourse.start.getMinutes() + ":00"
        } else {
            $scope.editCourse.startToMYSQL = '1000-01-01 ' + $scope.editCourse.start.getHours() + ":" + $scope.editCourse.start.getMinutes() + ":00"
        }

        if($scope.editCourse.end.getHours() < 10 && $scope.editCourse.end.getMinutes() < 10 ){
            $scope.editCourse.endToMYSQL = '1000-01-01 0' + $scope.editCourse.end.getHours() + ":0" + $scope.editCourse.end.getMinutes() + ":00"
        } else if ($scope.editCourse.end.getHours() < 10 && $scope.editCourse.end.getMinutes() > 10) {
            $scope.editCourse.endToMYSQL = '1000-01-01 0' + $scope.editCourse.end.getHours() + ":" + $scope.editCourse.end.getMinutes() + ":00"
        } else if ($scope.editCourse.end.getHours() > 10 && $scope.editCourse.end.getMinutes() < 10) {
            $scope.editCourse.endToMYSQL = '1000-01-01 ' + $scope.editCourse.end.getHours() + ":0" + $scope.editCourse.end.getMinutes() + ":00"
        } else {
            $scope.editCourse.endToMYSQL = '1000-01-01 ' + $scope.editCourse.end.getHours() + ":" + $scope.editCourse.end.getMinutes() + ":00"
        }
        planningFactory.updateCourse($scope.editCourse, id)
            .then(function(response){
                planningFactory.getFormation($scope.formation)
                    .then(function(response){
                        $scope.formation = response.data
                        $scope.week = $scope.formation.weeks[$scope.weekIndex];
                        $scope.editCourse = {};
                        $scope.editCourse.start = $scope.editCourse.end= d;
                    }, function(error){
                        console.log(error);
                    })
            }, function(error){
                console.log(error);
            })
    }

    //deleting a course
    $scope.deleteCourse = function(course){
        planningFactory.deleteCourse(course.id)
            .then(function(response){
                planningFactory.getFormation($scope.formation)
                    .then(function(response){
                        $scope.formation = response.data
                        $scope.candidats.forEach(function(candidat, value){
                            $scope.unregisterCandidat(candidat, course)
                        })
                        $scope.week = $scope.formation.weeks[$scope.weekIndex];
                    }, function(error){
                        console.log(error);
                    })
            }, function(error){
                console.log(error);
            })
    }

    //////////////////////////////////////
    //////////TOPICS////////////////
    /////////////////////////////////////

    //returns the color of a topic to use it in ng-style
    $scope.getColor = function(topic){
        return topic.color
    }

    $scope.toGradient = function(topic){
        var color = $scope.getColor(topic)
        var gradient = "linear-gradient(to right, white," + color + ")"
        return gradient
    }
    //adding a new topic
    $scope.addTopic = function(){
        this.newTopic.formation_id = $scope.formation.id
        topicsFactory.addTopic(this.newTopic)
            .then(function(response){
                planningFactory.getFormation($scope.formation)
                    .then(function(response){
                        $scope.formation = response.data;
                        $scope.addTopicFormDisplay = false;
                    }, function(error){
                        console.log(error);
                    })
            }, function(error){
                console.log(error);
            })
    }

    //deleting a topic
    $scope.deleteTopic = function(id){
        topicsFactory.deleteTopic(id)
            .then(function(response){
                planningFactory.getFormation($scope.formation)
                    .then(function(response){
                        $scope.formation = response.data;
                        $scope.week = $scope.formation.weeks[$scope.weekIndex];
                    }, function(error){
                        console.log(error);
                    })
            }, function(error){
                console.log(error);
            })
    }

    //////////////////////////////////////
    //////////ROOMS///////////////
    /////////////////////////////////////

    //adding a new room
    $scope.addRoom = function(){
        this.newRoom.formation_id = $scope.formation.id
        roomsFactory.addRoom(this.newRoom)
            .then(function(response){
                planningFactory.getFormation($scope.formation)
                    .then(function(response){
                        $scope.formation = response.data;
                        $scope.addRoomFormDisplay = false;
                    }, function(error){
                        console.log(error);
                    })
            }, function(error){
                console.log(error);
            })
    }

    //deleting a room
    $scope.deleteRoom = function(id){
        console.log(id);
        roomsFactory.deleteRoom(id)
            .then(function(response){
                planningFactory.getFormation($scope.formation)
                    .then(function(response){
                        $scope.formation = response.data;
                        $scope.week = $scope.formation.weeks[$scope.weekIndex];
                    }, function(error){
                        console.log(error);
                    })
            }, function(error){
                console.log(error);
            })
    }

    //////////////////////////////////////
    //////////CANDIDATS/////////
    /////////////////////////////////////

    //fetching all candidates
    $scope.getCandidats = function(formation){
        candidatsFactory.getCandidats(formation.id)
            .then(function(response){
                $scope.candidats = response.data;
            }, function(error){
                console.log(error);
            })
    }

    //adding a new candidate
    $scope.addCandidat = function(){
        this.newCandidat.formation_id = $scope.formation.id
        candidatsFactory.addCandidat(this.newCandidat)
            .then(function(response){
                $scope.getCandidats();
            }, function(error){
                console.log(error);
            })
    }

    //deleting a candidate
    $scope.deleteCandidat = function(id){
        candidatsFactory.deleteCandidat(id)
            .then(function(response){
                $scope.getCandidats();
            }, function(error){
                console.log(error);
            })
    }

    //registering a candidate to a course
    $scope.registerCandidat = function(candidat){
        this.regCandidat.candidat = candidat.id
        candidatsFactory.registerCandidat(this.regCandidat)
            .then(function(response){
                $scope.getCandidats($scope.formation);
                $scope.addCandidatFormDisplay = false;
            }, function(error){
                console.log(error);
            })
    }

    //unregistering a candidate from a course
    $scope.unregisterCandidat = function(candidat, course){
        $scope.unregCandidat= {};
        $scope.unregCandidat.candidat = candidat.id;
        $scope.unregCandidat.course = course.id;
        candidatsFactory.unregisterCandidat($scope.unregCandidat)
            .then(function(response){
                $scope.getCandidats($scope.formation);
                $scope.addCandidatFormDisplay = false;
            }, function(error){
                console.log(error);
            })
    }

    //filtering candidate's courses by day
    $scope.courseFilter = function(course, day){
        var result = false;
        if (course.day_id == day.id){
            result = true
        }
        return result;
    }

    //////////////////////////////////////
    //////////TEACHERS/////////
    /////////////////////////////////////


    //fetching all teachers
    $scope.getTeachers = function(formation){
        teachersFactory.getTeachers(formation.id)
            .then(function(response){
                $scope.teachers = response.data;
            }, function(error){
                console.log(error);
            })
    }

    //adding a new teacher
    $scope.addTeacher = function(){
        this.newTeacher.formation_id = $scope.formation.id
        teachersFactory.addTeacher(this.newTeacher)
            .then(function(response){
                // $scope.getTeachers($scope.formation);
                $scope.addTeacherFormDisplay = false;
            }, function(error){
                console.log(error);
            })
    }
});
