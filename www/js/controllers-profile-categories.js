controllersModule.controller('ProfileCategoriesCtrl', function($scope, $rootScope, $location, $ionicHistory, $ionicPopup, $ionicLoading, Skills, Utility) {

    $scope.getParentSkills = function(){

        for(i=0; i< $rootScope.skills.length; i++ ){
            var parentFound = false;
            source = $rootScope.skills[i];
            for(j = 0; j < $scope.parentSkills.length; j++){
                if (source.Name.split('/')[0] == $scope.parentSkills[j]){
                    parentFound = true;
                    break;
                }
            }
            if(!parentFound){
                $scope.parentSkills.push(source.Name.split('/')[0]);
            }
        }
    }

    $scope.initialize = function(){

        $scope.model = { description: '' }
        $scope.parentSkills = new Array();
        $scope.getParentSkills();

    }

    $scope.initialize();

    $scope.getLocalizedText = function(text){
        return Utility.getLocalizedStringValue(text);
    }

    $scope.helpWindow = function(title, message) {
        var popup = $ionicPopup.alert({
            title: "",
            template: message
        });
    };

    $scope.continue = function(){

        $ionicHistory.nextViewOptions({
            historyRoot: true
        });

        localStorage.xPerProfileDone = true;

        $scope.helpWindow("", "Tu Perfil de xPer está listo! Disfruta de nuestra App")

        $location.path('/app/menu/tabs/news');
    }

});

