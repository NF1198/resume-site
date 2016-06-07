//
// Data
//

var bio = {
    name: "Nicholas Folse",
    role: "Web Developer & Measurements Technologist",
    contacts: {
        mobile: "505-814-6688",
        email: "nicholas.folse@utexas.edu",
        github: "https://github.com/NF1198",
        /*twitter: "TBD",*/
        location: "Albuquerque, NM"
    },
    welcomeMessage: "Welcome",
    skills: ["Responsive Web", "HTML5", "CSS3", "JavaScript", "IoT", "Java", "LabVIEW", "Microelectronics Verification & Test", "NI-DAQ", "TCP/IP", "GPIB", "Business Japanese", "Business Korean"],
    biopic: "images/nfolse.jpg"
};

var education = {
    schools: [{
        name: "University of Texas at Austin",
        location: "Austin, TX",
        degree: "Bachelor of Science",
        majors: ["Mechanical Engineering"],
        dates: "1997-2003",
        url: "http://www.me.utexas.edu/"
    }, {
        name: "Oita University",
        location: "Oita, Japan",
        degree: "Study Abroad",
        majors: ["Japanese"],
        dates: "2001-2002",
        url: "http://www.oita-u.ac.jp/english/"
    }, {
        name: "University of Texas at Austin",
        location: "Austin, TX",
        degree: "Graduate Coursework",
        majors: ["Materials Science & Engineering"],
        dates: "2008-2009",
        url: "http://www.me.utexas.edu/"
    }],
    onlineCourses: [{
        title: "M101J: MongoDB for Java Developers",
        school: "MongoDB University",
        date: "2016",
        url: "https://university.mongodb.com"
    }]
};

var work = {
    jobs: [{
        employer: "Samsung Display",
        title: "Senior Engineer",
        location: "Asan, South Korea",
        dates: "2012-2016",
        description: "Senior measurement technologist with emphasis in electical and optical properties evaluation and test automation."
    },{
        employer: "University of Texas at Austin",
        title: "Teaching Assistant - Materials Science Laboratory",
        location: "Austin, TX",
        dates: "2008-2009",
        description: "Instructor for ME136L laboratory course in materials science."
    },{
        employer: "National Instruments",
        title: "Project Manager / Software Developer",
        location: "Austin, TX",
        dates: "2003-2008",
        description: "Supervised development of industrial monitoring and control software."
    }]
};

var projects = {
    projects: [{
        title: "A project",
        dates: "2012-2103",
        description: "A project placeholder",
        images: ["images/300x240.png", "images/300x240.png"]
    }]
};

var otherLocations = ["Cairo, Egypt", "Tokyo, Japan"];

//
// DOM Update Funcions
//

var fontAwesomeClassMap = {
    mobile: "fa fa-mobile",
    twitter: "fa fa-twitter",
    github: "fa fa-github",
    location: "fa fa-map-marker",
    email: "fa fa-envelope"
};

bio.display = function() {
    var $header = $("#header");

    // construct new elements for the header
    var $h1 = $("<h1>", {
        id: "name"
    }).text(this.name);
    var $role = $("<span>", {
        class: "highlight-text"
    }).text(this.role).after($("<hr>"));

    // get header element
    $header.prepend($role).prepend($h1);

    // get contacts elements
    var $topContacts = $("#topContacts");
    var $footerContacts = $("#footerContacts");

    // shadow "this" for anonymous functions
    var $this$ = this;

    // create helper functions to build contact items
    var contactFor = function(type) {
        var $li = $("<li>", {
            class: "flex-item"
        });
        var $itemType;
        if (type in fontAwesomeClassMap) {
            $itemType = $("<i>", {
                class: fontAwesomeClassMap[type],
                "aria-hidden": "true"
            });
        } else {
            $itemType = $("<span>", {
                class: "orange-text"
            }).text(type);
        }
        var $itemData = $("<span>", {
            class: "white-text"
        }).text($this$.contacts[type]);
        return $li.append($itemType)
            .append($itemData);
    };

    var contactsFor = function(contactList) {
        var contactElements = [];
        for (var idx = 0; idx < contactList.length; idx++) {
            var contactType = contactList[idx];
            if (contactType in $this$.contacts) {
                contactElements.push(contactFor(contactType));
            }
        }
        return contactElements;
    };

    // update DOM with contacts

    var topContactsList = contactsFor(["mobile", "email", "github", "twitter"]);
    for (var idx = 0; idx < topContactsList.length; idx++) {
        $topContacts.append(topContactsList[idx]);
    }

    var footerContactsList = contactsFor(["mobile", "email", "github", "location"]);
    for (idx = 0; idx < footerContactsList.length; idx++) {
        $footerContacts.append(footerContactsList[idx]);
    }

    // update the biopic & welcome message
    var $bioPic = $("<img>", {
        src: this.biopic,
        alt: "photo of " + this.name,
        class: "biopic"
    });

    var $welcomeMessage = $("<span", {
        class: "welcome-message"
    }).text(this.welcomeMessage);

    $header.append($bioPic)
        .append($welcomeMessage);

    // update skills
    var $skillsStart = $("<h3>", {
        id: "skills-h3"
    }).text("Skills as a Glance");
    var $skillsList = $("<ul>", {
        class: "flex-box",
        id: "skills"
    });

    var skillFor = function(data) {
        var $skill = $("<li>", {
            class: "flex-item"
        });
        var $skillContent = $("<span>", {
            class: "white-text"
        }).text(data);
        return $skill.append($skillContent);
    };

    for (idx = 0; idx < this.skills.length; idx++) {
        var skill = this.skills[idx];
        $skillsList.append(skillFor(skill));
    }

    $header.append($skillsStart)
        .append($skillsList);

}; // bio.display()

education.display = function() {
    var $education = $("#education");

    // construct school items
    for (var idx = 0; idx < this.schools.length; idx++) {
        var school = this.schools[idx];
        var $school = $("<div>", {
            class: "education-entry"
        });
        var $name = $("<a>", {
            href: "#"
        }).text(school.name + " -- " + school.degree);
        var $dates = $("<div>", {
            class: "date-text"
        }).text(school.dates);
        var $location = $("<div>", {
            class: "location-text"
        }).text(school.location);
        var $major = $("<em>").text("Major: " + school.majors.join(", ")).prepend($("<br>"));

        $school.append($name)
            .append($dates)
            .append($location)
            .append($major);

        $education.append($school);
    }

    // construct online items
    var $onlineHead = $("<h3>").text("Online Classes");
    $education.append($onlineHead);

    for (idx = 0; idx < this.onlineCourses.length; idx++) {
        var onlineCourse = this.onlineCourses[idx];
        var $school2 = $("<div>", {
            class: "education-entry"
        });
        var $onlineSchool = $("<a>", {
            href: "#"
        }).text(onlineCourse.title + " - " + onlineCourse.school);
        var $onlineDate = $("<div>", {
            class: "date-text"
        }).text(onlineCourse.date);
        var $onlineURL = $("<a>", {
            href: "#"
        }).text(onlineCourse.url).prepend($("<br>"));

        $school2.append($onlineSchool)
            .append($onlineDate)
            .append($onlineURL);

        $education.append($school2);
    }
}; // education.display()

work.display = function() {
    var $workExperience = $("#workExperience");
    var jobs = work.jobs;

    // iterate through all jobs and append to the DOM
    for (var idx = 0; idx < jobs.length; idx++) {
        var job = jobs[idx];

        // construct elements
        var $workEntry = $("<div>", {
            class: "work-entry"
        });
        var $employer = $("<a>", {
            href: "#"
        }).text(job.employer + " - " + job.title);
        var $dates = $("<div>", {
            class: "date-text"
        }).text(job.dates);
        var $location = $("<div>", {
            class: "location-text"
        }).text(job.location);
        var $description = $("<p>").text(job.description).prepend($("<br>"));

        // build new work entry
        $workEntry.append($employer)
            .append($dates)
            .append($location)
            .append($description);

        // add work entry to work experience
        $workExperience.append($workEntry);
    }
}; // work.display()

projects.display = function() {
    var $projects = $("#projects");
    var projects = this.projects;


    // iterate through all projects and append to the DOM
    for (var idx = 0; idx < projects.length; idx++) {
        var project = projects[idx];

        // construct elements
        var $project = $("<div>", {
            class: "project-entry"
        });
        var $title = $("<a>", {
            href: "#"
        }).text(project.title);
        var $dates = $("<div>", {
            class: "date-text"
        }).text(project.dates);
        var $description = $("<p>").text(project.description).prepend($("<br>"));

        // build new project entry
        $project.append($title)
            .append($dates)
            .append($description);

        for (idx = 0; idx < project.images.length; idx++) {
            var image = project.images[idx];
            $project.append($("<img>", {
                src: image
            }));
        }

        // add work entry to work experience
        $projects.append($project);
    }
}; // projects.display()

var addMapDIV = function() {
    var $mapDiv = $("#mapDiv");
    $mapDiv.append($("<div>", {
        id: "map"
    }));
}; // updateMap()

var inName = function(name) {
    var matcher = /\w+/g;
    var names = name.match(matcher);
    names[0] = names[0].charAt(0).toUpperCase() + names[0].slice(1);
    names[1] = names[1].toUpperCase();
    $('button').remove();
    return names.join(" ");
};

var addInButton = function() {
    var $element = $("h1").first().next();
    $element.append($("<button>").text("Internationalize"));
};

// Execution

bio.display();
education.display();
work.display();
projects.display();
addMapDIV();
// addInButton();
