// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('laboru', ['ionic', 'laboru.controllers', 'laboru.services', 'laboru.filters'])

    .run(function($ionicPlatform, $rootScope, $ionicPopup) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            $rootScope.helpWindow = function(title, message) {
                var popup = $ionicPopup.alert({
                    title: "",
                    template: message
                });
            };

        });
    })

    .config(['$ionicConfigProvider', function($ionicConfigProvider) {

        $ionicConfigProvider.navBar.alignTitle("left");
        $ionicConfigProvider.views.transition("none");
        $ionicConfigProvider.tabs.position('bottom');

    }])

    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/app.html',
                controller: 'AppCtrl'
            })

            .state('app.welcome', {
                url: '/welcome',
                views: {
                    'app-view': {
                        templateUrl: 'templates/welcome.html',
                        controller: 'WelcomeCtrl'
                    }
                }
            })

            .state('app.setupname', {
                url: '/setupname',
                views: {
                    'app-view': {
                        templateUrl: 'templates/setup-name.html',
                        controller: 'SetupNameCtrl'
                    }
                }
            })

            .state('app.setupmobile', {
                url: '/setupmobile',
                views: {
                    'app-view': {
                        templateUrl: 'templates/setup-mobile.html',
                        controller: 'SetupMobileCtrl'
                    }
                }
            })

            .state('app.selectaccounttype', {
                url: '/selectaccounttype',
                views: {
                    'app-view': {
                        templateUrl: 'templates/select-account-type.html',
                        controller: 'SelectAccountTypeCtrl'
                    }
                }
            })

            .state('app.menu', {
                url: "/menu",
                abstract: true,
                views: {
                    'app-view': {
                        templateUrl: "templates/menu.html",
                        controller: 'AppCtrl'
                    }
                }
            })

            .state('app.menu.userhome', {
                url: "/userhome",
                views: {
                    'menuContent': {
                        templateUrl: "templates/user-home.html",
                        controller: 'UserHomeCtrl'
                    }
                }
            })

            .state('app.menu.userposts', {
                url: "/userposts",
                views: {
                    'menuContent': {
                        templateUrl: "templates/user-posts.html",
                        controller: 'UserPostsCtrl'
                    }
                }
            })

            .state('app.menu.experts', {
                url: '/experts',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/experts.html',
                        controller: 'ExpertsCtrl'
                    }
                }
            })

            .state('app.menu.contacts', {
                url: '/contacts',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/contacts.html',
                        controller: 'ContactsCtrl'
                    }
                }
            })

            .state('app.menu.contact', {
                url: '/contact',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/contact.html',
                        controller: 'ContactCtrl'
                    }
                }
            })

            .state('app.menu.contact-recommendation', {
                url: '/contact-recommendation',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/contact-recommendation.html',
                        controller: 'ContactRecommendationCtrl'
                    }
                }
            })

            .state('app.menu.expertcontact', {
                url: '/expertcontact',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/contact.html',
                        controller: 'ContactCtrl'
                    }
                }
            })

            .state('app.menu.tabs', {
                url: "/tabs",
                abstract: true,
                views: {
                    'menuContent': {
                        templateUrl: "templates/tabs.html",
                        controller: 'TabsCtrl'
                    }
                }
            })

            .state('app.menu.tabs.news', {
                url: '/news',
                views: {
                    'news-content': {
                        templateUrl: 'templates/news.html',
                        controller: 'NewsCtrl'
                    }
                }
            })

            .state('app.menu.tabs.profile', {
                url: '/profile',
                views: {
                    'news-content': {
                        templateUrl: 'templates/profile.html',
                        controller: 'ProfileCtrl'
                    }
                }
            })

            .state('app.menu.tabs.profile-edit-field', {
                url: '/profile-edit-field',
                views: {
                    'news-content': {
                        templateUrl: 'templates/profile-edit-field.html',
                        controller: 'ProfileEditFieldCtrl'
                    }
                }
            })

            .state('app.menu.tabs.posts', {
                url: '/posts',
                views: {
                    'experts-content': {
                        templateUrl: 'templates/posts.html',
                        controller: 'PostsCtrl'
                    }
                }
            })

            .state('app.menu.tabs.post', {
                url: '/post',
                views: {
                    'experts-content': {
                        templateUrl: 'templates/post.html',
                        controller: 'PostCtrl'
                    }
                }
            })

            .state('app.menu.tabs.contact-addskill', {
                url: '/contact-addskill',
                views: {
                    'contacts-content': {
                        templateUrl: 'templates/contact-add-skill.html',
                        controller: 'AddSkillCtrl'
                    }
                }
            })

            .state('app.menu.tabs.expertcontact-recommendation', {
                url: '/expertcontact-recommendation',
                views: {
                    'experts-content': {
                        templateUrl: 'templates/contact-recommendation.html',
                        controller: 'ContactRecommendationCtrl'
                    }
                }
            })

            .state('app.menu.tabs.expertcontact-addskill', {
                url: '/expertcontact-addskill',
                views: {
                    'experts-content': {
                        templateUrl: 'templates/contact-add-skill.html',
                        controller: 'AddSkillCtrl'
                    }
                }
            })

            ;
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/welcome');
    });

angular.module('laboru.controllers');