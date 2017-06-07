app.factory ('roomsFactory', function($q, $http){
    return {
        addRoom : function(data){
            var deferred = $q.defer();
            $http.post('http://localhost:8000/rooms', data)
                .then(function(response){
                deferred.resolve(response.data);
            }).catch(function(error){
                deferred.reject(error);
            })
            return deferred.promise;
        },
        deleteRoom : function(id){
            var deferred = $q.defer();
            $http.delete('http://localhost:8000/room/' + id)
                .then(function(response){
                deferred.resolve(response.data);
            }).catch(function(error){
                deferred.reject(error);
            })
            return deferred.promise;
        }
    }
});
