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

                    try{

                        window.plugins.sms.isSupported (function(supported) {
                            if(supported){

                                window.plugins.sms.startReception (function(msg) {
                                    alert(msg);
                                    window.plugins.sms.stopReception  (function() {

                                    }, function() {

                                    });
                                }, function() {
                                    $scope.helpWindow("", "Lo sentimos, se ha presentado en error recibiendo SMS");
                                    window.plugins.sms.stopReception  (function() {

                                    }, function() {

                                    });
                                });

                            }else{
                                $scope.smsError = true;
                                $scope.helpWindow("", "Lo sentimos, se ha presentado en error en el soporte de SMS");
                            }
                        }, function() {
                            $scope.smsError = true;
                            $scope.helpWindow("", "Lo sentimos, se ha presentado en error verificando recepción de SMS");
                        });

                    }catch (err){
                        $scope.helpWindow("", err.message);
                    }

                };
                var error = function (e) {
                    $scope.helpWindow("", "Lo sentimos, se ha presentado en error enviando el SMS para verificar tu número");
                    $scope.smsError = true;
                };

                console.log("About to send message to " + $rootScope.profile.personalInfo.mobile);
                sms.send('+' + $rootScope.profile.personalInfo.mobile, 'Bienvenido a Laboru!', options, success, error);
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

