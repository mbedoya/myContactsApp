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

    $scope.initialize = function(){
        //Get All Skills
        Skills.getAll(function(success, data) {

            $ionicLoading.hide();

            if (success) {

                $rootScope.skills = data;


            }else{
                $scope.helpWindow("","Error inicializando");
            }

            if(localStorage.userType == 'xper'){
                $location.path('/app/menu/tabs/news');
            }else{
                $location.path('/app/menu/userhome');
            }
        });
    }

    $scope.initialize();

});
