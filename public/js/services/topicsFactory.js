app.factory ('topicsFactory', function($q, $http){
    return {
        addTopic : function(data){
            var deferred = $q.defer();
            $http.post('http://localhost:8000/topics', data)
                .then(function(response){
                deferred.resolve(response.data);
            }).catch(function(error){
                deferred.reject(error);
            })
            return deferred.promise;
        },
        deleteTopic : function(id){
            var deferred = $q.defer();
            $http.delete('http://localhost:8000/topic/' + id)
                .then(function(response){
                deferred.resolve(response.data);
            }).catch(function(error){
                deferred.reject(error);
            })
            return deferred.promise;
        }
    }
});
