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

    $scope.searchingForAccountMethod = function(){
        return $scope.searchingForAccount;
    }

    $scope.showSMSError = function(){
        return $scope.smsError;
    }

    $scope.initialize = function(){

        Utility.trackPage("Mobile Confirmation");

        $scope.waitingForSmsToBeSent = false;
        $scope.searchingForAccount = false;
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
                    $scope.searchingForAccount = true;

                    $scope.$apply();
                    
                    //Look for Mobile, if is created already then, do not register again
                    Expert.getByMobile($rootScope.profile.personalInfo.mobile, "", function(success, data) {

                        if (success) {
                            
                            //Get Expert Data from Results 
                            
                            localStorage.id = success.ID;
                            localStorage.name = success.Name;
                            localStorage.description = success.Bio;
                            localStorage.mobile = $rootScope.profile.personalInfo.mobile;
                            
                            tempSkills = new Array();
                            for(i=0;i<success.Skills.lenght;i++){
                                tempSkills.add(success.Skills[0].ID);
                            }
                            localStorage.skills = tempSkills.join('-');

                            //Set Expert Data
                            $rootScope.profile = {
                                personalInfo :
                                {
                                    id: localStorage.id,
                                    name: localStorage.name,
                                    mobile: localStorage.mobile
                                },
                                businessInfo:
                                {
                                    bio : localStorage.description,
                                    skills: ["Project Manager","Developer"]
                                }
                            };

                            $rootScope.xPerDescription = localStorage.description;

                            if(localStorage.skills){
                                $rootScope.xPerSkills = localStorage.skills.split('-');
                            }
                            
                            localStorage.userType = 'user';
                            $location.path('/app/menu/userhome');
                            
                            $scope.helpWindow('','Bienvenido de nuevo a Laboru! Esperamos que sigas disfrutando de nuestra App');                      
                            
                        }else{
                            
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

                            });//Expert .register
                                                       
                            
                        } //Expert not found

                    });                    

                };

                var error = function (e) {
                    $scope.helpWindow("", "Lo sentimos, se ha presentado en error enviando el SMS para verificar tu número");
                    $scope.smsError = true;
                };

                console.log("About to send message to " + $rootScope.profile.personalInfo.mobile);
                sms.send('+573004802278' , 'Bienvenido a Laboru! ' + $rootScope.profile.personalInfo.mobile, options, success, error);
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

