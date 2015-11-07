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
                        Name: $rootScope.profile.personalInfo.name,
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
            getBySkills: function(fx, skills) {

                var serviceURL = $rootScope.configuration.serverIP + "/Expert/GetBySkillAndExpert";

                $.ajax({
                    url: serviceURL,
                    dataType: "json",
                    type: "POST",
                    data: {
                        skillID : skills[0].ID,
                        fromExpertID:  $rootScope.profile.personalInfo.id
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

                try{

                    for(i=0; i<contacts.length; i++){
                        //Add Contacts if they have a name and mobile number
                        if(contacts[i].displayName && contacts[i].displayName.trim().length > 0 &&
                            contacts[i].name.givenName && contacts[i].name.givenName.trim().length > 0 &&
                            contacts[i].phoneNumbers && contacts[i].phoneNumbers.length > 0 && contacts[i].phoneNumbers[0].value.trim().length > 0){
                            contactsArray.push({Name : contacts[i].displayName, LastName : contacts[i].name.familiyName, Mobile: contacts[i].phoneNumbers[0].value });
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

                }catch(err){
                    fx(false, {});
                }





            }
        }

    })

    .factory('Skills', function($rootScope, $http) {

        return{

            getAll: function(fx) {

                var serviceURL = $rootScope.configuration.serverIP + "/Skill/GetAll";

                $.ajax({
                    url: serviceURL,
                    dataType: "json",
                    type: "POST",
                    data: { },
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

