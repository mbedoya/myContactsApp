controllersModule.controller('SetupMobileCtrl', function($scope, $rootScope, $location, $ionicPopup, $ionicLoading, Expert, Utility) {

    $scope.initialize = function(){

        $scope.model = { country:"57"};
        $scope.contactsSearchDone = false;
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
                $scope.contactsSearchDone = true;


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
            $scope.helpWindow("Inicio de sesión","Ingresa tu cédula");
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

        $scope.loading =  $ionicLoading.show({
            template: Utility.getLoadingTemplate(Utility.getLocalizedStringValue('waitingConfirmation'))
        });

        Expert.register(function(success, data){

            if(success){

                localStorage.mobile = $rootScope.profile.personalInfo.mobile;
                localStorage.id = data.ID;
                $rootScope.profile.personalInfo.id = data.ID;

                if(!$scope.contactsSearchDone){

                    //Waiting for the contacts to be found
                    $scope.interval = setInterval(function(){
                        if($scope.contactsSearchDone){

                            clearInterval($scope.interval);
                            if($rootScope.contacts){

                                Expert.setContacts($rootScope.contacts, function(success, data){

                                    $ionicLoading.hide();

                                    if(success){

                                        //$scope.helpWindow('','Bienvenido a Laboru!! Esperamos que difrutes de nuestros servicios');
                                        $location.path('/app/selectaccounttype');
                                    }else{
                                        $scope.helpWindow('','Te has registrado pero no es posible acceder a tus Contactos para configurar la cuenta');
                                        $location.path('/app/selectaccounttype');
                                    }
                                });

                            }else{

                                $ionicLoading.hide();
                                //$scope.helpWindow('','Te has registrado pero no es posible acceder a tus Contactos para configurar la cuenta');
                                $location.path('/app/selectaccounttype');

                            }
                        }
                    }, 1000);

                }else{

                    if($rootScope.contacts){

                        Expert.setContacts($rootScope.contacts, function(success, data){

                            $ionicLoading.hide();

                            if(success){

                                //$scope.helpWindow('','Bienvenido a Laboru!! Esperamos que difrutes de nuestros servicios');
                                $location.path('/app/selectaccounttype');
                            }else{
                                $scope.helpWindow('','Te has registrado pero no es posible acceder a tus Contactos para configurar la cuenta');
                                $location.path('/app/selectaccounttype');
                            }
                        });

                    }else{

                        $ionicLoading.hide();
                        $scope.helpWindow('','Te has registrado pero no es posible acceder a tus Contactos para configurar la cuenta');
                        $location.path('/app/selectaccounttype');

                    }
                }

            }else{
                $ionicLoading.hide();
                $scope.helpWindow('','Error creando tu cuenta, intenta de nuevo');
            }

        });

    }
});
