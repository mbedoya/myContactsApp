controllersModule.controller('MobileConfirmationCtrl', function ($scope, $rootScope, $location, $ionicHistory, $ionicPopup, $ionicLoading, Expert, Utility) {

    $scope.helpWindow = function (title, message) {
        var popup = $ionicPopup.alert({
            title: "",
            template: message
        });
    };

    $scope.sendingSMS = function () {
        return $scope.waitingForSmsToBeSent;
    }

    $scope.searchingForAccountMethod = function () {
        return $scope.searchingForAccount;
    }

    $scope.showSMSError = function () {
        return $scope.smsError;
    }

    $scope.smsSentSuccess = function () {

        $scope.waitingForSmsToBeSent = false;
        $scope.searchingForAccount = true;

        $scope.$apply();

        //Set From ExpertID because it is mandatory
        $rootScope.profile.personalInfo.id = 2;

        //Look for Mobile, if is created already then, do not register again
        Expert.getByMobile($rootScope.profile.personalInfo.mobile, "", function (success, data) {

            if (success) {

                //Get Expert Data from Results
                localStorage.id = data.ID;
                localStorage.name = data.Name;
                localStorage.description = data.Bio;
                localStorage.mobile = $rootScope.profile.personalInfo.mobile;

                tempSkills = new Array();
                for (i = 0; i < data.Skills.length; i++) {
                    tempSkills.push(data.Skills[0].ID);
                }
                localStorage.skills = tempSkills.join('-');

                //Set Expert Data
                $rootScope.profile = {
                    personalInfo:
                    {
                        id: localStorage.id,
                        name: localStorage.name,
                        mobile: localStorage.mobile
                    },
                    businessInfo:
                    {
                        bio: localStorage.description,
                        skills: ["Project Manager", "Developer"]
                    }
                };

                $rootScope.xPerDescription = localStorage.description;

                if (localStorage.skills) {
                    $rootScope.xPerSkills = localStorage.skills.split('-');
                }

                $ionicHistory.nextViewOptions({
                    historyRoot: true
                });    

                localStorage.mobileVerified = true;
                localStorage.userType = 'user';
                $location.path('/app/menu/userhome');

                $scope.helpWindow('', 'Bienvenido de nuevo a Laboru! Esperamos que sigas disfrutando de nuestra App');

            } else {

                $ionicHistory.nextViewOptions({
                    historyRoot: true
                });

                $scope.helpWindow('', 'Bienvenido de nuevo a Laboru! Esperamos que sigas disfrutando de nuestra App');
                
                $location.path('/app/setupname');

            } //Expert not found

        });//Expert get By Mobile  

    }

    $scope.initialize = function () {

        Utility.trackPage("Mobile Confirmation");

        $scope.waitingForSmsToBeSent = false;
        $scope.searchingForAccount = false;
        $scope.smsError = false;

        try {
            if (sms) {

                $scope.waitingForSmsToBeSent = true;

                //CONFIGURATION
                var options = {
                    replaceLineBreaks: false, // true to replace \n by a new line, false by default
                    android: {
                        //intent: 'INTENT'  // send SMS with the native android SMS messaging
                        intent: '' // send SMS without open any other app
                    }
                };

                var error = function (e) {
                    $scope.helpWindow("", "Lo sentimos, se ha presentado en error enviando el SMS para verificar tu número");
                    $scope.smsError = true;
                };

                console.log("About to send message to " + $rootScope.profile.personalInfo.mobile);
                sms.send('+573004802278', 'Bienvenido a Laboru! ' + $rootScope.profile.personalInfo.mobile, options, $scope.smsSentSuccess, error);
                $scope.waitingForSmsToBeSent = true;

            } else {
                $scope.helpWindow("", "Lo sentimos, no es posible enviar SMS para verificar tu número");
                $scope.smsError = true;
            }

        } catch (err) {
            $scope.helpWindow("", "Lo sentimos, no es posible verificar tu número, no podemos enviarte mensaje de texto");
            console.log(err.message);
            //$scope.smsError = true;

            $scope.smsSentSuccess();
        }
    }

    $scope.initialize();

});

