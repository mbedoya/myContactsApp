controllersModule.controller('ProfileCategoriesCtrl', function($scope, $rootScope, $location, $ionicHistory, $ionicPopup, $ionicLoading, Skills, Utility, Expert) {

    $scope.filterSkills = function(value, index, ar){
        return value.Name.toLowerCase().indexOf($scope.filterText) >= 0;
    }

    $scope.showChildren = function(skill){
        if($scope.showThis(skill)){
            $scope.hideChildren(skill);
        }else{
            $scope.displayedSkills.push(skill);
        }
    }

    $scope.hideChildren = function(skill){
        var skillIndex = $scope.displayedSkills.indexOf(skill);
        $scope.displayedSkills.splice(skillIndex);
    }

    $scope.showThis = function(skill){

        var skillFound = false;
        for(var i=0; i<$scope.displayedSkills.length; i++){
            if($scope.displayedSkills[i] == skill){
                skillFound = true;
                break;
            }
        }

        return skillFound;
    }

    $scope.getChildSkills = function(parentSkill){
        $scope.filterText = parentSkill.toLowerCase();
        return $rootScope.skills.filter($scope.filterSkills);
    }

    $scope.initialize = function(){

        $scope.displayedSkills = new Array();
        $scope.selectedSkills = new Array();
        $scope.model = { description: '' }
        $scope.parentSkills = Utility.getParentCategories();
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

    $scope.skillSelectedIndex = function(skillID){

        var skillIndex = -1;
        for(var i=0; i<$scope.selectedSkills.length; i++){
            if($scope.selectedSkills[i].ID == skillID){
                skillIndex = i;
                break;
            }
        }

        return skillIndex;
    }

    $scope.toggleSkill = function(skillID){
        var skillIndex = $scope.skillSelectedIndex(skillID);
        if(skillIndex > -1){
            $scope.selectedSkills.splice(skillIndex,1);
        }else{
            $scope.selectedSkills.push({ ID:skillID } );
        }
    }

    $scope.continue = function(){

        $ionicHistory.nextViewOptions({
            historyRoot: true
        });

        $rootScope.xPerSkills = $scope.selectedSkills;

        console.log($rootScope.xPerSkills);

        $scope.loading =  $ionicLoading.show({
            template: Utility.getLoadingTemplate('Actualizando tu Perfil')
        });

        Expert.updateProfile(function(success, data) {

            $ionicLoading.hide();

            if (success) {
                localStorage.xPerProfileDone = true;
                $scope.helpWindow("", "Tu Perfil de xPer está listo! Disfruta de nuestra App");

                $location.path('/app/menu/tabs/news');

            }else{

                $scope.helpWindow("", "Se ha presentado un error actualizando tu Perfil");

            }
        });


    }

});

