angular.module('laboru.services', [])

    .factory('Utility', function($rootScope) {

        return{

            getLocalizedStringValue: function(stringName) {

                var myLocale = "es";

                if($rootScope.language){
                    if( $rootScope.language.toLowerCase().contains("en") ){
                        myLocale = "en";
                    }
                }else{
                    if(navigator && navigator.globalization){
                        navigator.globalization.getPreferredLanguage(
                            function (language) {
                                $rootScope.language = language;
                                if( $rootScope.language.toLowerCase().contains("en") ){
                                    myLocale = "en";
                                }
                                return $rootScope.languageDefinitions[myLocale][stringName];
                            },
                            function () {  }
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

