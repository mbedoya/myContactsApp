controllersModule.controller('ContactCtrl', function($scope, $rootScope, $ionicPopup, $ionicLoading, $location, $filter, Utility, Expert) {


    $scope.initialize = function(){
        Utility.trackPage("Contactos");
    }

    $scope.initialize();

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

    $scope.share = function(){
        if(window.plugins.socialsharing){
            if($rootScope.selectedSkill) {
                window.plugins.socialsharing.share($scope.contactName() + ' ' + $filter('phonenumber')($scope.contactMobile()) + ' xPer en ' +
                    $rootScope.selectedSkill.Name +' ha sido Recomendado por medio de Laboru:', null, null, 'http://laboru.co');
            }else{
                window.plugins.socialsharing.share($scope.contactName() + ' ' + $filter('phonenumber')($scope.contactMobile()) + ' ha sido Recomendado por medio de Laboru:', null, null, 'http://laboru.co');
            }
        }
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
