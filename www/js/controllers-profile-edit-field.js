controllersModule.controller('ProfileEditFieldCtrl', function($scope, $rootScope, $location, $ionicPopup, $ionicLoading, $ionicHistory, Expert, Utility) {

    $scope.helpWindow = function(title, message) {
        var popup = $ionicPopup.alert({
            title: "",
            template: message
        });
    };

    $scope.model = { description : $rootScope.xPerDescription };

    $scope.updateProfile = function(){

        $rootScope.showLoadingIndicator = true;

        //Set Expert Skills format for Service
        var skills = $rootScope.xPerSkills;

        if($rootScope.xPerSkills){
            var newArray = new Array();
            for(i=0;i<$rootScope.xPerSkills.length;i++){
                newArray.push({ID:$rootScope.xPerSkills[i] });
            }
            $rootScope.xPerSkills = newArray;
        }

        console.log($rootScope.xPerDescription);

        Expert.updateProfile(function(success, data) {

            $rootScope.showLoadingIndicator = false;

            $rootScope.xPerSkills = skills;

            if (success) {
                localStorage.name = $rootScope.profile.personalInfo.name;
                $rootScope.xPerDescription = $scope.model.description;
                localStorage.description = $rootScope.xPerDescription;

                $ionicHistory.goBack(-1);
                $scope.helpWindow("","Información actualizada");

            }else{

            }
        });

    }

});
