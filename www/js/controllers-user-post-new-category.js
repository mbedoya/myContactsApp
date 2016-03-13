controllersModule.controller('UserPostNewCategoryCtrl', function($scope, $rootScope, $location, $ionicHistory, $ionicPopup, $ionicLoading, Skills, Utility) {

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
        $scope.model = { category: '' }
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

    $scope.continue = function(){
        $rootScope.newPostSkill = $scope.model.category;
        $location.path('/app/menu/userpostnewtitle');
    }

});

