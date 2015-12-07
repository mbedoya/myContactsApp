controllersModule.controller('AddSkillCtrl', function($scope, $rootScope, $ionicPopup, $ionicLoading, $location, Utility, Expert) {

    $scope.helpWindow = function(title, message) {
        var popup = $ionicPopup.alert({
            title: "",
            template: message
        });
    };

    $scope.initialize = function(){
        $scope.filteredSkills = new Array();
        $scope.selectedSkills = new Array();
    }

    $scope.initialize();

    $scope.clear = function(){
        $scope.selectedSkills.length = 0;
        $scope.filteredSkills.length = 0;
        $scope.data.search = "";
    }

    $scope.removeSkill = function(index){
        $scope.selectedSkills.splice(index, 1);
        if($scope.selectedSkills.length == 0){
            $("#txtSearch").focus();
        }
    }

    $scope.selectSkill = function(skill){
        $scope.selectedSkills.push(skill);
        $scope.data.search = "";
        $scope.filteredSkills.length = 0;

        $rootScope.selectedSkill = skill;
    }

    $scope.filterSkills = function(value, index, ar){
        return value.Name.toLowerCase().indexOf($scope.data.search.toLowerCase()) >= 0;
    }

    $scope.searchSkill = function(){
        if($scope.data.search && $scope.data.search.length >= 3){
            $scope.filteredSkills = $rootScope.skills.filter($scope.filterSkills);
        }else{
            $scope.filteredSkills.length = 0;
        }
    }


    $scope.getLocalizedText = function(text){
        return Utility.getLocalizedStringValue(text);
    }

    $scope.add = function(){

        $scope.loading =  $ionicLoading.show({
            template: Utility.getLoadingTemplate("Adicionando Habilidad")
        });

        Expert.addSkill($rootScope.selectedContact.ID, $rootScope.selectedSkill.ID, function(success, data){

            if(success){

                Expert.recommendExpert($rootScope.selectedContact.ID, $rootScope.selectedSkill.ID, function(success, data){

                    $ionicLoading.hide();

                    if(success) {

                        $scope.helpWindow('','Habilidad adicionada');

                        $rootScope.reloadContact = true;
                        $rootScope.reloadMyRecommendations = true;

                        if($rootScope.fromMyContacts){
                            $location.path('/app/menu/tabs/contact');
                        }else{
                            $location.path('/app/menu/tabs/expertcontact');
                        }

                    }else{
                        $scope.helpWindow('','No hemos podido enviar la recomendación');
                    }
                });

            }else{

                $ionicLoading.hide();

                $scope.helpWindow('','No hemos podido adicionar la habilidad');

            }

        });

    }

});
