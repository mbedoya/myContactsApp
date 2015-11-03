angular.module('laboru.services', [])

    .factory('Expert', function($rootScope, $http) {

        return{

            register: function(fx) {

                var serviceURL = $rootScope.configuration.serverIP + "/Expert/Register";


                $.ajax({
                    url: serviceURL,
                    dataType: "json",
                    type: "POST",
                    data: {
                        Name: $rootScope.profile.personalInfo.firstName,
                        LastName: $rootScope.profile.personalInfo.lastName,
                        Mobile: $rootScope.profile.personalInfo.mobile
                    },
                    success: function (data) {

                    },
                    error: function (a, b, c) {
                        fx(false, {});
                    }
                })
                    .then(function (response) {
                        fx(true, response);
                    });

            },
            setContacts: function(contacts, fx) {

                var serviceURL = $rootScope.configuration.serverIP + "/Expert/SetContacts";

                //Map Contacts
                contactsArray = new Array();

                for(i=0;i<contacts.length;i=i+1){
                    //Add Contacts if they have a name and mobile number
                    if(contacts.displayName && contacts[i].name.givenName && contacts[i].phonenumbers.length > 0){
                        contactsArray.push({Name : contacts[i].name.givenName, LastName : contacts[i].name.familiyName, Mobile: contacts[i].phoneNumbers[0].value });
                    }
                }

                $.ajax({
                    url: serviceURL,
                    dataType: "json",
                    type: "POST",
                    data: $.toDictionary( {
                        ID: $rootScope.profile.personalInfo.id,
                        Mobile: $rootScope.profile.personalInfo.mobile,
                        Contacts: contactsArray
                    }),
                    success: function (data) {

                    },
                    error: function (a, b, c) {
                        fx(false, {});
                    }
                })
                    .then(function (response) {
                        fx(true, response);
                    });

            }
        }

    })

    .factory('Utility', function($rootScope) {

        return{

            getLocalizedStringValue: function(stringName) {

                return $rootScope.languageDefinitions["es"][stringName];

                if($rootScope.language){
                    if( $rootScope.language.toLowerCase().contains("en") ){
                        myLocale = "en";
                    }
                }else{
                    //Get Preferred Language
                    if(navigator && navigator.globalization){
                        navigator.globalization.getPreferredLanguage(
                            function (language) {
                                $rootScope.language = language.value;
                                if( $rootScope.language.toLowerCase().contains("en") ){
                                    return $rootScope.languageDefinitions["en"][stringName];
                                }else{
                                    return $rootScope.languageDefinitions["es"][stringName];
                                }
                            },
                            function () {
                                return $rootScope.languageDefinitions[myLocale][stringName];
                            }
                        );
                    }
                }

                return $rootScope.languageDefinitions[myLocale][stringName];
            },

            getLoadingTemplate: function(message) {
                return message + '<br /><br /> <img style="max-width:50px; max-height:50px;" src="img/loading.gif">';
            }
        }

    })

;

