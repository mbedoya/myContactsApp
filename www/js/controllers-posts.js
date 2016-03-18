controllersModule.controller('PostsCtrl', function($scope, $rootScope, $ionicPopup, $ionicLoading, $location, Utility, Expert, Posts) {

    $scope.helpWindow = function(title, message) {
        var popup = $ionicPopup.alert({
            title: "",
            template: message
        });
    };

    $scope.getDate = function(date){
        var milli = date.replace(/\/Date\((-?\d+)\)\//, '$1');
        var d = new Date(parseInt(milli));

        return d;
    }

    $scope.gotoGetCategories = function(){
        $location.path('/app/menu/tabs/postsgetcategories');
    }

    $scope.getCategoryCount = function(){
        if($rootScope.postsCategories){
            return $rootScope.postsCategories.length;
        }

        return 0;
    }

    $scope.$on('$ionicView.enter', function() {

        $rootScope.showLoadingIndicator = true;

        Posts.getForExpert(function (success, data) {

            $rootScope.showLoadingIndicator = false;

            if (success) {
                $scope.posts = data;

                $scope.$apply();

            } else {
                $scope.helpWindow("", "Error buscando Posts");
            }
        });

    });

    $scope.initialize = function(){

        $rootScope.postsCategories = $rootScope.xPerSkills;
        $scope.filteredSkills = new Array();
        $scope.selectedSkills = new Array();
        $scope.experts = new Array();

        $rootScope.showLoadingIndicator = true;

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

    $scope.filterSkills = function(value, index, ar){
        return value.Name.toLowerCase().indexOf($scope.data.search.toLowerCase()) >= 0;
    }

    $scope.searchSkill = function(){

        if($scope.selectedSkills.length > 0){
            $scope.selectedSkills.length = 0;
            $scope.experts.length = 0;
            $scope.showExperts = false;
        }

        if($scope.data.search && $scope.data.search.length >= 3){
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
                $scope.helpWindow("","Error busando Expertos");
            }

        }, $scope.selectedSkills);

        setTimeout(function(){
            //$ionicLoading.hide();
            //$scope.showExperts = true;

        }, 1500);
    }

    $scope.getLocalizedText = function(text){
        return Utility.getLocalizedStringValue(text);
    }

    $scope.viewContact = function(index){
        $rootScope.reloadContact = true;
        $rootScope.selectedContact = $scope.experts[index];
        $rootScope.fromMyContacts = false;
        $location.path('/app/menu/tabs/expertcontact');
    }

    $scope.viewPost = function(index){
        $rootScope.selectedPost = $scope.posts[index];
        $location.path('/app/menu/tabs/post');
    }

});

