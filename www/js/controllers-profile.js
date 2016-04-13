controllersModule.controller('ProfileCtrl', function($scope, $rootScope, $location, $ionicPopup, $ionicLoading, Expert, Utility) {

    $scope.getName = function(){
        return $rootScope.profile.personalInfo.name;
    }

    $scope.getMobile = function(){
        return $rootScope.profile.personalInfo.mobile;
    }

    $scope.getBio = function(){
        return $rootScope.xPerDescription;
    }

    $scope.getSkills = function(){
        if($rootScope.xPerSkills){
            return "Has registrado " + $rootScope.xPerSkills.length + " habilidades";
        }else {
            return "No has registrado tus habilidades";
        }
    }

    $scope.gotoEditField = function(field){

        $rootScope.fieldToEdit = field;
        $location.path('/app/profile-edit-field');
    }

});
