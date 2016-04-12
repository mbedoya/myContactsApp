controllersModule.controller('ProfileEditFieldCtrl', function($scope, $rootScope, $location, $ionicPopup, $ionicLoading, Expert, Utility) {

    $scope.updateProfile = function(){

        //Set Expert Skills format for Service
        var skills = $rootScope.xPerSkills;

        if($rootScope.xPerSkills){
            var newArray = new Array();
            for(i=0;i<$rootScope.xPerSkills.length;i++){
                newArray.push({ID:$rootScope.xPerSkills[i] });
            }
            $rootScope.xPerSkills = newArray;
        }

        Expert.updateProfile(function(success, data) {

            $rootScope.xPerSkills = skills;

            if (success) {
                localStorage.name = $rootScope.profile.personalInfo.name;
            }else{

            }
        });

    }

});
