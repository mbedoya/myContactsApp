controllersModule.controller('UserPostNewDescriptionCtrl', function($scope, $rootScope, $location, $ionicPopup, $ionicLoading, Expert, Utility) {

    $scope.helpWindow = function(title, message) {
        var popup = $ionicPopup.alert({
            title: "",
            template: message
        });
    };

    $scope.getLocalizedText = function(text){
        return Utility.getLocalizedStringValue(text);
    }

    $scope.continue = function(){

        $scope.helpWindow("","Se ha creado tu Post");
        $location.path('/app/menu/userposts');
    }

});