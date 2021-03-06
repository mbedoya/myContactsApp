angular.module('laboru.services', [])

    .factory('Expert', function ($rootScope, $http) {

        return {

            get: function (expertID, fx) {

                var serviceURL = $rootScope.configuration.serverIP + "/Expert/Get";

                $.ajax({
                    url: serviceURL,
                    dataType: "json",
                    type: "POST",
                    data: {
                        id: expertID,
                        fromExpertID: $rootScope.profile.personalInfo.id
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
            updateProfile: function (fx) {

                var serviceURL = $rootScope.configuration.serverIP + "/Expert/Update";

                $.ajax({
                    url: serviceURL,
                    dataType: "json",
                    type: "POST",
                    data: $.toDictionary({
                        id: $rootScope.profile.personalInfo.id,
                        name: $rootScope.profile.personalInfo.name,
                        mobile: $rootScope.profile.personalInfo.mobile,
                        bio: $rootScope.xPerDescription,
                        Skills: $rootScope.xPerSkills
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

            },
            getMyRecommendations: function (fx) {

                var serviceURL = $rootScope.configuration.serverIP + "/Expert/GetMyRecommendations";

                $.ajax({
                    url: serviceURL,
                    dataType: "json",
                    type: "POST",
                    data: {
                        fromExpertID: $rootScope.profile.personalInfo.id
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
            getNews: function (fx) {

                var serviceURL = $rootScope.configuration.serverIP + "/Expert/GetNewsForExpert";

                $.ajax({
                    url: serviceURL,
                    dataType: "json",
                    type: "POST",
                    data: {
                        expertID: $rootScope.profile.personalInfo.id
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
            getByMobile: function (mobile, name, fx) {

                var serviceURL = $rootScope.configuration.serverIP + "/Expert/GetByMobile";

                $.ajax({
                    url: serviceURL,
                    dataType: "json",
                    type: "POST",
                    data: {
                        Mobile: mobile,
                        Name: name,
                        fromExpertID: $rootScope.profile.personalInfo.id
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
            register: function (fx) {

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
            getBySkills: function (fx, skills) {

                var serviceURL = $rootScope.configuration.serverIP + "/Expert/GetBySkillAndExpert";

                $.ajax({
                    url: serviceURL,
                    dataType: "json",
                    type: "POST",
                    data: {
                        skillID: skills[0].ID,
                        fromExpertID: $rootScope.profile.personalInfo.id
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
            getRecommendationsByExpert: function (expert, fx) {

                var serviceURL = $rootScope.configuration.serverIP + "/Expert/GetRecommendationsByExpert";

                $.ajax({
                    url: serviceURL,
                    dataType: "json",
                    type: "POST",
                    data: {
                        expertID: expert,
                        fromExpertID: $rootScope.profile.personalInfo.id
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
            getRecommendationsForExpert: function (fx) {

                var serviceURL = $rootScope.configuration.serverIP + "/Expert/GetRecommendationsForExpert";

                $.ajax({
                    url: serviceURL,
                    dataType: "json",
                    type: "POST",
                    data: {
                        expertID: $rootScope.profile.personalInfo.id
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
            getAllSkills: function (expert, fx) {

                var serviceURL = $rootScope.configuration.serverIP + "/Expert/GetAllExpertSkills";

                $.ajax({
                    url: serviceURL,
                    dataType: "json",
                    type: "POST",
                    data: {
                        expertID: expert
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
            getRecommendationsBySkills: function (expert, skill, fx) {

                var serviceURL = $rootScope.configuration.serverIP + "/Expert/GetRecommendationsBySkillAndExpert";

                $.ajax({
                    url: serviceURL,
                    dataType: "json",
                    type: "POST",
                    data: {
                        skillID: skill,
                        expertID: expert,
                        fromExpertID: $rootScope.profile.personalInfo.id
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
            recommendExpert: function (expert, skill, fx) {

                var serviceURL = $rootScope.configuration.serverIP + "/Expert/RecommendExpert";

                $.ajax({
                    url: serviceURL,
                    dataType: "json",
                    type: "POST",
                    data: {
                        skillID: skill,
                        expertID: expert,
                        fromExpertID: $rootScope.profile.personalInfo.id
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
            addSkill: function (expert, skill, fx) {

                var serviceURL = $rootScope.configuration.serverIP + "/Expert/AddSkill";

                $.ajax({
                    url: serviceURL,
                    dataType: "json",
                    type: "POST",
                    data: {
                        skillID: skill,
                        expertID: expert,
                        fromExpertID: $rootScope.profile.personalInfo.id
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
            deleteRecommendation: function (expert, skill, fx) {

                var serviceURL = $rootScope.configuration.serverIP + "/Expert/DeleteRecommendation";

                $.ajax({
                    url: serviceURL,
                    dataType: "json",
                    type: "POST",
                    data: {
                        skillID: skill,
                        expertID: expert,
                        fromExpertID: $rootScope.profile.personalInfo.id
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
            setContacts: function (contacts, fx) {

                var serviceURL = $rootScope.configuration.serverIP + "/Expert/SetContacts";

                try {

                    $.ajax({
                        url: serviceURL,
                        dataType: "json",
                        type: "POST",
                        data: $.toDictionary({
                            ID: $rootScope.profile.personalInfo.id,
                            Mobile: $rootScope.profile.personalInfo.mobile,
                            Contacts: contacts
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

                } catch (err) {
                    fx(false, {});
                }





            }
        }

    })

    .factory('Skills', function ($rootScope, $http) {

        return {

            getAll: function (fx) {

                var serviceURL = $rootScope.configuration.serverIP + "/Skill/GetAll";

                $.ajax({
                    url: serviceURL,
                    dataType: "json",
                    type: "POST",
                    data: {},
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

    .factory('Posts', function ($rootScope) {

        return {

            getAll: function (fx) {

                var serviceURL = $rootScope.configuration.serverIP + "/Post/GetAll";

                $.ajax({
                    url: serviceURL,
                    dataType: "json",
                    type: "POST",
                    data: {},
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
            getByExpert: function (fx) {

                var serviceURL = $rootScope.configuration.serverIP + "/Post/GetByExpert";

                $.ajax({
                    url: serviceURL,
                    dataType: "json",
                    type: "POST",
                    data: {
                        id: $rootScope.profile.personalInfo.id
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
            getForExpert: function (fx) {

                var serviceURL = $rootScope.configuration.serverIP + "/Post/GetForExpert";

                $.ajax({
                    url: serviceURL,
                    dataType: "json",
                    type: "POST",
                    data: {
                        id: $rootScope.profile.personalInfo.id
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
            create: function (skillID, title, description, fx) {

                var serviceURL = $rootScope.configuration.serverIP + "/Post/Update";

                $.ajax({
                    url: serviceURL,
                    dataType: "json",
                    type: "POST",
                    data: {
                        title: title,
                        description: description,
                        fromExpertID: $rootScope.profile.personalInfo.id,
                        SkillPageID: skillID
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
            delete: function (id, fx) {

                var serviceURL = $rootScope.configuration.serverIP + "/Post/Delete";

                $.ajax({
                    url: serviceURL,
                    dataType: "json",
                    type: "POST",
                    data: {
                        ID: id,
                        fromExpertID: $rootScope.profile.personalInfo.id
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

            }
        }

    })

    .factory('Utility', function ($rootScope) {

        return {

            //Contacts that have not been synchronized
            getNewContacts: function () {
                if (navigator.contacts) {

                    options = new ContactFindOptions();
                    options.filter = "";
                    options.multiple = true;
                    options.hasPhoneNumber = true;
                    fields = ["displayName"];

                    myDbContacts = new db_contacts_js($rootScope.configuration.localDB);

                    navigator.contacts.find(fields, function (contacts) {

                        contactsArray = new Array();
                        for (i = 0; i < contacts.length; i++) {
                            //Add Contacts if they have a name and mobile number
                            if (contacts[i].displayName && contacts[i].displayName.trim().length > 0 &&
                                contacts[i].name.givenName && contacts[i].name.givenName.trim().length > 0 &&
                                contacts[i].phoneNumbers && contacts[i].phoneNumbers.length > 0 && contacts[i].phoneNumbers[0].value.trim().length > 0) {

                                contactsArray.push({ Name: contacts[i].displayName, LastName: contacts[i].name.familiyName, Mobile: contacts[i].phoneNumbers[0].value });
                                myDbContacts.insert(contacts[i].displayName, contacts[i].phoneNumbers[0].value);

                            }
                        }

                        $rootScope.contacts = contactsArray;
                        $rootScope.contactsSearchDone = true;


                    }, function (contactError) {

                        

                    }, options);
                }
            },
            //All Phone Contacts
            getPhoneContacts: function (fx) {
                if (navigator.contacts) {

                    options = new ContactFindOptions();
                    options.filter = "";
                    options.multiple = true;
                    options.hasPhoneNumber = true;
                    fields = ["displayName"];

                    myDbContacts = new db_contacts_js($rootScope.configuration.localDB);

                    navigator.contacts.find(fields, function (contacts) {

                        contactsArray = new Array();
                        for (i = 0; i < contacts.length; i++) {
                            //Add Contacts if they have a name and mobile number
                            if (contacts[i].displayName && contacts[i].displayName.trim().length > 0 &&
                                contacts[i].name.givenName && contacts[i].name.givenName.trim().length > 0 &&
                                contacts[i].phoneNumbers && contacts[i].phoneNumbers.length > 0 && contacts[i].phoneNumbers[0].value.trim().length > 0) {

                                    var contactFound = false;

                                    //Check for duplicate entries
                                    for(j=0; j<contactsArray.length;j++){
                                        if(contactsArray[j].Mobile == contacts[i].phoneNumbers[0].value){
                                            contactFound = true;
                                            break;
                                        }
                                    }

                                    if(!contactFound){
                                        contactsArray.push({ Name: contacts[i].displayName, LastName: contacts[i].name.familiyName, Mobile: contacts[i].phoneNumbers[0].value });
                                    }                                

                            }
                        }

                        fx(true, contactsArray);


                    }, function (contactError) {

                        fx(false, {}, 'error reading');

                    }, options);
                }else{
                    fx(false, {}, 'not available');
                }
            },
            trackPage: function (page) {
                if ($rootScope.gaPlugin) {
                    $rootScope.gaPlugin.trackPage(function () {

                    }, function () {

                    }, page);
                }
            },
            getLocalizedStringValue: function (stringName) {

                return $rootScope.languageDefinitions["es"][stringName];

                if ($rootScope.language) {
                    if ($rootScope.language.toLowerCase().contains("en")) {
                        myLocale = "en";
                    }
                } else {
                    //Get Preferred Language
                    if (navigator && navigator.globalization) {
                        navigator.globalization.getPreferredLanguage(
                            function (language) {
                                $rootScope.language = language.value;
                                if ($rootScope.language.toLowerCase().contains("en")) {
                                    return $rootScope.languageDefinitions["en"][stringName];
                                } else {
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

            getLoadingTemplate: function (message) {
                return message + '<br /><br /> <img style="max-width:50px; max-height:50px;" src="img/loading.gif">';
            },
            formatMobileNumber: function (number) {
                //Remove unnecessary chars
                number = number.replace("+", "").replace(/\s+/g, '').replace("-", "");

                //Add Country Code if not there
                if (!number.indexOf("57") == 0 && number.length == 10 && number.indexOf("3") == 0) {
                    number = "57" + number;
                }

                //Just 15 Chars
                if (number.length > 15) {
                    number = number.substring(0, 15);
                }

                return number;
            },
            getParentCategories: function () {
                var list = new Array();
                var source;

                for (i = 0; i < $rootScope.skills.length; i++) {
                    var parentFound = false;
                    source = $rootScope.skills[i];
                    for (j = 0; j < list.length; j++) {
                        if (source.Name.split('/')[0] == list[j]) {
                            parentFound = true;
                            break;
                        }
                    }
                    if (!parentFound) {
                        list.push(source.Name.split('/')[0]);
                    }
                }

                return list;
            },
            getParentCategory: function (skill) {
                return skill.split('/')[0];
            },
            getCategoryByID: function (skillID) {
                var name = "";

                for (i = 0; i < $rootScope.skills.length; i++) {
                    source = $rootScope.skills[i];
                    if (source.ID == skillID) {
                        name = source;
                        break;
                    }
                }

                return name;
            },
            wordTrim: function (value, length, overflowSuffix) {
                if (value.length <= length) return value;
                var strAry = value.split(' ');
                var retLen = strAry[0].length;
                for (var i = 1; i < strAry.length; i++) {
                    if (retLen == length || retLen + strAry[i].length + 1 > length) break;
                    retLen += strAry[i].length + 1
                }
                return strAry.slice(0, i).join(' ') + (overflowSuffix || '');
            }
        }

    })

    ;

