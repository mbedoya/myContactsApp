controllersModule.controller('SelectAccountTypeCtrl', function($scope, $rootScope, $location, $ionicPopup, $ionicLoading, Expert, Utility) {

    $scope.selectAccout = function(type){

        if(type == "xPer"){

            $location.path('/app/menu/tabs/news');
        }else{

        }
    }
});
