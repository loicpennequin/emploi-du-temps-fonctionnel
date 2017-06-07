app.factory ('planningFactory', function($q, $http){
    return {
        getFormations : function(){
            var deferred= $q.defer();
            $http.get('http://localhost:8000/formations')
                .then(function(response){
                deferred.resolve(response.data);
            }).catch(function(error){
                deferred.reject(error);
            })
            return deferred.promise;
        },
        getFormation : function(formation){
            var deferred = $q.defer();
            $http.get('http://localhost:8000/formation/' + formation.id)
                .then(function(response){
                deferred.resolve(response.data);
            }).catch(function(error){
                deferred.reject(error);
            })
            return deferred.promise;
        },
        addWeek : function(data){
            var deferred = $q.defer();
            $http.post('http://localhost:8000/weeks', data)
                .then(function(response){
                deferred.resolve(response.data);
            }).catch(function(error){
                deferred.reject(error);
            })
            return deferred.promise;
        },
        addDay : function(data){
            var deferred = $q.defer();
            $http.post('http://localhost:8000/days', data)
                .then(function(response){
                deferred.resolve(response.data);
            }).catch(function(error){
                deferred.reject(error);
            })
            return deferred.promise;
        },
        addCourse : function(data){
            var deferred = $q.defer();
            $http.post('http://localhost:8000/courses', data)
                .then(function(response){
                deferred.resolve(response.data);
            }).catch(function(error){
                deferred.reject(error);
            })
            return deferred.promise;
        },
        updateCourse : function(data, id){
            var deferred = $q.defer();
            $http.put('http://localhost:8000/course/' + id, data)
                .then(function(response){
                deferred.resolve(response.data);
            }).catch(function(error){
                deferred.reject(error);
            })
            return deferred.promise;
        },
        deleteCourse : function(id){
            var deferred = $q.defer();
            $http.delete('http://localhost:8000/course/' + id)
                .then(function(response){
                deferred.resolve(response.data);
            }).catch(function(error){
                deferred.reject(error);
            })
            return deferred.promise;
        }
    }
});
