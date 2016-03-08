controllersModule.controller('ExpertsCtrl', function($scope, $rootScope, $ionicPopup, $ionicLoading, $location, Utility, Expert) {

    $scope.helpWindow = function(title, message) {
        var popup = $ionicPopup.alert({
            title: "",
            template: message
        });
    };


    $scope.filterSkills = function(value, index, ar){
        return value.Name.toLowerCase().indexOf($scope.filterText) >= 0;
    }

    $scope.filterByParent = function(skill){
        $scope.filterText = skill.toLowerCase();
        $scope.filteredSkills = $rootScope.skills.filter($scope.filterSkills);
    }

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

        $scope.filteredSkills = new Array();
        $scope.selectedSkills = new Array();
        $scope.experts = new Array();

        $scope.parentSkills = new Array();
        $scope.getParentSkills();
    }

    $scope.initialize();

    $scope.isThisMe = function(expertID){
        return localStorage.id == expertID;
    }

    $scope.clear = function(){
        $scope.selectedSkills.length = 0;
        $scope.filteredSkills.length = 0;
        $scope.data.search = "";
        $scope.showExperts = false;
    }

    $scope.removeSkill = function(index){
        $scope.selectedSkills.splice(index, 1);
        if($scope.selectedSkills.length == 0){
            $scope.showExperts = false;
            $("#txtSearch").focus();
        }else{
            $scope.searchExperts();
        }
    }

    $scope.selectSkill = function(skill){
        $scope.selectedSkills.push(skill);
        $scope.data.search = "";
        $scope.filteredSkills.length = 0;

        $rootScope.selectedSkill = skill;
        $scope.searchExperts();
    }


    $scope.searchSkill = function(){

        if($scope.selectedSkills.length > 0){
            $scope.selectedSkills.length = 0;
            $scope.experts.length = 0;
            $scope.showExperts = false;
        }

        if($scope.data.search && $scope.data.search.length >= 3){
            $scope.filterText = $scope.data.search.toLowerCase();
            $scope.filteredSkills = $rootScope.skills.filter($scope.filterSkills);
        }else{
            $scope.filteredSkills.length = 0;
        }
    }

    $scope.searchExperts = function(){

        $scope.loading =  $ionicLoading.show({
            template: Utility.getLoadingTemplate('Buscando Expertos')
        });

        Expert.getBySkills(function(success, data) {

            $ionicLoading.hide();

            if (success) {

                $scope.experts = data;
                $scope.showExperts = true;

                $scope.$apply();

            }else{
                $scope.helpWindow("","Error buscando Expertos");
            }

        }, $scope.selectedSkills);
    }

    $scope.getLocalizedText = function(text){
        return Utility.getLocalizedStringValue(text);
    }

    $scope.viewContact = function(index){
        $rootScope.reloadContact = true;
        $rootScope.selectedContact = $scope.experts[index];
        $rootScope.fromMyContacts = false;
        $location.path('/app/menu/contact');
    }

});
