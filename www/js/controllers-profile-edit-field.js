controllersModule.controller('ProfileEditFieldCtrl', function($scope, $rootScope, $location, $ionicPopup, $ionicLoading, Expert, Utility) {

    $scope.updateProfile = function(){
        Expert.updateProfile(function(success, data) {
            if (success) {
                localStorage.name = $rootScope.profile.personalInfo.name;
            }else{

            }
        });
    }

});
