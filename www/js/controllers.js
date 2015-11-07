angular.module('laboru.controllers', [])

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

            //$rootScope.configuration = { serverIP : 'http://mungos.co:8083' };
            $rootScope.configuration = { serverIP : 'http://localhost:57565' };

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

        $scope.model = { country:"57"};

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

            $rootScope.profile.personalInfo.mobile = $scope.model.country + $scope.model.number;

            $scope.loading =  $ionicLoading.show({
                template: Utility.getLoadingTemplate(Utility.getLocalizedStringValue('waitingConfirmation'))
            });

            Expert.register(function(success, data){

                $ionicLoading.hide();

                if(success){

                    localStorage.mobile = $rootScope.profile.personalInfo.mobile;
                    localStorage.id = data.ID;
                    $rootScope.profile.personalInfo.id = data.ID;

                    $scope.loading =  $ionicLoading.show({
                        template: Utility.getLoadingTemplate('Configurando tu cuenta')
                    });

                    if(navigator.contacts){
                        // find all contacts with 'Bob' in any name field
                        options      = new ContactFindOptions();
                        options.filter   = "";
                        options.multiple = true;
                        fields = ["displayName"];

                        navigator.contacts.find(fields, function(contacts){

                            Expert.setContacts(contacts, function(success, data){

                                $ionicLoading.hide();

                                if(success){

                                    $scope.helpWindow('','Bienvenido a Laboru');
                                    $location.path('/app/menu/tabs/news');
                                }else{
                                    $scope.helpWindow('','Error configurando tu cuenta');
                                }

                            });

                        }, function(contactError){
                            $ionicLoading.hide();
                            $scope.helpWindow('','Error obteniendo tus Contactos');
                        }, options);
                    }else{
                        $ionicLoading.hide();
                        $scope.helpWindow('','Te has registrado pero no es posible acceder a tus Contactos para configurar la cuenta');
                        $location.path('/app/menu/tabs/news');
                    }

                }else{
                    $scope.helpWindow('','Error registrando numero');
                }

            });

        }
    })

    .controller('TabsCtrl', function($scope, $rootScope, Utility) {

        $scope.getLocalizedText = function(text){
            return Utility.getLocalizedStringValue(text);
        }

    })

    .controller('NewsCtrl', function($scope, $rootScope, $ionicPopup, $ionicLoading, Skills, Utility) {

        $scope.helpWindow = function(title, message) {
            var popup = $ionicPopup.alert({
                title: "",
                template: message
            });
        };

        $scope.initialize = function(){

            $scope.loading =  $ionicLoading.show({
                template: Utility.getLoadingTemplate(Utility.getLocalizedStringValue('initializing'))
            });

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

    })

    .controller('ExpertsCtrl', function($scope, $rootScope, $ionicLoading, $location, Utility) {

        $scope.initialize = function(){

            $scope.filteredSkills = new Array();
            $scope.selectedSkills = new Array();

        }

        $scope.initialize();

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

            setTimeout(function(){
                $ionicLoading.hide();
                $scope.showExperts = true;

            }, 1500);
        }

        $scope.getLocalizedText = function(text){
            return Utility.getLocalizedStringValue(text);
        }

        $scope.viewContact = function(name){
            $rootScope.selectedContact = {displayName: name};
            $location.path('/app/menu/tabs/expertcontact');
        }

    })

    .controller('ContactCtrl', function($scope, $rootScope) {

        $scope.contactName = function(){
            return $rootScope.selectedContact.displayName;
        }
    })

    .controller('ContactRecommendationCtrl', function($scope, $rootScope) {

        $scope.contactName = function(){
            return $rootScope.selectedContact.displayName;
        }

    })

    .controller('ContactsCtrl', function($scope, $rootScope, $ionicLoading, $location) {

        $scope.model = { name: null};

        $scope.viewContact = function(index){
            $rootScope.selectedContact = $scope.results[index];
            $location.path('/app/menu/tabs/contact');
        }

        $scope.search = function(){

            try {
                if(navigator.contacts){
                    // find all contacts with 'Bob' in any name field
                    options      = new ContactFindOptions();
                    options.filter   = $scope.model.name;
                    options.multiple = true;
                    fields = ["displayName", "name"];

                    $scope.loading =  $ionicLoading.show({
                        template: 'Finding Contacts'
                    });

                    navigator.contacts.find(fields, function(contacts){
                        $scope.results = contacts;

                        $ionicLoading.hide();

                        $scope.$apply();

                    }, function(contactError){
                        $ionicLoading.hide();
                        alert("Error finding contacts");
                    }, options);
                }
            } catch (error) {
                alert(error.message);
            }


        }

    })

    .controller('PlaylistCtrl', function($scope, $stateParams) {
    });
