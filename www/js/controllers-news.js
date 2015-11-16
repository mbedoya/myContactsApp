controllersModule.controller('NewsCtrl', function($scope, $rootScope, $ionicPopup, $ionicLoading, Skills, Utility) {

    $scope.helpWindow = function(title, message) {
        var popup = $ionicPopup.alert({
            title: "",
            template: message
        });
    };

    $scope.initialize = function(){

        setTimeout(function(){

            //Get Contacts if not yet
            if(!$rootScope.contacts && navigator.contacts){
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

                }, function(contactError){

                }, options);
            }else{

                if(!$rootScope.contacts){
                    $rootScope.contacts = new Array();
                    $rootScope.contacts.push({ displayName: 'Andres Bustamante', phoneNumbers: [{value:'3004802276'}]});
                    $rootScope.contacts.push({ displayName: 'Cindi Cano'});
                    $rootScope.contacts.push({ displayName: 'Alejandro Diaz', phoneNumbers: [{value:'3006131422'}]});
                }
            }

        }, 5000);

        $scope.loading =  $ionicLoading.show({
            template: Utility.getLoadingTemplate(Utility.getLocalizedStringValue('initializing'))
        });

        //Get All Skills
        Skills.getAll(function(success, data) {

            $ionicLoading.hide();

            if (success) {

                $rootScope.skills = data;

            }else{
                $scope.helpWindow("","Error inicializando");
            }
        });

    }

    $scope.initialize();

    $scope.getLocalizedText = function(text){
        return Utility.getLocalizedStringValue(text);
    }

    $scope.gotoProfile = function(){

    }

});
