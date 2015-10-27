angular.module('laboru.services', [])

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

