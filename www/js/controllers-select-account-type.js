controllersModule.controller('SelectAccountTypeCtrl', function($scope, $rootScope, $location, $ionicPopup, $ionicLoading, Expert, Utility, Skills) {

    $scope.helpWindow = function(title, message) {
        var popup = $ionicPopup.alert({
            title: "",
            template: message
        });
    };

    $scope.selectAccount = function(type){
        if(type == "xPer"){
            localStorage.userType = 'xper';
            $location.path('/app/menu/tabs/news');
        }else{
            localStorage.userType = 'user';
            $location.path('/app/menu/userhome');
        }
    }

});
