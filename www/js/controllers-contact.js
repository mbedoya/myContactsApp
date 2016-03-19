controllersModule.controller('ContactCtrl', function($scope, $rootScope, $ionicPopup, $ionicLoading, $location, Utility, Expert) {

    $scope.contactName = function(){
        return $rootScope.selectedContact.Name;
    }

    $scope.contactBio = function(){
        return $rootScope.selectedContact.Bio;
    }

    $scope.contactSkills = function(){
        return $rootScope.selectedContact.Skills;
    }

    $scope.contactMobile = function(){
        return $scope.selectedContact.Mobile;
    }

    $scope.gotoRecommend = function(){

        $rootScope.fromContactsList = false;
        $location.path('/app/menu/contact-recommendation');
    }

    $scope.$on('$ionicView.enter', function(){

        if($rootScope.reloadContact){

            $rootScope.reloadContact = false;

            $rootScope.showLoadingIndicator = true;

            Expert.get($rootScope.selectedContact.ID, function(success, data) {

                $rootScope.showLoadingIndicator = false;

                if (success) {
                    $rootScope.selectedContact = data;
                    $scope.$apply();
                }
            });

            Expert.getRecommendationsBySkills($rootScope.selectedContact.ID, $rootScope.selectedSkill.ID, function(success, data) {

                $rootScope.showLoadingIndicator = false;

                if (success) {
                    $scope.recommendations = data;
                    $scope.$apply();
                }

            });

        }
    })

});
