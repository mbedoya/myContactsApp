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
            return $rootScope.profile.personalInfo.firstName + " " + $rootScope.profile.personalInfo.lastName;
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

            $rootScope.configuration = { serverIP : 'http://localhost:57565' };

            language = JSON.parse(lang);
            $rootScope.languageDefinitions = language;

            //Set Empty Profile
            $rootScope.profile = {
                personalInfo :
                {
                    id: null,
                    firstName: "",
                    lastName: "",
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
                            firstName: localStorage.firstName,
                            lastName: localStorage.lastName,
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
            firstName: $rootScope.profile.personalInfo.firstName,
            lastName: $rootScope.profile.personalInfo.lastName
        }

        $scope.getLocalizedText = function(text){
            return Utility.getLocalizedStringValue(text);
        }

        $scope.continue = function(){

            localStorage.firstName = $scope.model.firstName;
            localStorage.lastName = $scope.model.lastName;

            $rootScope.profile.personalInfo.firstName = localStorage.firstName;
            $rootScope.profile.personalInfo.lastName = localStorage.lastName;

            $location.path('/app/setupmobile');
        }
    })

    .controller('SetupMobileCtrl', function($scope, $rootScope, $location, $ionicLoading, Expert, Utility) {

        $scope.model = { country:"57"};

        //Existe un método en el rootscope para esto, sin embargo,
        //por ser la primera página algunas veces no está disponible
        $scope.mostrarAyuda = function(titulo, mensaje) {
            var alertPopup = $ionicPopup.alert({
                title: "",
                template: mensaje
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
                        fields = ["displayName", "name"];

                        navigator.contacts.find(fields, function(contacts){

                            Expert.setContacts(contacts, function(success, data){
                                if(success){

                                    $rootScope.helpWindow('','Bienvenido a Laboru');

                                    $location.path('/app/menu/tabs/news');
                                }else{
                                    $ionicLoading.hide();
                                    $rootScope.helpWindow('','Error configurando tu cuenta');
                                }

                            });

                        }, function(contactError){
                            $ionicLoading.hide();
                            $rootScope.helpWindow('','Error obteniendo Contactos');
                        }, options);
                    }else{
                        $rootScope.helpWindow('','Error configurando tu cuenta');
                    }

                }else{
                    $rootScope.helpWindow('','Error registrando numero');
                }

            });

        }
    })

    .controller('TabsCtrl', function($scope, $rootScope) {

    })

    .controller('NewsCtrl', function($scope, $rootScope) {

    })

    .controller('ExpertsCtrl', function($scope, $rootScope, $location) {

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
