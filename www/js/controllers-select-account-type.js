controllersModule.controller('SelectAccountTypeCtrl', function($scope, $rootScope, $location, $ionicPopup, $ionicHistory, $ionicLoading, Expert, Utility, Skills) {

    $scope.helpWindow = function(title, message) {
        var popup = $ionicPopup.alert({
            title: "",
            template: message
        });
    };

    $scope.selectAccount = function(type){

        if(type == "xPer"){
            localStorage.userType = 'xper';
            $location.path('/app/profiledescription');
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
        });
    }

    $scope.initialize();

});
