controllersModule.controller('ContactRecommendationCtrl', function($scope, $rootScope, $location, $ionicPopup, $ionicLoading, Expert, Utility) {

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

    $scope.initialize = function(){
        $scope.displayedSkills = new Array();
        $scope.model = { description: '' }
        $scope.parentSkills = Utility.getParentCategories();
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
        if($scope.myRecommendations){
            for(i=0;i<$scope.myRecommendations.length; i=i+1){
                if($scope.myRecommendations[i].ID == skill){
                    return true;
                }
            }
            return false;
        }
        return false;
    }

    $scope.skillRecommendedIndex = function(skill){
        if($scope.myRecommendations){
            for(i=0;i<$scope.myRecommendations.length; i=i+1){
                if($scope.myRecommendations[i].ID == skill){
                    return i;
                }
            }
            return -1;
        }
        return -1;
    }

    $scope.$on('$ionicView.beforeEnter', function(){

        $scope.loading =  $ionicLoading.show({
            template: Utility.getLoadingTemplate("Cargando Recomendaciones")
        });

        Expert.getAllSkills($rootScope.selectedContact.ID, function(success, data){

            $ionicLoading.hide();

            if(success){
                $scope.mySkills = data;
            }else{
                $scope.helpWindow('','No hemos cargar las recomendaciones');
            }
        });

        Expert.getRecommendationsByExpert($rootScope.selectedContact.ID, function(success, data){

            $ionicLoading.hide();

            if(success){
                $scope.myRecommendations = data;

                console.log(data);
                console.log($scope.myRecommendations.length);

                //Open Parent Categories
                var i=0;
                while(i<$scope.myRecommendations.length){
                    var categoryName = Utility.getCategoryByID($scope.myRecommendations[i].ID);
                    var categoryToDisplay = Utility.getParentCategory(categoryName.Name);
                    console.log(categoryToDisplay);
                    if(!$scope.showThis(categoryToDisplay)){
                        $scope.showChildren(categoryToDisplay);
                    }
                    console.log(categoryToDisplay + " done");
                    i++;
                }

                $scope.$apply();

            }else{
                $scope.helpWindow('','No hemos cargar las recomendaciones');
            }
        });

    });

    $scope.initialize();

    $scope.contactName = function(){
        return $rootScope.selectedContact.displayName;
    }

    $scope.recommend = function(skill){

        //Remove Skill?
        if($scope.skillRecommended(skill)){

            $scope.loading =  $ionicLoading.show({
                template: Utility.getLoadingTemplate("Eliminando recomendación")
            });

            Expert.deleteRecommendation($rootScope.selectedContact.ID, skill, function(success, data){

                $ionicLoading.hide();

                if(success){

                    $rootScope.reloadContact = true;
                    $rootScope.reloadMyRecommendations = true;
                    $scope.myRecommendations.splice($scope.skillRecommendedIndex(skill), 1);

                    $scope.helpWindow('','Recomendación eliminada');

                }else{

                    $scope.helpWindow('','No hemos podido enviar la recomendación');

                }
            });

        }else{

            $scope.loading =  $ionicLoading.show({
                template: Utility.getLoadingTemplate("Recomendando a tu Amigo")
            });

            Expert.recommendExpert($rootScope.selectedContact.ID, skill, function(success, data){

                $ionicLoading.hide();

                if(success){

                    $rootScope.reloadContact = true;
                    $rootScope.reloadMyRecommendations = true;
                    $scope.myRecommendations.push({ID: skill});

                    $scope.helpWindow('','Recomendación realizada');

                }else{

                    $scope.helpWindow('','No hemos podido enviar la recomendación');

                }
            });

        }

    }

    $scope.addSkill = function(){

        $location.path('/app/menu/contact-addskill');
        /*
        if($rootScope.fromMyContacts){
            $location.path('/app/menu/contact-addskill');
        }else{
            $location.path('/app/menu/tabs/expertcontact-addskill');
        }
        */
    }

});
