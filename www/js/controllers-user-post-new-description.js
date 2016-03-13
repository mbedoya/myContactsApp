controllersModule.controller('UserPostNewDescriptionCtrl', function($scope, $rootScope, $location, $ionicHistory, $ionicPopup, $ionicLoading, Expert, Utility, Posts) {

    $scope.helpWindow = function(title, message) {
        var popup = $ionicPopup.alert({
            title: "",
            template: message
        });
    };

    $scope.getLocalizedText = function(text){
        return Utility.getLocalizedStringValue(text);
    }

    $scope.initialize = function(){
        $scope.model = { description: ''};
    }

    $scope.initialize();

    $scope.continue = function(){
        $rootScope.newPostDescription = $scope.model.description;

        Posts.create($rootScope.newPostSkill, $rootScope.newPostTitle, $rootScope.newPostDescription, function(success, data) {

            $ionicLoading.hide();

            if (success) {

                $scope.helpWindow("","Se ha creado tu Post");

            }else{
                $scope.helpWindow("","Error creando Post");
            }

        });

        $ionicHistory.goBack(-3);
    }

});