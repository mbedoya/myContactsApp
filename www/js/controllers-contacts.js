controllersModule.controller('ContactsCtrl', function($scope, $rootScope, $ionicLoading, $location, $ionicScrollDelegate, Expert, Utility) {

    $scope.getLocalizedText = function(text){
        return Utility.getLocalizedStringValue(text);
    }

    $scope.initialize = function(){

        $scope.model = { name: null};

        console.log($rootScope.contacts);

        $scope.loading =  $ionicLoading.show({
            template: Utility.getLoadingTemplate('Inicializando Contactos')
        });

        Expert.getMyRecommendations(function(success, data) {

            $ionicLoading.hide();

            if (success) {
                $scope.myRecommendations = data;
            }else{
                $scope.helpWindow("","Error inicializando contactos");
            }

            $scope.filteredContacts = $rootScope.contacts;

        });
    }

    $scope.initialize();

    $scope.getContactStyle = function(mobile){
        if($scope.contactRecommended(mobile)){
            return "inverted";
        }else{
            return "";
        }
    }

    $scope.$on('$ionicView.beforeEnter', function(){

        if($rootScope.reloadMyRecommendations){
            $scope.loading =  $ionicLoading.show({
                template: Utility.getLoadingTemplate('Buscando Recomendaciones')
            });

            Expert.getMyRecommendations(function(success, data) {

                $ionicLoading.hide();

                if (success) {
                    $scope.myRecommendations = data;
                }else {
                    $scope.helpWindow("", "Error Buscando Recomendaciones");
                }
            });
        }

    });

    $scope.clear = function(){
        $scope.data.search = "";
        $scope.filteredContacts = $rootScope.contacts;
    }

    $scope.filterContact = function(value, index, ar){
        return value.Name.toLowerCase().indexOf($scope.data.search.toLowerCase()) >= 0;
    }

    $scope.searchName = function(){

        if($rootScope.contacts && $scope.data.search && String($scope.data.search).length >= 3){
            $scope.filteredContacts = $rootScope.contacts.filter($scope.filterContact);
        }else{
            if($rootScope.contacts && $scope.data.search && String($scope.data.search).length > 0){
                $scope.filteredContacts = new Array();
            }else{
                $scope.filteredContacts = $rootScope.contacts;
            }
        }

        $ionicScrollDelegate.scrollTop();
    }

    $scope.contactRecommended = function(mobile){
        mobile = Utility.formatMobileNumber(mobile);
        contactFound = false;
        if($scope.myRecommendations){
            for(i=0;i<$scope.myRecommendations.length;i++){
                if($scope.myRecommendations[i].Name == mobile){
                    contactFound = true;
                    break;
                }
            }
        }
        return contactFound;
    }

    $scope.getContactSkills = function(mobile){
        mobile = Utility.formatMobileNumber(mobile);
        skills = new Array();
        if($scope.myRecommendations){
            for(i=0;i<$scope.myRecommendations.length;i++){
                if($scope.myRecommendations[i].Name == mobile){
                    skills.push($scope.myRecommendations[i].Value1);
                }
            }
        }

        return skills;

    }

    $scope.viewContact = function(name, mobile){

        $scope.loading =  $ionicLoading.show({
            template: Utility.getLoadingTemplate('Buscando a ' + name)
        });

        Expert.getByMobile(mobile, name, function(success, data) {

            $ionicLoading.hide();

            if (success) {

                $rootScope.reloadContact = false;
                $rootScope.selectedContact = data;
                $rootScope.selectedSkill = {ID: 0};
                $rootScope.fromMyContacts = true;
                $location.path('/app/menu/contact');

            }else{
                $scope.helpWindow("","Error Buscando Experto");
            }

        });
    }

    $scope.recommendContact = function(name, mobile){

        $scope.loading =  $ionicLoading.show({
            template: Utility.getLoadingTemplate('Buscando a ' + name)
        });

        Expert.getByMobile(mobile, name, function(success, data) {

            $ionicLoading.hide();

            if (success) {

                $rootScope.reloadContact = false;
                $rootScope.selectedContact = data;
                $rootScope.selectedSkill = {ID: 0};
                $rootScope.fromMyContacts = true;
                $rootScope.fromContactsList = true;
                $location.path('/app/menu/contact-recommendation');

            }else{
                $scope.helpWindow("","Error Buscando Experto");
            }

        });
    }

});
