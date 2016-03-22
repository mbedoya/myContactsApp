controllersModule.controller('UserPostsCtrl', function($scope, $rootScope, $ionicPopup, $ionicLoading, $location, Utility, Posts) {

    $scope.helpWindow = function(title, message) {
        var popup = $ionicPopup.alert({
            title: "",
            template: message
        });
    };

    $scope.viewPost = function(index){
        $location.path('/app/menu/userpost');
    }

    $scope.getDate = function(date){
        var milli = date.replace(/\/Date\((-?\d+)\)\//, '$1');
        var d = new Date(parseInt(milli));

        return d;
    }

    $scope.$on('$ionicView.enter', function(){

        $rootScope.showLoadingIndicator = true;

        Posts.getByExpert(function(success, data) {

            $rootScope.showLoadingIndicator = false;

            if (success) {
                $scope.posts = data;

                $scope.$apply();

            }else{
                $scope.helpWindow("","Error buscando Posts");
            }

        });

    });



    $scope.initialize = function(){
        Utility.trackPage("User Posts");
    }

    $scope.initialize();

    $scope.continue = function(){
        $location.path('/app/menu/userpostnewcategory');
    }
});


