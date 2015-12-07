controllersModule.controller('WelcomeCtrl', function($scope, $rootScope, $location, Utility) {

    $scope.getLocalizedText = function(text){
        return Utility.getLocalizedStringValue(text);
    }

    $scope.continue = function(){

        $location.path('/app/setupname');
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
                        bio : "I am Pro Business Manager",
                        skills: ["Project Manager","Developer"]
                    }
                };

                $location.path('/app/menu/tabs/news');
            }
        }
    }

    $scope.initialize();
});
