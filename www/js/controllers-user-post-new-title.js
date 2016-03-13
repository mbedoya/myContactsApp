controllersModule.controller('UserPostNewTitleCtrl', function($scope, $rootScope, $location, $ionicPopup, $ionicLoading, Expert, Utility) {

    $scope.getLocalizedText = function(text){
        return Utility.getLocalizedStringValue(text);
    }

    $scope.initialize = function(){
        $scope.model = { title: ''};
    }

    $scope.initialize();

    $scope.continue = function(){
        $rootScope.newPostTitle = $scope.model.title;
        $location.path('/app/menu/userpostnewdescription');
    }

});