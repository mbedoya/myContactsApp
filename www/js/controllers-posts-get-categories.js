
controllersModule.controller('PostsGetCategoriesCtrl', function($scope, $rootScope, $location, $ionicPopup, $ionicLoading, Expert, Utility) {

    $scope.helpWindow = function(title, message) {
        var popup = $ionicPopup.alert({
            title: "",
            template: message
        });
    };

    $scope.filterSkills = function(value, index, ar){
        return value.Name.toLowerCase().indexOf($scope.filterText) >= 0;
    }

    $scope.showChildren = function(skill){
        if($scope.showThis(skill)){
            $scope.hideChildren(skill);
        }else{
            console.log("Displaying " + skill);
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

    $scope.checkSkill = function(skill){
        var skillChecked = $scope.skillRecommendedIndex(skill.ID) > -1;
        return skillChecked;
    }

    function findSkill(element, index, array, arg) {
        console.log(arg);
        return element.ID == arg;
    }

    $scope.skillRecommended = function(skill){
        if($rootScope.postsCategories){
            for(i=0;i<$rootScope.postsCategories.length; i=i+1){
                if($rootScope.postsCategories[i] == skill){
                    return true;
                }
            }
            return false;
        }
        return false;
    }

    $scope.skillRecommendedIndex = function(skill){
        if($rootScope.postsCategories){
            for(i=0;i<$rootScope.postsCategories.length; i=i+1){
                if($rootScope.postsCategories[i] == skill){
                    return i;
                }
            }
            return -1;
        }
        return -1;
    }

    $scope.$on('$ionicView.beforeEnter', function(){

    });

    $scope.initialize = function(){
        $scope.displayedSkills = new Array();
        $scope.model = { description: '' }
        $scope.parentSkills = Utility.getParentCategories();

        //Open Parent Categories
        var i=0;
        while(i<$rootScope.postsCategories.length){
            var categoryName = Utility.getCategoryByID($rootScope.postsCategories[i]);
            var categoryToDisplay = Utility.getParentCategory(categoryName.Name);
            console.log(categoryToDisplay);
            if(!$scope.showThis(categoryToDisplay)){
                $scope.showChildren(categoryToDisplay);
            }
            i++;
        }
    }

    $scope.initialize();

    $scope.recommend = function(skill){

    }

});
