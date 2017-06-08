app.factory('teachersFactory', function($q, $http){
    return{
        getTeachers : function(id){
            var deferred = $q.defer();
            $http.get('http://localhost:8000/teachers/' + id)
                .then(function(response){
                deferred.resolve(response.data);
            }).catch(function(error){
                deferred.reject(error);
            })
            return deferred.promise;
        },
        addTeacher: function(data){
            var deferred = $q.defer();
            $http.post('http://localhost:8000/teachers', data)
                .then(function(response){
                deferred.resolve(response.data);
            }).catch(function(error){
                deferred.reject(error);
            })
            return deferred.promise;
        }
    }
});
