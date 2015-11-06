angular.module('laboru.controllers', [])

    .controller('AppCtrl', function($scope, $rootScope, $ionicModal, $timeout) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function() {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function() {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function() {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function() {
                $scope.closeLogin();
            }, 1000);
        };

        $scope.name = function(){
            return $rootScope.profile.personalInfo.firstName + " " + $rootScope.profile.personalInfo.lastName;
        }
    })
    
    .controller('WelcomeCtrl', function($scope, $rootScope, $location, Utility) {

        $scope.getLocalizedText = function(text){
            return Utility.getLocalizedStringValue(text);
        }

        $scope.continue = function(){

            $location.path('/app/setupname');
        }

        $scope.initialize = function(){

            $rootScope.configuration = { serverIP : 'http://mungos.co:8083' };

            language = JSON.parse(lang);
            $rootScope.languageDefinitions = language;

            //Set Empty Profile
            $rootScope.profile = {
                personalInfo :
                {
                    id: null,
                    firstName: "",
                    lastName: "",
                    mobile: ""
                },
                businessInfo:
                {
                    bio : "",
                    skills: []
                }
            };

            if(localStorage){
                if(localStorage.mobile){

                    $rootScope.profile = {
                        personalInfo :
                        {
                            id: localStorage.id,
                            firstName: localStorage.firstName,
                            lastName: localStorage.lastName,
                            mobile: localStorage.mobile
                        },
                        businessInfo:
                        {
                            bio : "I am Pro Business Manager",
                            skills: ["Project Manager","Developer"]
                        }
                    };

                    $location.path('/app/menu/tabs/news');
                }
            }
        }

        $scope.initialize();
    })

    .controller('SetupNameCtrl', function($scope, $rootScope, $location, Utility) {

        $scope.model = {
            firstName: $rootScope.profile.personalInfo.firstName,
            lastName: $rootScope.profile.personalInfo.lastName
        }

        $scope.getLocalizedText = function(text){
            return Utility.getLocalizedStringValue(text);
        }

        $scope.continue = function(){

            localStorage.firstName = $scope.model.firstName;
            localStorage.lastName = $scope.model.lastName;

            $rootScope.profile.personalInfo.firstName = localStorage.firstName;
            $rootScope.profile.personalInfo.lastName = localStorage.lastName;

            $location.path('/app/setupmobile');
        }
    })

    .controller('SetupMobileCtrl', function($scope, $rootScope, $location, $ionicPopup, $ionicLoading, Expert, Utility) {

        $scope.model = { country:"57"};

        $scope.helpWindow = function(title, message) {
            var popup = $ionicPopup.alert({
                title: "",
                template: message
            });
        };

        $scope.getLocalizedText = function(text){
            return Utility.getLocalizedStringValue(text);
        }

        $scope.continue = function(){

            $rootScope.profile.personalInfo.mobile = $scope.model.country + $scope.model.number;

            $scope.loading =  $ionicLoading.show({
                template: Utility.getLoadingTemplate(Utility.getLocalizedStringValue('waitingConfirmation'))
            });

            Expert.register(function(success, data){

                $ionicLoading.hide();

                if(success){

                    localStorage.mobile = $rootScope.profile.personalInfo.mobile;
                    localStorage.id = data.ID;
                    $rootScope.profile.personalInfo.id = data.ID;

                    $scope.loading =  $ionicLoading.show({
                        template: Utility.getLoadingTemplate('Configurando tu cuenta')
                    });

                    if(navigator.contacts){
                        // find all contacts with 'Bob' in any name field
                        options      = new ContactFindOptions();
                        options.filter   = "";
                        options.multiple = true;
                        fields = ["displayName"];

                        navigator.contacts.find(fields, function(contacts){

                            Expert.setContacts(contacts, function(success, data){

                                $ionicLoading.hide();

                                if(success){

                                    $scope.helpWindow('','Bienvenido a Laboru');
                                    $location.path('/app/menu/tabs/news');
                                }else{
                                    $scope.helpWindow('','Error configurando tu cuenta');
                                }

                            });

                        }, function(contactError){
                            $ionicLoading.hide();
                            $scope.helpWindow('','Error obteniendo tus Contactos');
                        }, options);
                    }else{
                        $ionicLoading.hide();
                        $scope.helpWindow('','Error configurando tu cuenta');
                    }

                }else{
                    $scope.helpWindow('','Error registrando numero');
                }

            });

        }
    })

    .controller('TabsCtrl', function($scope, $rootScope, Utility) {

        $scope.getLocalizedText = function(text){
            return Utility.getLocalizedStringValue(text);
        }

    })

    .controller('NewsCtrl', function($scope, $rootScope, Utility) {

        $scope.getLocalizedText = function(text){
            return Utility.getLocalizedStringValue(text);
        }

        $scope.gotoProfile = function(){

        }

    })

    .controller('ExpertsCtrl', function($scope, $rootScope, $ionicLoading, $location, Utility) {

        $scope.initialize = function(){

            $scope.filteredSkills = new Array();
            $scope.skills = new Array();
            $scope.selectedSkills = new Array();

            $scope.skills.push('Almacenista');
            $scope.skills.push('Avicultor');
            $scope.skills.push('Bailarín');
            $scope.skills.push('Belleza/Depilación');
            $scope.skills.push('Belleza/Manicure Pedicure');
            $scope.skills.push('Belleza/Maquillaje');
            $scope.skills.push('Belleza/Masajes');
            $scope.skills.push('Belleza/Peluquería');
            $scope.skills.push('Bombero');
            $scope.skills.push('Cantante');
            $scope.skills.push('Carnicero');
            $scope.skills.push('Cartero');
            $scope.skills.push('Conductor');
            $scope.skills.push('Deporte/Instructor(a) Ciclismo');
            $scope.skills.push('Deporte/Instructor(a) Equitación');
            $scope.skills.push('Deporte/Instructor(a) Natación');
            $scope.skills.push('Deporte/Instructor(a) Squash');
            $scope.skills.push('Deporte/Instructor(a) Tenis de Campo');
            $scope.skills.push('Deporte/Instructor(a) Tenis de Mesa');
            $scope.skills.push('Educación/Profesor(a) Alemán');
            $scope.skills.push('Educación/Profesor(a) Español');
            $scope.skills.push('Educación/Profesor(a) Física');
            $scope.skills.push('Educación/Profesor(a) Inglés');
            $scope.skills.push('Educación/Profesor(a) Italiano');
            $scope.skills.push('Educación/Profesor(a) Latín');
            $scope.skills.push('Educación/Profesor(a) Mandarín');
            $scope.skills.push('Educación/Profesor(a) Matemáticas');
            $scope.skills.push('Educación/Profesor(a) Portugués');
            $scope.skills.push('Educación/Profesor(a) Química');
            $scope.skills.push('Escultor');
            $scope.skills.push('Fotógrafo');
            $scope.skills.push('Hogar/Albañilería');
            $scope.skills.push('Hogar/Carpintería');
            $scope.skills.push('Hogar/Cerrajería');
            $scope.skills.push('Hogar/Cortinería');
            $scope.skills.push('Hogar/Cuidado Niños');
            $scope.skills.push('Hogar/Decoración');
            $scope.skills.push('Hogar/Electricidad');
            $scope.skills.push('Hogar/Jardinería');
            $scope.skills.push('Hogar/Pintura');
            $scope.skills.push('Hogar/Plomería');
            $scope.skills.push('Interventor');
            $scope.skills.push('Locutor');
            $scope.skills.push('Mascotas/Adiestramiento');
            $scope.skills.push('Mascotas/Baño Peluquería');
            $scope.skills.push('Mascotas/Paseador(a) Canino');
            $scope.skills.push('Mascotas/Veterinaria');
            $scope.skills.push('Matemático');
            $scope.skills.push('Medicina/Anestesiología');
            $scope.skills.push('Medicina/Bacteriología');
            $scope.skills.push('Medicina/Cardiología');
            $scope.skills.push('Medicina/Cirugía');
            $scope.skills.push('Medicina/Dermatología');
            $scope.skills.push('Medicina/Enfermería');
            $scope.skills.push('Medicina/Fisioterapia');
            $scope.skills.push('Medicina/Geriatría');
            $scope.skills.push('Medicina/Ginecología');
            $scope.skills.push('Medicina/Medico General');
            $scope.skills.push('Medicina/Nutrición');
            $scope.skills.push('Medicina/Odontología');
            $scope.skills.push('Medicina/Oftalmología');
            $scope.skills.push('Medicina/Ortodoncia');
            $scope.skills.push('Medicina/Ortopedia');
            $scope.skills.push('Medicina/Pediatría');
            $scope.skills.push('Medicina/Radiología');
            $scope.skills.push('Medicina/Urología');
            $scope.skills.push('Mesero');
            $scope.skills.push('Paisajista');
            $scope.skills.push('Panadero');
            $scope.skills.push('Perito');
            $scope.skills.push('Pianista');
            $scope.skills.push('Profesión/Actor');
            $scope.skills.push('Profesión/Actriz');
            $scope.skills.push('Profesión/Agronomía');
            $scope.skills.push('Profesión/Antropología');
            $scope.skills.push('Profesión/Arquitectura');
            $scope.skills.push('Profesión/Contaduría');
            $scope.skills.push('Profesión/Derecho');
            $scope.skills.push('Profesión/Diseño Gráfico');
            $scope.skills.push('Profesión/Gastronomía');
            $scope.skills.push('Profesión/Ingeniería Cívil');
            $scope.skills.push('Profesión/Periodismo');
            $scope.skills.push('Profesión/Publicidad');
            $scope.skills.push('Profesión/Topografía');
            $scope.skills.push('Recreacionista');
            $scope.skills.push('Tecnología/Auditoria Sistemas Informáticos');
            $scope.skills.push('Tecnología/Desarollo Apps');
            $scope.skills.push('Tecnología/Desarrollo Web');
            $scope.skills.push('Tecnología/Redes');
            $scope.skills.push('Tecnología/Seguridad Informática');
            $scope.skills.push('Tecnología/Telecomunicaciones');
            $scope.skills.push('Traductor');
            $scope.skills.push('Vigilante');
            $scope.skills.push('Violinista');

        }

        $scope.initialize();

        $scope.clear = function(){
            $scope.selectedSkills.length = 0;
            $scope.filteredSkills.length = 0;
            $scope.data.search = "";
            $scope.showExperts = false;
        }

        $scope.removeSkill = function(index){
            $scope.selectedSkills.splice(index, 1);
            if($scope.selectedSkills.length == 0){
                $scope.showExperts = false;
            }else{
                $scope.searchExperts();
            }
        }
        
        $scope.selectSkill = function(skill){
            $scope.selectedSkills.push(skill);
            $scope.data.search = "";
            $scope.filteredSkills.length = 0;

            $scope.searchExperts();
        }

        $scope.filterSkills = function(value, index, ar){
            return value.toLowerCase().indexOf($scope.data.search.toLowerCase()) >= 0;
        }

        $scope.searchSkill = function(){
            if($scope.data.search && $scope.data.search.length >= 3){
                $scope.filteredSkills = $scope.skills.filter($scope.filterSkills);
            }else{
                $scope.filteredSkills.length = 0;
            }
        }
        $scope.searchExperts = function(){

            $scope.loading =  $ionicLoading.show({
                template: Utility.getLoadingTemplate('Buscando Expertos')
            });

            setTimeout(function(){
                $ionicLoading.hide();
                $scope.showExperts = true;

            }, 1500);
        }

        $scope.getLocalizedText = function(text){
            return Utility.getLocalizedStringValue(text);
        }

        $scope.viewContact = function(name){
            $rootScope.selectedContact = {displayName: name};
            $location.path('/app/menu/tabs/expertcontact');
        }

    })

    .controller('ContactCtrl', function($scope, $rootScope) {

        $scope.contactName = function(){
            return $rootScope.selectedContact.displayName;
        }
    })

    .controller('ContactRecommendationCtrl', function($scope, $rootScope) {

        $scope.contactName = function(){
            return $rootScope.selectedContact.displayName;
        }

    })

    .controller('ContactsCtrl', function($scope, $rootScope, $ionicLoading, $location) {

        $scope.model = { name: null};

        $scope.viewContact = function(index){
            $rootScope.selectedContact = $scope.results[index];
            $location.path('/app/menu/tabs/contact');
        }

        $scope.search = function(){

            try {
                if(navigator.contacts){
                    // find all contacts with 'Bob' in any name field
                    options      = new ContactFindOptions();
                    options.filter   = $scope.model.name;
                    options.multiple = true;
                    fields = ["displayName", "name"];

                    $scope.loading =  $ionicLoading.show({
                        template: 'Finding Contacts'
                    });

                    navigator.contacts.find(fields, function(contacts){
                        $scope.results = contacts;

                        $ionicLoading.hide();

                        $scope.$apply();

                    }, function(contactError){
                        $ionicLoading.hide();
                        alert("Error finding contacts");
                    }, options);
                }
            } catch (error) {
                alert(error.message);
            }


        }

    })

    .controller('PlaylistCtrl', function($scope, $stateParams) {
    });
