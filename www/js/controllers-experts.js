controllersModule.controller('ExpertsCtrl', function($scope, $rootScope, $ionicPopup, $ionicLoading, $location, $ionicScrollDelegate, Utility, Expert) {

    $scope.helpWindow = function(title, message) {
        var popup = $ionicPopup.alert({
            title: "",
            template: message
        });
    };

    $scope.filterSkills = function(value, index, ar){
        var result = value.Name.toLowerCase().indexOf($scope.filterText) >= 0;
        return result;
    }

    $scope.filterByParent = function(skill){

        $scope.parentName = skill;
        $scope.filterText = skill.toLowerCase();
        $scope.filteredSkills = $rootScope.skills.filter($scope.filterSkills);
        $scope.fiteringByParent = true;

        if($scope.filteredSkills.length == 1){
            console.log("selecting skill");
            $scope.selectSkill($scope.filteredSkills[0]);
        }

        $ionicScrollDelegate.scrollTop();
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

        Utility.trackPage("Buscador xPers");

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
        $scope.fiteringByParent = false;
        $scope.selectedSkills.length = 0;
        $scope.filteredSkills.length = 0;
        $scope.experts.length = 0;
        $scope.data.search = "";
        $scope.showExperts = false;
    }

    $scope.removeSkill = function(index){
        $scope.selectedSkills.splice(index, 1);
        $scope.filteredSkills.length = 0;
        $scope.experts.length = 0;
        if($scope.selectedSkills.length == 0){
            $scope.showExperts = false;
            $("#txtSearch").focus();
        }else{
            $scope.searchExperts();
        }
    }

    $scope.selectSkill = function(skill){
        $scope.fiteringByParent = false;
        $scope.selectedSkills.push(skill);
        $scope.data = {search:''};
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

        $rootScope.showLoadingIndicator = true;

        Expert.getBySkills(function(success, data) {

            $rootScope.showLoadingIndicator = false;

            if (success) {

                $scope.experts = data;
                $scope.showExperts = true;

                $scope.$apply();
                $ionicScrollDelegate.scrollTop();

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

    $scope.getCategoryFileName = function(skill){
        if(skill.indexOf('/')>0){
            return "subcategory";
        }
        return skill.replace('ó','o').replace('ú','u').replace('í','i').replace(' ','-').toLowerCase();
    }

});
