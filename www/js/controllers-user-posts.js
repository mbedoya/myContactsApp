controllersModule.controller('UserPostsCtrl', function($scope, $rootScope, $ionicPopup, $ionicLoading, $location, $ionicActionSheet, Utility, Posts) {

    $scope.helpWindow = function(title, message) {
        var popup = $ionicPopup.alert({
            title: "",
            template: message
        });
    };

    $scope.getSkillName = function(skillID){
        return Utility.getCategoryByID(skillID).Name;
    }

    $scope.viewPost = function(index){
        $location.path('/app/menu/userpost');
    }

    $scope.loadPosts = function(){

        $rootScope.showLoadingIndicator = true;

        Posts.getByExpert(function(success, data) {

            $rootScope.showLoadingIndicator = false;

            if (success) {
                $scope.posts = data;

                console.log(data);

                $scope.$apply();

            }else{
                $scope.helpWindow("","Error buscando Ofertas");
            }

        });

    }

    $scope.confirmPostDeletion = function(postID){

        var confirmPopup = $ionicPopup.confirm({
            title: 'Eliminar Oferta',
            template: '¿Estás seguro de eliminar la Oferta?'
        });

        confirmPopup.then(function(res) {
            if(res) {
                $rootScope.showLoadingIndicator = true;

                Posts.delete(postID, function(success, data) {

                    $rootScope.showLoadingIndicator = false;

                    if (success) {
                        $scope.helpWindow("","Oferta Eliminada");
                        $scope.loadPosts();
                    }else{
                        $scope.helpWindow("","Error Eliminando Oferta");
                    }

                });
            }
        });
    }

    $scope.getDate = function(date){
        var milli = date.replace(/\/Date\((-?\d+)\)\//, '$1');
        var d = new Date(parseInt(milli));

        return d;
    }

    $scope.$on('$ionicView.enter', function(){

        $scope.loadPosts();

    });



    $scope.initialize = function(){
        Utility.trackPage("User Posts");
    }

    $scope.initialize();

    $scope.continue = function(){
        $location.path('/app/menu/userpostnewcategory');
    }
});


