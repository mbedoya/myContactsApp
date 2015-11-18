var controllersModule =  angular.module('laboru.controllers', [])

        .controller('AppCtrl', function($scope, $rootScope, $location, $ionicModal, $timeout) {

            // With the new view caching in Ionic, Controllers are only called
            // when they are recreated or on app start, instead of every page change.
            // To listen for when this page is active (for example, to refresh data),
            // listen for the $ionicView.enter event:
            //$scope.$on('$ionicView.enter', function(e) {
            //});

            // Form data for the login modal
            $scope.loginData = {};

            // Create the login modal that we will use later
            $ionicModal.fromTemplateUrl('templates/login.html', {
                scope: $scope
            }).then(function(modal) {
                $scope.modal = modal;
            });

            // Triggered in the login modal to close it
            $scope.closeLogin = function() {
                $scope.modal.hide();
            };

            // Open the login modal
            $scope.login = function() {
                $scope.modal.show();
            };

            // Perform the login action when the user submits the login form
            $scope.doLogin = function() {
                console.log('Doing login', $scope.loginData);

                // Simulate a login delay. Remove this and replace with your login
                // code if using a login system
                $timeout(function() {
                    $scope.closeLogin();
                }, 1000);
            };

            $scope.name = function(){
                return $rootScope.profile.personalInfo.name;
            }

            $scope.gotoProfile = function(){
                localStorage.profileVisited = true;
                $location.path('/app/menu/tabs/profile');
            }
        })

        .controller('SetupNameCtrl', function($scope, $rootScope, $location, Utility) {

            $scope.model = {
                name: $rootScope.profile.personalInfo.name
            }

            $scope.getLocalizedText = function(text){
                return Utility.getLocalizedStringValue(text);
            }

            $scope.continue = function(){

                localStorage.name = $scope.model.name;
                $rootScope.profile.personalInfo.name = localStorage.name;

                $location.path('/app/setupmobile');
            }
        })

        .controller('SetupMobileCtrl', function($scope, $rootScope, $location, $ionicPopup, $ionicLoading, Expert, Utility) {

            $scope.initialize = function(){

                $scope.model = { country:"57"};
                $scope.contactsSearchDone = false;
                $scope.contactsSuccess = false;

                if(navigator.contacts){

                    // find all contacts with 'Bob' in any name field
                    options      = new ContactFindOptions();
                    options.filter   = "";
                    options.multiple = true;
                    options.hasPhoneNumber = true;
                    fields = ["displayName"];

                    navigator.contacts.find(fields, function(contacts){

                        contactsArray = new Array();
                        for(i=0; i<contacts.length; i++){
                            //Add Contacts if they have a name and mobile number
                            if(contacts[i].displayName && contacts[i].displayName.trim().length > 0 &&
                                contacts[i].name.givenName && contacts[i].name.givenName.trim().length > 0 &&
                                contacts[i].phoneNumbers && contacts[i].phoneNumbers.length > 0 && contacts[i].phoneNumbers[0].value.trim().length > 0){
                                contactsArray.push({Name : contacts[i].displayName, LastName : contacts[i].name.familiyName, Mobile: contacts[i].phoneNumbers[0].value });
                            }
                        }

                        $rootScope.contacts = contactsArray;
                        $scope.contactsSearchDone = true;


                    }, function(contactError){

                        $scope.contactsSearchDone = true;

                    }, options);
                }else{
                    alert("No Contacts");
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

                                                $scope.helpWindow('','Bienvenido a Laboru!! Esperamos que difrutes de nuestros servicios');
                                                $location.path('/app/menu/tabs/news');
                                            }else{
                                                $scope.helpWindow('','Te has registrado pero no es posible acceder a tus Contactos para configurar la cuenta');
                                                $location.path('/app/menu/tabs/news');
                                            }
                                        });

                                    }else{

                                        $ionicLoading.hide();
                                        $scope.helpWindow('','Te has registrado pero no es posible acceder a tus Contactos para configurar la cuenta');
                                        $location.path('/app/menu/tabs/news');

                                    }
                                }
                            }, 1000);

                        }else{

                            if($rootScope.contacts){

                                Expert.setContacts($rootScope.contacts, function(success, data){

                                    $ionicLoading.hide();

                                    if(success){

                                        $scope.helpWindow('','Bienvenido a Laboru!! Esperamos que difrutes de nuestros servicios');
                                        $location.path('/app/menu/tabs/news');
                                    }else{
                                        $scope.helpWindow('','Te has registrado pero no es posible acceder a tus Contactos para configurar la cuenta');
                                        $location.path('/app/menu/tabs/news');
                                    }
                                });

                            }else{

                                $ionicLoading.hide();
                                $scope.helpWindow('','Te has registrado pero no es posible acceder a tus Contactos para configurar la cuenta');
                                $location.path('/app/menu/tabs/news');

                            }
                        }

                    }else{
                        $ionicLoading.hide();
                        $scope.helpWindow('','Error creando tu cuenta, intenta de nuevo');
                    }

                });

            }
        })

        .controller('TabsCtrl', function($scope, $rootScope, Utility) {

            $scope.getLocalizedText = function(text){
                return Utility.getLocalizedStringValue(text);
            }

        })



        .controller('PlaylistCtrl', function($scope, $stateParams) {
        })

    ;
