controllersModule.controller('UserHomeCtrl', function($scope, $rootScope, $location, $ionicPopup, $ionicLoading, Expert, Utility) {

    $scope.gotoxPers = function(){
        $location.path('/app/menu/experts');
    }

    $scope.gotoContacts = function(){
        $location.path('/app/menu/contacts');
    }

    $scope.gotoPosts = function(){
        $location.path('/app/menu/userposts');
    }

    $scope.initialize = function(){

        Utility.trackPage("Home Usuario");

        //Contacts not in Array?
        if(!$rootScope.contacts){

            //Get Contacts from Database
            myDbContacts = new db_contacts_js($rootScope.configuration.localDB);

            myDbContacts.getAll(function(tx, rs){

                console.log(rs.rows);

                if(rs.rows.length > 0){

                    contactsArray = new Array();
                    for (var i=0; i<rs.rows.length; i++) {
                        var row = rs.rows.item(i);
                        contactsArray.push({Name : row['Name'], Mobile: row['Mobile'] });
                    }
                    $rootScope.contacts = contactsArray;

                    //Check for new users to update all data sources

                    //Get Phone Contacts
                    Utility.getPhoneContacts(function(success, contacts, error) {
                        if (success) {                            
                            for (var index = 0; index < contacts.length; index++) {
                                var newContact = true;
                                for (var j = 0; j < $rootScope.contacts.length; index++) {
                                    if (contacts[index].Mobile == $rootScope.contacts[j].Mobile) {
                                        newContact = false;
                                        break;
                                    }
                                }

                                //If new contact found then update local array, local database and database server
                                if (newContact) {
                                    $rootScope.contacts.push({Name : contacts[index].Name, Mobile: contacts[index].Mobile });
                                    myDbContacts.insert(contacts[index].Name, contacts[index].Mobile);
                                    //TODO: Update Database Server
                                }
                            }
                        }
                    });

                }else{

                    setTimeout(function(){

                        //Get Contacts if not in Database
                        if(rs.rows.length == 0 && navigator.contacts){

                            //Get Contacts
                            Utility.getPhoneContacts(function(success, contacts, error) {
                                if (success) {
                                    $rootScope.contacts = contacts;

                                    //Update Database Server
                                    Expert.setContacts($rootScope.contacts, function (success, data) {

                                        $ionicLoading.hide();
                                        if (success) {

                                            //Update Local Database if all set
                                            for (var index = 0; index < $rootScope.contacts.length; index++) {
                                                myDbContacts.insert($rootScope.contacts[index].Name, $rootScope.contacts[index].Mobile);
                                            }
                                        }
                                    });
                                }
                            });

                        }else{

                            $rootScope.contacts = new Array();

                            $rootScope.contacts.push({ Name: 'Andres Bustamante', Mobile:'3004802276'});
                            myDbContacts.insert('Andres Bustamante', '3004802276');

                            $rootScope.contacts.push({ Name: 'Cindi Cano', Mobile: '3006131490'});
                            myDbContacts.insert('Cindi Cano', '3006131490');

                            $rootScope.contacts.push({ Name: 'Alejandro Diaz', Mobile: '3006131422'});
                            myDbContacts.insert('Alejandro Diaz', '3006131422');

                            $rootScope.contacts.push({ Name: 'Adriana Lopez', Mobile: '+57 314 8889608'});
                            myDbContacts.insert('Adriana Lopez', '+57 314 8889608');
                        }


                    }, 5000);

                }

            });
        }
    }

    $scope.initialize();
});
