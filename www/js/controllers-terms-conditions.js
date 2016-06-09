controllersModule.controller('TermsConditionsCtrl', function ($scope, $rootScope, $location, $ionicPopup, $ionicHistory, $ionicLoading, Expert, Utility) {

    $scope.getLocalizedText = function(text){
        return Utility.getLocalizedStringValue(text);
    }

    $scope.initialize = function(){

        Utility.trackPage("Terms and conditions");

        $scope.model = { selected: false };
    }

    $scope.continue = function () {

        if(localStorage.userType == "xper"){
            $location.path('/app/profiledescription');
        }else{
            $location.path('/app/menu/userhome');
        }
    }

    $scope.initialize();

});
