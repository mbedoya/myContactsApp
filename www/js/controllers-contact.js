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

        $location.path('/app/menu/contact-recommendation');

        /*
        if($rootScope.fromMyContacts){
            $location.path('/app/menu/contact-recommendation');
        }else{
            $location.path('/app/menu/tabs/expertcontact-recommendation');
        }
        */
    }

    $scope.$on('$ionicView.beforeEnter', function(){

        if($rootScope.reloadContact){

            $rootScope.reloadContact = false;

            $scope.loading =  $ionicLoading.show({
                template: Utility.getLoadingTemplate('Cargando a ' + $scope.contactName())
            });

            Expert.get($rootScope.selectedContact.ID, function(success, data) {

                $ionicLoading.hide();

                if (success) {
                    $rootScope.selectedContact = data;
                }
            });

            Expert.getRecommendationsBySkills($rootScope.selectedContact.ID, $rootScope.selectedSkill.ID, function(success, data) {

                $ionicLoading.hide();

                if (success) {
                    $scope.recommendations = data;
                }

            });

        }
    })

});
