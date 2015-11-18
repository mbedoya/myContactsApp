controllersModule.controller('ProfileCtrl', function($scope, $rootScope, $location, $ionicPopup, $ionicLoading, Expert, Utility) {

    $scope.getName = function(){
        return $rootScope.profile.personalInfo.name;
    }

    $scope.getMobile = function(){
        return $rootScope.profile.personalInfo.mobile;
    }

    $scope.getBio = function(){
        return $rootScope.profile.businessInfo.bio;
    }

    $scope.gotoEditField = function(field){
        $location.path('/app/menu/tabs/profile-edit-field');
    }

});
