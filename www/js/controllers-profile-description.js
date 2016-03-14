controllersModule.controller('ProfileDescriptionCtrl', function($scope, $rootScope, $location, $ionicPopup, $ionicLoading, Skills, Utility) {

    $scope.initialize = function(){

        $scope.model = { description: '' }

    }

    $scope.initialize();

    $scope.getLocalizedText = function(text){
        return Utility.getLocalizedStringValue(text);
    }

    $scope.continue = function(){

        $rootScope.xPerDescription = $scope.model.description;

        $location.path('/app/profilecategories');
    }

});

