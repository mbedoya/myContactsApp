var controllersModule =  angular.module('laboru.controllers', [])

        .controller('AppCtrl', function($scope, $rootScope, $location, $ionicModal, $timeout) {

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

            $scope.gotoProfile = function(){
                localStorage.profileVisited = true;
                $location.path('/app/menu/tabs/profile');
            }

            $scope.changeText = function(){
                if(localStorage.userType == 'xper'){
                    return "Usuario";
                }else{
                    return "xPer"
                }
            }

            $scope.changeAccountType = function(){
                if(localStorage.userType == 'xper'){
                    localStorage.userType = 'user';
                    $location.path('/app/menu/userhome');
                }else{
                    localStorage.userType = 'xper';
                    if(localStorage.xPerProfileDone){
                        $location.path('/app/menu/tabs/news');
                    }else{
                        $location.path('/app/profiledescription');
                    }
                }
            }
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

        .controller('TabsCtrl', function($scope, $rootScope, Utility) {

            $scope.getLocalizedText = function(text){
                return Utility.getLocalizedStringValue(text);
            }

        })



        .controller('PlaylistCtrl', function($scope, $stateParams) {
        })

    ;
