controllersModule.controller('UserPostsCtrl', function($scope, $rootScope, $ionicPopup, $ionicLoading, $location, Utility, Expert) {

    $scope.helpWindow = function(title, message) {
        var popup = $ionicPopup.alert({
            title: "",
            template: message
        });
    };

    $scope.viewPost = function(index){
        $location.path('/app/menu/userpost');
    }

    $scope.continue = function(){
        $location.path('/app/menu/userpostnewtitle');
    }
});


