controllersModule.controller('MobileConfirmationCtrl', function($scope, $rootScope, $location, $ionicPopup, $ionicLoading, Expert, Utility) {

    $scope.helpWindow = function(title, message) {
        var popup = $ionicPopup.alert({
            title: "",
            template: message
        });
    };

    $scope.sendingSMS = function(){
        return $scope.waitingForSmsToBeSent;
    }

    $scope.receivingSMS = function(){
        return $scope.waitingForSms;
    }

    $scope.showSMSError = function(){
        return $scope.smsError;
    }

    $scope.initialize = function(){

        Utility.trackPage("Mobile Confirmation");

        $scope.waitingForSmsToBeSent = false;
        $scope.waitingForSms = false;
        $scope.smsError = false;

        try{
            if(sms) {

                $scope.waitingForSmsToBeSent = true;

                //CONFIGURATION
                var options = {
                    replaceLineBreaks: false, // true to replace \n by a new line, false by default
                    android: {
                        //intent: 'INTENT'  // send SMS with the native android SMS messaging
                        intent: '' // send SMS without open any other app
                    }
                };

                var success = function () {
                    $scope.waitingForSmsToBeSent = false;
                    $scope.waitingForSms = true;

                    $scope.$apply();

                    Expert.register(function(success, data){

                        if(success){

                            localStorage.mobile = $rootScope.profile.personalInfo.mobile;
                            localStorage.id = data.ID;

                            $rootScope.profile.personalInfo.id = data.ID;

                            if(!$rootScope.contactsSearchDone){

                                //Waiting for the contacts to be found
                                $scope.interval = setInterval(function(){
                                    if($rootScope.contactsSearchDone){

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

                };

                var error = function (e) {
                    $scope.helpWindow("", "Lo sentimos, se ha presentado en error enviando el SMS para verificar tu número");
                    $scope.smsError = true;
                };

                console.log("About to send message to " + $rootScope.profile.personalInfo.mobile);
                sms.send('+573004802278' , 'Bienvenido a Laboru!' + $rootScope.profile.personalInfo.mobile, options, success, error);
                $scope.waitingForSmsToBeSent = true;

            }else {
                $scope.helpWindow("", "Lo sentimos, no es posible enviar SMS para verificar tu número");
                $scope.smsError = true;
            }

        }catch(err){
            $scope.helpWindow("", "Lo sentimos, no es posible verificar tu número");
            $scope.smsError = true;
        }
    }

    $scope.initialize();

});

