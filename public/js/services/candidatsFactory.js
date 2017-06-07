app.factory ('candidatsFactory', function($q, $http){
    return {
        getCandidats : function(){
            var deferred= $q.defer();
            $http.get('http://localhost:8000/candidats')
                .then(function(response){
                deferred.resolve(response.data);
            }).catch(function(error){
                deferred.reject(error);
            })
            return deferred.promise;
        },
        addCandidat : function(data){
            var deferred = $q.defer();
            $http.post('http://localhost:8000/candidats', data)
                .then(function(response){
                deferred.resolve(response.data);
            }).catch(function(error){
                deferred.reject(error);
            })
            return deferred.promise;
        },
        deleteCandidat: function(id){
            var deferred = $q.defer();
            $http.delete('http://localhost:8000/candidats/' + id)
                .then(function(response){
                deferred.resolve(response.data);
            }).catch(function(error){
                deferred.reject(error);
            })
            return deferred.promise;
        },
        registerCandidat : function(data){
            var deferred = $q.defer();
            $http.post('http://localhost:8000/candidats/courses', data)
                .then(function(response){
                    console.log(response);
                deferred.resolve(response.data);
            }).catch(function(error){
                deferred.reject(error);
            })
            return deferred.promise;
        },
        unregisterCandidat : function(data){
            var deferred = $q.defer();
            $http.post('http://localhost:8000/candidats/courses/unsub', data)
                .then(function(response){
                    console.log(response);
                deferred.resolve(response.data);
            }).catch(function(error){
                deferred.reject(error);
            })
            return deferred.promise;
        }
    }
});
