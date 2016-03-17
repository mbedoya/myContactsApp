controllersModule.controller('WelcomeCtrl', function($scope, $rootScope, $location, $ionicHistory, $ionicLoading, Utility, Skills) {

    $scope.getLocalizedText = function(text){
        return Utility.getLocalizedStringValue(text);
    }

    $scope.continue = function(){

        $ionicHistory.nextViewOptions({
            historyRoot: true
        });
        $location.path('/app/setupname');
    }

    $scope.showContinue = function(){
        if(localStorage && localStorage.mobile){
            return false;
        }
        return true;
    }

    $scope.initialize = function(){

        localDB = new database_js();
        localDB.initialize();

        $rootScope.configuration = { serverIP : 'http://mungos.co:8083', localDB: localDB };
        //$rootScope.configuration = { serverIP : 'http://localhost:57565', localDB: localDB };

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
                        bio : localStorage.description,
                        skills: ["Project Manager","Developer"]
                    }
                };

                if(localStorage.skills){
                    $rootScope.xPerSkills = localStorage.skills.split('-');
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

                    $ionicHistory.nextViewOptions({
                        historyRoot: true
                    });

                    if(localStorage.userType == 'xper'){
                        if(localStorage.xPerProfileDone){
                            $location.path('/app/menu/tabs/news');
                        }else{
                            $location.path('/app/profiledescription');
                        }
                    }else{
                        $location.path('/app/menu/userhome');
                    }
                });


            }
        }
    }

    $scope.initialize();
});
