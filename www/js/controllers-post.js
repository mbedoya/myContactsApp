controllersModule.controller('PostCtrl', function($scope, $rootScope, $location, $ionicPopup, $ionicLoading, Expert, Utility) {

    $scope.initialize = function(){
        Utility.trackPage("Post");
    }

    $scope.initialize();

    $scope.getDate = function(date){
        var milli = date.replace(/\/Date\((-?\d+)\)\//, '$1');
        var d = new Date(parseInt(milli));

        return d;
    }

    $scope.$on('$ionicView.enter', function() {

        $rootScope.showLoadingIndicator = true;

        Expert.get($rootScope.selectedPost.FromExpertID, function (success, data) {

            $rootScope.showLoadingIndicator = false;

            if (success) {
                $scope.xPer = data;
                $scope.$apply();

                console.log(data);
            }else{
                $scope.helpWindow("","Error buscando información de Post");
            }
        });

    });

});
