var controllersModule =  angular.module('laboru.controllers', [])

    .controller('AppCtrl', function($scope, $rootScope, $ionicModal, $timeout) {

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
    })
    
    .controller('WelcomeCtrl', function($scope, $rootScope, $location, Utility) {

        $scope.getLocalizedText = function(text){
            return Utility.getLocalizedStringValue(text);
        }

        $scope.continue = function(){

            $location.path('/app/setupname');
        }

        $scope.initialize = function(){

            $rootScope.configuration = { serverIP : 'http://mungos.co:8083' };
            //$rootScope.configuration = { serverIP : 'http://localhost:57565' };

            language = JSON.parse(lang);
            $rootScope.languageDefinitions = language;

            //Set Empty Profile
            $rootScope.profile = {
                personalInfo :
                {
                    id: null,
                    name: "",
                    mobile: ""
                },
                businessInfo:
                {
                    bio : "",
                    skills: []
                }
            };

            if(localStorage){
                if(localStorage.mobile){

                    $rootScope.profile = {
                        personalInfo :
                        {
                            id: localStorage.id,
                            name: localStorage.name,
                            mobile: localStorage.mobile
                        },
                        businessInfo:
                        {
                            bio : "I am Pro Business Manager",
                            skills: ["Project Manager","Developer"]
                        }
                    };

                    $location.path('/app/menu/tabs/news');
                }
            }
        }

        $scope.initialize();
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

                    $scope.contactsSearchDone = true;
                    $rootScope.contacts = contacts;

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

    .controller('ExpertsCtrl', function($scope, $rootScope, $ionicPopup, $ionicLoading, $location, Utility, Expert) {

        $scope.helpWindow = function(title, message) {
            var popup = $ionicPopup.alert({
                title: "",
                template: message
            });
        };

        $scope.initialize = function(){

            $scope.filteredSkills = new Array();
            $scope.selectedSkills = new Array();
            $scope.experts = new Array();

        }

        $scope.initialize();

        $scope.isThisMe = function(expertID){
            return localStorage.id == expertID;
        }

        $scope.clear = function(){
            $scope.selectedSkills.length = 0;
            $scope.filteredSkills.length = 0;
            $scope.data.search = "";
            $scope.showExperts = false;
        }

        $scope.removeSkill = function(index){
            $scope.selectedSkills.splice(index, 1);
            if($scope.selectedSkills.length == 0){
                $scope.showExperts = false;
            }else{
                $scope.searchExperts();
            }
        }
        
        $scope.selectSkill = function(skill){
            $scope.selectedSkills.push(skill);
            $scope.data.search = "";
            $scope.filteredSkills.length = 0;

            $rootScope.selectedSkill = skill;
            $scope.searchExperts();
        }

        $scope.filterSkills = function(value, index, ar){
            return value.Name.toLowerCase().indexOf($scope.data.search.toLowerCase()) >= 0;
        }

        $scope.searchSkill = function(){
            if($scope.data.search && $scope.data.search.length >= 3){
                $scope.filteredSkills = $rootScope.skills.filter($scope.filterSkills);
            }else{
                $scope.filteredSkills.length = 0;
            }
        }
        $scope.searchExperts = function(){

            $scope.loading =  $ionicLoading.show({
                template: Utility.getLoadingTemplate('Buscando Expertos')
            });

            Expert.getBySkills(function(success, data) {

                $ionicLoading.hide();

                if (success) {

                    $scope.experts = data;

                    $scope.$apply();

                }else{
                    $scope.helpWindow("","Error busando Expertos");
                }

            }, $scope.selectedSkills);

            setTimeout(function(){
                $ionicLoading.hide();
                $scope.showExperts = true;

            }, 1500);
        }

        $scope.getLocalizedText = function(text){
            return Utility.getLocalizedStringValue(text);
        }

        $scope.viewContact = function(index){
            $rootScope.selectedContact = $scope.experts[index];
            $location.path('/app/menu/tabs/expertcontact');
        }

    })

    .controller('ContactCtrl', function($scope, $rootScope, $ionicPopup, $ionicLoading, $location, Utility, Expert) {

        $scope.contactName = function(){
            return $rootScope.selectedContact.Name;
        }

        $scope.contactBio = function(){
            return $rootScope.selectedContact.Bio;
        }

        $scope.contactSkills = function(){
            return $rootScope.selectedContact.Skills;
        }

        $scope.contactMobile = function(){
            return $scope.selectedContact.Mobile;
        }

        $scope.gotoRecommend = function(){
            $location.path('/app/menu/tabs/expertcontact-recommendation');
        }

        $scope.$on('$ionicView.beforeEnter', function(){

            $scope.loading =  $ionicLoading.show({
                template: Utility.getLoadingTemplate('Cargando a ' + $scope.contactName())
            });

            Expert.get($rootScope.selectedContact.ID, function(success, data) {

                $ionicLoading.hide();

                if (success) {
                    $rootScope.selectedContact = data;
                }
            });

            Expert.getRecommendationsBySkills($rootScope.selectedContact.ID, $rootScope.selectedSkill.ID, function(success, data) {

                $ionicLoading.hide();

                if (success) {
                    $scope.recommendations = data;
                }

            });


        });
    })

    .controller('ContactRecommendationCtrl', function($scope, $rootScope) {

        $scope.contactName = function(){
            return $rootScope.selectedContact.displayName;
        }

    })

    .controller('PlaylistCtrl', function($scope, $stateParams) {
    })

    ;
