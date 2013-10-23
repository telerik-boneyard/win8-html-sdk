// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    // the scheduler sample data
    var data = [{
        id: 1,
        title: "Bob Dylan",
        cityId: 1,
        start: new Date("2013/10/24 20:00"),
        end: new Date("2013/10/24 23:00")
    }, {
        id: 2,
        title: "Everlast",
        cityId: 1,
        start: new Date("2013/10/25 21:00"),
        end: new Date("2013/10/26 00:00")
    }, {
        id: 3,
        title: "Bruno Mars",
        cityId: 1,
        start: new Date("2013/10/28 20:00"),
        end: new Date("2013/10/28 23:00")
    }, {
        id: 4,
        title: "Texas",
        cityId: 2,
        start: new Date("2013/10/21 20:00"),
        end: new Date("2013/10/21 23:00")
    }, {
        id: 5,
        title: "DISCO",
        cityId: 2,
        start: new Date("2013/10/24 20:00"),
        end: new Date("2013/10/24 23:00")
    }, {
        id: 6,
        title: "Blue",
        cityId: 3,
        start: new Date("2013/10/22 19:00"),
        end: new Date("2013/10/22 22:30")
    }, {
        id: 7,
        title: "Everything Everything",
        cityId: 3,
        start: new Date("2013/10/24 20:00"),
        end: new Date("2013/10/24 23:30")
    }, {
        id: 8,
        title: "Charlez Aznavour",
        cityId: 3,
        start: new Date("2013/10/25 19:30"),
        end: new Date("2013/10/25 21:00")
    }, {
        id: 9,
        title: "John Mayer",
        cityId: 3,
        start: new Date("2013/10/26 19:30"),
        end: new Date("2013/10/26 23:00")
    }, {
        id: 10,
        title: "Arctic Monkeys",
        cityId: 4,
        start: new Date("2013/10/23 19:00"),
        end: new Date("2013/10/23 22:00")
    }, {
        id: 11,
        title: "HIM",
        cityId: 4,
        start: new Date("2013/10/24 19:00"),
        end: new Date("2013/10/24 22:00")
    }, {
        id: 12,
        title: "Billy Joel",
        cityId: 4,
        start: new Date("2013/10/29 19:00"),
        end: new Date("2013/10/29 21:00")
    }
    ];

    // the scheduler sample resources that connect to the "cityId" field in the sample data
    var resources = [
    {
        field: "cityId",
        title: "City",
        name: "Cities",
        dataSource: [{
            text: "Berlin",
            value: 1,
            color: "#FBF192"
        }, {
            text: "Paris",
            value: 2,
            color: "#27BAB2"
        }, {
            text: "London",
            value: 3,
            color: "#0083D4"
        }, {
            text: "Manchester",
            value: 4,
            color: "#FABF09"
        }]
    }];

    // exposing the scheduler configuration options in a namespace, so they can be accessed in the mark-up
    WinJS.Namespace.define("Scheduler", {
        date: new Date("2013/10/21"),
        startTime: new Date("2013/10/21 19:00"),
        endTime: new Date("2013/10/22 00:00"),
        dataSource: data,
        resources: resources
    });

    // initializing the scheduler and checkboxes here because we get the values for them in the processAll() 
    // promise and use them in the filterScheduler function below.
    var scheduler,
        checkboxes;

    // this is the checkboxes "change" event handler function.
    function filterScheduler() {
        var filter = [];

        // generating the dataSource filter expression based on the checkboxes's values
        for (var j = 0; j < checkboxes.length; j++) {
            var cityId = parseInt(checkboxes[j].id.split("-")[2]);

            if (checkboxes[j].checked) {
                filter.push({ field: "cityId", operator: "eq", value: cityId });
            }
        }

        // assigning the gerated filter to the scheduler's dataSource and changing the 
        // logic operator to "or" in case we have multiple filter expressions
        scheduler.dataSource.filter = filter;
        scheduler.dataSource.filter.logic = "or";
        // refresh the grid for the filter to take effect.
        scheduler.refresh();
    }

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }
            args.setPromise(WinJS.UI.processAll().then(function() {
                // getting the references to the scheduler and checkboxes in the promise of the 
                // processAll() function, because we have to wait for the scheduler control to be 
                // initialized
                scheduler = Telerik.UI.find.Scheduler("#scheduler");
                checkboxes = document.querySelectorAll(".city-checkbox");

                // adding event listeners to each checkbox's "change" event
                for (var i = 0; i < checkboxes.length; i++) {
                    checkboxes[i].addEventListener("change", filterScheduler);
                }
            }));
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    app.start();
})();
