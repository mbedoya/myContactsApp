controllersModule.controller('NewsCtrl', function($scope, $rootScope, $location, $ionicPopup, $ionicLoading, Skills, Utility, Posts, Expert) {

    $scope.getDate = function(date){
        var milli = date.replace(/\/Date\((-?\d+)\)\//, '$1');
        var d = new Date(parseInt(milli));

        return d;
    }

    $scope.getSkillName = function(skillID){
        return Utility.getCategoryByID(skillID).Name;
    }

    $scope.$on('$ionicView.enter', function(){

        $rootScope.showLoadingIndicator = true;

        Posts.getForExpert(function(success, data) {

            $rootScope.showLoadingIndicator = false;

            if (success) {
                $scope.posts = data;

                $scope.$apply();

            }else{
                $scope.helpWindow("","Error buscando Posts");
            }
        });

        Expert.getRecommendationsForExpert(function(success, data) {

            $rootScope.showLoadingIndicator = false;

            if (success) {
                $scope.recommendations = data;

                console.log(data);

                $scope.$apply();

            }else{
                $scope.helpWindow("","Error buscando Posts");
            }
        });

    });

    $scope.initialize = function(){
        Utility.trackPage("Home xPer");
    }

    $scope.initialize();

    $scope.getLocalizedText = function(text){
        return Utility.getLocalizedStringValue(text);
    }

    $scope.showProfile = function(){
        return !localStorage.profileVisited;
    }

    $scope.gotoProfile = function(){
        localStorage.profileVisited = true;
        $location.path('/app/menu/tabs/profile');
    }

    $scope.viewPost = function(index){
        $rootScope.selectedPost = $scope.posts[index];
        $location.path('/app/menu/tabs/feedpost');
    }

});
