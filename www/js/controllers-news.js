controllersModule.controller('NewsCtrl', function($scope, $rootScope, $ionicPopup, $ionicLoading, Skills, Utility) {

    $scope.helpWindow = function(title, message) {
        var popup = $ionicPopup.alert({
            title: "",
            template: message
        });
    };

    $scope.initialize = function(){

        //Get Contacts if not yet
        if(!$rootScope.contacts && navigator.contacts){
            // find all contacts with 'Bob' in any name field
            options      = new ContactFindOptions();
            options.filter   = "";
            options.multiple = true;
            options.hasPhoneNumber = true;
            fields = ["displayName"];

            navigator.contacts.find(fields, function(contacts){
                $rootScope.contacts = contacts;

            }, function(contactError){

            }, options);
        }else{
            $rootScope.contacts = new Array();
            $rootScope.contacts.push({ displayName: 'Andres Bustamante', phoneNumbers: [{value:'3004802276'}]});
            $rootScope.contacts.push({ displayName: 'Cindi Cano'});
            $rootScope.contacts.push({ displayName: 'Alejandro Diaz', phoneNumbers: [{value:'3006131422'}]});
        }

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
