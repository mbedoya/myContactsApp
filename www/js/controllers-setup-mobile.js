controllersModule.controller('SetupMobileCtrl', function($scope, $rootScope, $location, $ionicPopup, $ionicHistory, $ionicLoading, Expert, Utility) {

    $scope.initialize = function(){

        Utility.trackPage("Setup Mobile");

        $scope.model = { country:"57"};
        $rootScope.contactsSearchDone = false;
        $scope.contactsSuccess = false;

        //Get All Contacts
        Utility.getPhoneContacts(function(success, contacts, error) {

            $rootScope.contactsSearchDone = true;

            if (success) {
                $rootScope.contacts = contacts;
            }
        });
    }

    $scope.initialize();

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

        if(!$scope.model.number || String($scope.model.number).length == 0){
            $scope.helpWindow("Inicio de sesión","Ingresa tu número de móvil");
            return;
        }

        if(String($scope.model.number).length < 10){
            $scope.helpWindow("Inicio de sesión","Ingresa los 10 digitos de tu número");
            return;
        }

        if(String($scope.model.number).indexOf(".") >= 0 || String($scope.model.number).indexOf(",") >= 0){
            $scope.helpWindow("Inicio de sesión","Ingresa sólo números");
            return;
        }

        $rootScope.profile.personalInfo.mobile = $scope.model.country + $scope.model.number;

        $location.path('/app/mobileconfirmation');

    }
});
