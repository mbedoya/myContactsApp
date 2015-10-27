angular.module('starter.controllers', [])

    .controller('AppCtrl', function($scope, $ionicModal, $timeout) {

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
    })

    .controller('PlaylistsCtrl', function($scope) {

        $scope.playlists = [
            { title: 'Reggae', id: 1 },
            { title: 'Chill', id: 2 },
            { title: 'Dubstep', id: 3 },
            { title: 'Indie', id: 4 },
            { title: 'Rap', id: 5 },
            { title: 'Cowbell', id: 6 }
        ];
    })
    
    .controller('WelcomeCtrl', function($scope, $location) {
        $scope.continue = function(){
            $location.path('/app/setupname');
        }

        $scope.initialize = function(){
            language = JSON.parse(lang);
            console.log(language);

            if(navigator && navigator.globalization){
                navigator.globalization.getPreferredLanguage(
                    function (language) {alert('language: ' + language.value + '\n');},
                    function () {alert('Error getting language\n');}
                );
            }
        }

        $scope.initialize();
    })

    .controller('SetupNameCtrl', function($scope, $location) {
        $scope.continue = function(){
            $location.path('/app/setupmobile');
        }
    })

    .controller('SetupMobileCtrl', function($scope, $location, $ionicLoading) {
        $scope.continue = function(){

            $scope.loading =  $ionicLoading.show({
                template: 'Waiting for number confirmation'
            });
            setTimeout(function(){
                $ionicLoading.hide();
                $location.path('/app/menu/tabs/news');
            }, 2000);

        }
    })

    .controller('TabsCtrl', function($scope, $rootScope) {

    })

    .controller('NewsCtrl', function($scope, $rootScope) {

    })

    .controller('ExpertsCtrl', function($scope, $rootScope, $location) {

        $scope.viewContact = function(name){
            $rootScope.selectedContact = {displayName: name};
            $location.path('/app/menu/tabs/contact');
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
                if(ContactFindOptions){
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
