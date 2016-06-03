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
                //localStorage.profileVisited = true;
                $location.path('/app/profile');
            }

            $scope.changeText = function(){
                if(localStorage.userType == 'xper'){
                    return "Usuario";
                }else{
                    return "xPer"
                }
            }

            $scope.changeAccountType = function(){
                if(localStorage.userType == 'xper'){
                    localStorage.userType = 'user';
                    $location.path('/app/menu/userhome');
                }else{
                    localStorage.userType = 'xper';
                    if(localStorage.xPerProfileDone){
                        $location.path('/app/menu/tabs/news');
                    }else{
                        $location.path('/app/profiledescription');
                    }
                }
            }

            $scope.showLoading = function(){
                if($rootScope.showLoadingIndicator){
                    return $rootScope.showLoadingIndicator;
                }
                return false;
            }
        })

        .controller('SetupNameCtrl', function($scope, $rootScope, $location, Expert, Utility) {

            $scope.model = {
                name: $rootScope.profile.personalInfo.name
            }

            $scope.getLocalizedText = function(text){
                return Utility.getLocalizedStringValue(text);
            }

            $scope.continue = function(){

                if(!$scope.model.name || String($scope.model.name).length == 0){
                    $scope.helpWindow("Inicio de sesión","Ingresa tu Nombre");
                    return;
                }

                if(String($scope.model.name).length < 10){
                    $scope.helpWindow("Inicio de sesión","Ingresa mínimo 10 caracteres en tu Nombre");
                    return;
                }

                localStorage.name = $scope.model.name;
                $rootScope.profile.personalInfo.name = localStorage.name;
                
                console.log("about to register");
                
                Expert.register(function (success, data) {

                    if (success) {

                        localStorage.mobile = $rootScope.profile.personalInfo.mobile;
                        localStorage.id = data.ID;

                        $rootScope.profile.personalInfo.id = data.ID;

                        if (!$rootScope.contactsSearchDone) {

                            //Waiting for the contacts to be found
                            $scope.interval = setInterval(function () {
                                if ($rootScope.contactsSearchDone) {

                                    clearInterval($scope.interval);
                                    if ($rootScope.contacts) {

                                        Expert.setContacts($rootScope.contacts, function (success, data) {

                                            $ionicLoading.hide();

                                            if (success) {

                                                //$scope.helpWindow('','Bienvenido a Laboru!! Esperamos que difrutes de nuestros servicios');
                                                $location.path('/app/selectaccounttype');
                                            } else {
                                                $scope.helpWindow('', 'Te has registrado pero no es posible acceder a tus Contactos para configurar la cuenta');
                                                $location.path('/app/selectaccounttype');
                                            }
                                        });

                                    } else {

                                        $ionicLoading.hide();
                                        //$scope.helpWindow('','Te has registrado pero no es posible acceder a tus Contactos para configurar la cuenta');
                                        $location.path('/app/selectaccounttype');

                                    }
                                }
                            }, 1000);

                        } else {

                            if ($rootScope.contacts) {

                                Expert.setContacts($rootScope.contacts, function (success, data) {

                                    $ionicLoading.hide();

                                    if (success) {

                                        //$scope.helpWindow('','Bienvenido a Laboru!! Esperamos que difrutes de nuestros servicios');
                                        $location.path('/app/selectaccounttype');
                                    } else {
                                        $scope.helpWindow('', 'Te has registrado pero no es posible acceder a tus Contactos para configurar la cuenta');
                                        $location.path('/app/selectaccounttype');
                                    }
                                });

                            } else {

                                $ionicLoading.hide();
                                $scope.helpWindow('', 'Te has registrado pero no es posible acceder a tus Contactos para configurar la cuenta');
                                $location.path('/app/selectaccounttype');

                            }
                        }

                    } else {
                        $ionicLoading.hide();
                        $scope.helpWindow('', 'Error creando tu cuenta, intenta de nuevo');
                    }

                });//Expert .register
                
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
