controllersModule.controller('UserPostsCtrl', function($scope, $rootScope, $ionicPopup, $ionicLoading, $location, $ionicActionSheet, Utility, Posts) {

    $scope.helpWindow = function(title, message) {
        var popup = $ionicPopup.alert({
            title: "",
            template: message
        });
    };

    $scope.viewPost = function(index){
        $location.path('/app/menu/userpost');
    }

    $scope.loadPosts = function(){

        $rootScope.showLoadingIndicator = true;

        Posts.getByExpert(function(success, data) {

            $rootScope.showLoadingIndicator = false;

            if (success) {
                $scope.posts = data;

                $scope.$apply();

            }else{
                $scope.helpWindow("","Error buscando Ofertas");
            }

        });

    }

    $scope.confirmPostDeletion = function(postID){

        // Show the action sheet
        var sheet = $ionicActionSheet.show({
            buttons: [
                { text: 'Aceptar' }
            ],
            titleText: '¿Deseas eliminar la Oferta?',
            cancelText: 'Cancelar',
            cancel: function() {
                // add cancel code..
            },
            buttonClicked: function(index) {
                if(index == 0){

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
                return true;
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


