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

            //myDbContacts.delete();

            myDbContacts.getAll(function(tx, rs){

                console.log(rs.rows);

                if(rs.rows.length > 0){

                    contactsArray = new Array();
                    for (var i=0; i<rs.rows.length; i++) {

                        var row = rs.rows.item(i);
                        contactsArray.push({Name : row['Name'], Mobile: row['Mobile'] });
                    }
                    $rootScope.contacts = contactsArray;

                }else{

                    setTimeout(function(){

                        //Get Contacts if not in Database
                        if(rs.rows.length == 0 && navigator.contacts){

                            options      = new ContactFindOptions();
                            options.filter   = "";
                            options.multiple = true;
                            options.hasPhoneNumber = true;
                            fields = ["displayName"];

                            navigator.contacts.find(fields, function(contacts){
                                contactsArray = new Array();
                                for(i=0; i<contacts.length; i++){
                                    //Add Contacts if they have a name and mobile number
                                    if(contacts[i].displayName && contacts[i].displayName.trim().length > 0 &&
                                        contacts[i].name.givenName && contacts[i].name.givenName.trim().length > 0 &&
                                        contacts[i].phoneNumbers && contacts[i].phoneNumbers.length > 0 && contacts[i].phoneNumbers[0].value.trim().length > 0){
                                        contactsArray.push({Name : contacts[i].displayName, LastName : contacts[i].name.familiyName, Mobile: contacts[i].phoneNumbers[0].value });
                                        myDbContacts.insert(contacts[i].displayName, contacts[i].phoneNumbers[0].value);
                                    }
                                }
                                $rootScope.contacts = contactsArray;

                            }, function(contactError){

                            }, options);
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


        try{
            if(sms) {
                alert('SMS existe');
                //CONFIGURATION
                var options = {
                    replaceLineBreaks: false, // true to replace \n by a new line, false by default
                    android: {
                        //intent: 'INTENT'  // send SMS with the native android SMS messaging
                        intent: '' // send SMS without open any other app
                    }
                };

                var success = function () { alert('Message sent successfully'); };
                var error = function (e) { alert('Message Failed:' + e); };
                sms.send('+573004802278', 'Bienvenido a Laboru', options, success, error);
            }else {
                alert('SMS no existe');
            }

        }catch(err){
            alert(err.message);
        }



    }

    $scope.initialize();
});
