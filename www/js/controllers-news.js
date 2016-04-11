controllersModule.controller('NewsCtrl', function($scope, $rootScope, $location, $ionicPopup, $ionicLoading, Skills, Utility, Posts, Expert) {

    $scope.getDate = function(date){
        var milli = date.replace(/\/Date\((-?\d+)\)\//, '$1');
        var d = new Date(parseInt(milli));

        return d;
    }

    $scope.getSkillName = function(skillID){
        return Utility.getCategoryByID(skillID).Name;
    }

    $scope.previewText = function(text){
        return Utility.wordTrim(text, 75, ' ...');
    }

    $scope.showPost = function(element) {
        return element && element.InteractionType == 1;
    }

    $scope.showRecommendation  = function(element) {
        return element && element.InteractionType == 0;
    }

    $scope.$on('$ionicView.enter', function(){

        $rootScope.showLoadingIndicator = true;

        Expert.getNews(function(success, data) {

            $rootScope.showLoadingIndicator = false;

            if (success) {
                $scope.news = data;
                console.log(data);

                $scope.$apply();

            }else{
                $scope.helpWindow("","Error buscando Noticias");
            }
        });

        /*
        Posts.getForExpert(function(success, data) {

            $rootScope.showLoadingIndicator = false;

            if (success) {
                $scope.posts = data;
                console.log(data);

                $scope.$apply();

            }else{
                $scope.helpWindow("","Error buscando Posts");
            }
        });
        */

        /*
        Expert.getRecommendationsForExpert(function(success, data) {

            $rootScope.showLoadingIndicator = false;

            if (success) {
                $scope.recommendations = data;

                console.log(data);

                $scope.$apply();

            }else{
                $scope.helpWindow("","Error buscando Recomendaciones");
            }
        });
        */

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

    $scope.viewPost = function(post){
        $rootScope.selectedPost = post;
        $location.path('/app/menu/tabs/feedpost');
    }

});
