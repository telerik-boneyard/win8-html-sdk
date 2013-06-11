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
            args.setPromise(WinJS.UI.processAll());
        }
    };

    WinJS.Namespace.define("SampleData", {
        salesPerDate: [
            { Date: new Date(2008, 11, 30), Value: 10 },
            { Date: new Date(2008, 8, 30), Value: 6.3 },
            { Date: new Date(2009, 5, 30), Value: 5 },
            { Date: new Date(2009, 2, 30), Value: 5.3 },
            { Date: new Date(2010, 11, 30), Value: 8.7 },
            { Date: new Date(2010, 8, 30), Value: 5.5 },
            { Date: new Date(2011, 5, 30), Value: 7.6 },
            { Date: new Date(2012, 2, 30), Value: 9.2 }
        ]
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
