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
        salesPerYear: [
            { Year: 1980, UnitsInStock: 500, UnitPrice: 50, Color: '#ff6644', Name: 'Sales in 1980' },
            { Year: 1990, UnitsInStock: 523, UnitPrice: 310, Color: '#33ccff', Name: 'Sales in 1990' },
            { Year: 2000, UnitsInStock: 604, UnitPrice: 700, Color: '#336699', Name: 'Sales in 2000' },
            { Year: 2010, UnitsInStock: 650, UnitPrice: 1000, Color: '#11cc99', Name: 'Sales in 2010' }
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
