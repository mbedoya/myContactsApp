controllersModule.controller('SetupNameCtrl', function ($scope, $rootScope, $location, $ionicPopup, $ionicHistory, $ionicLoading, Expert, Utility) {

    $scope.model = {
        name: $rootScope.profile.personalInfo.name
    }

    $scope.getLocalizedText = function (text) {
        return Utility.getLocalizedStringValue(text);
    }

    $scope.continue = function () {

        if (!$scope.model.name || String($scope.model.name).length == 0) {
            $scope.helpWindow("Inicio de sesión", "Ingresa tu Nombre");
            return;
        }

        if (String($scope.model.name).length < 10) {
            $scope.helpWindow("Inicio de sesión", "Ingresa mínimo 10 caracteres en tu Nombre");
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

});