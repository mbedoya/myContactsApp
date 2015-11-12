controllersModule.controller('ContactsCtrl', function($scope, $rootScope, $ionicLoading, $location) {

    $scope.initialize = function(){
        $scope.filteredContacts = $rootScope.contacts;
        $scope.model = { name: null};
    }

    $scope.initialize();

    $scope.filterContact = function(value, index, ar){
        return value.displayName.toLowerCase().indexOf($scope.data.search.toLowerCase()) >= 0;
    }

    $scope.searchName = function(){
        if($rootScope.contacts && $scope.data.search && $scope.data.search.length >= 3){
            $scope.filteredContacts = $rootScope.contacts.filter($scope.filterContact);
        }else{
            $scope.filteredContacts = $rootScope.contacts;
        }
    }

    $scope.getContactByMobile = function(mobile){
        console.log(mobile);
        return {ID: "2" };
    }

    $scope.viewContact = function(mobile){
        $rootScope.reloadContact = true;
        $rootScope.selectedContact = $scope.getContactByMobile(mobile);
        $rootScope.selectedSkill = {ID: 0};
        $location.path('/app/menu/tabs/contact');
    }

});
