controllersModule.controller('UserPostNewTitleCtrl', function($scope, $rootScope, $location, $ionicPopup, $ionicLoading, Expert, Utility) {

    $scope.getLocalizedText = function(text){
        return Utility.getLocalizedStringValue(text);
    }

    $scope.continue = function(){
        $location.path('/app/menu/userpostnewdescription');
    }

});