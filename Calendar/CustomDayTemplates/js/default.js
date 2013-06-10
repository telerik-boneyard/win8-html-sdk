// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

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
                var calendar = new Telerik.UI.RadCalendar(document.getElementById("Calendar1"), {
                    value: new Date(2013, 6, 11),
                    month: {
                        template: "#=Templates.getTemplate(data, Templates.events)#"
                    }
                });
            }));
        }
    };

    WinJS.Namespace.define("Templates", {
        events: [
            { Date: new Date(2013, 6, 10), Event: "Jessie Birthday" },
            { Date: new Date(2013, 6, 7), Event: "Veronica Party" },
            { Date: new Date(2013, 6, 21), Event: "Martin Birthday" }
        ],
        getTemplate: function (data, events) {
            //for each day, traverse the events and look for equal dates
            for (var i = 0; i < events.length; i++) {
                if (data.date - events[i].Date == 0) {
                    //if dates are equal, check the type of associated event and output the relevant image,
                    // along with a title, that will be shown as tooltip when the image is hovered
                    if (events[i].Event.indexOf("Birthday") != -1) {
                        return "<img width='24px' src='bday.png' title='" + events[i].Event + "'/>";
                    }
                    else {
                        return "<img width='24px' src='cocktail.png' title='" + events[i].Event + "'/>";
                    }
                }
            }
            //#return the date string only if there is no match
            return data.date.getDate();
        }
    });

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
