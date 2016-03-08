controllersModule.controller('ProfileCategoriesCtrl', function($scope, $rootScope, $location, $ionicPopup, $ionicLoading, Skills, Utility) {

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

    $scope.continue = function(){
        $location.path('/app/menu/tabs/news');
    }

});

