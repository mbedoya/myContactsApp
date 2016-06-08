controllersModule.controller('SetupMobileCtrl', function($scope, $rootScope, $location, $ionicPopup, $ionicHistory, $ionicLoading, Expert, Utility) {

    $scope.initialize = function(){

        Utility.trackPage("Home Usuario");

        $scope.model = { country:"57"};
        $rootScope.contactsSearchDone = false;
        $scope.contactsSuccess = false;

        if(navigator.contacts){

            options      = new ContactFindOptions();
            options.filter   = "";
            options.multiple = true;
            options.hasPhoneNumber = true;
            fields = ["displayName"];

            myDbContacts = new db_contacts_js($rootScope.configuration.localDB);

            navigator.contacts.find(fields, function(contacts){

                contactsArray = new Array();
                for(i=0; i<contacts.length; i++){
                    //Add Contacts if they have a name and mobile number
                    if(contacts[i].displayName && contacts[i].displayName.trim().length > 0 &&
                        contacts[i].name.givenName && contacts[i].name.givenName.trim().length > 0 &&
                        contacts[i].phoneNumbers && contacts[i].phoneNumbers.length > 0 && contacts[i].phoneNumbers[0].value.trim().length > 0){

                        contactsArray.push({Name : contacts[i].displayName, LastName : contacts[i].name.familiyName, Mobile: contacts[i].phoneNumbers[0].value });
                        myDbContacts.insert(contacts[i].displayName, contacts[i].phoneNumbers[0].value);

                    }
                }

                $rootScope.contacts = contactsArray;
                $rootScope.contactsSearchDone = true;


            }, function(contactError){

                $scope.contactsSearchDone = true;

            }, options);
        }else{
            $scope.contactsSearchDone = true;
        }
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
