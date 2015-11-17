controllersModule.controller('ContactRecommendationCtrl', function($scope, $rootScope, $location, $ionicPopup, $ionicLoading, Expert, Utility) {

    $scope.helpWindow = function(title, message) {
        var popup = $ionicPopup.alert({
            title: "",
            template: message
        });
    };

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
            }else{
                $scope.helpWindow('','No hemos cargar las recomendaciones');
            }
        });

    });

    $scope.initialize = function(){


    }

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
                    $scope.myRecommendations.push({ID: skill});

                    $scope.helpWindow('','Recomendación realizada');

                }else{

                    $scope.helpWindow('','No hemos podido enviar la recomendación');

                }
            });

        }

    }

    $scope.addSkill = function(){
        $location.path('/app/menu/tabs/expertcontact-addskill');
    }

});
