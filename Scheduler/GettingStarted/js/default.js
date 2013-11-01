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

            var scheduler = new Telerik.UI.RadScheduler(schedulerWrapper, {
                height: 500,
                date: new Date(2013, 8, 16),
                dataSource: [
                    {
                        start: new Date(2013, 8, 16, 9),
                        end: new Date(2013, 8, 16, 10),
                        title: "Meeting with Marta",
                        roomId: 1
                    },
                    {
                        start: new Date(2013, 8, 16, 10, 30),
                        end: new Date(2013, 8, 16, 11, 30),
                        title: "Meeting with Paul West",
                        roomId: 2
                    },
                    {
                        start: new Date(2013, 8, 16, 13),
                        end: new Date(2013, 8, 16, 14),
                        title: "Meeting with Technical Team",
                        roomId: 2
                    }
                ],
                resources: [
                    {
                        field: "roomId",
                        title: "Room",
                        name: "Room",
                        dataSource: [
                          {
                              text: "Small meeting room",
                              value: 1,
                              color: "pink"
                          },
                          {
                              text: "Big meeting room",
                              value: 2,
                              color: "purple"
                          }
                        ]
                    }
                ]
            });

            args.setPromise(WinJS.UI.processAll());
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
