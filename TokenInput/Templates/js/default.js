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

    WinJS.Namespace.define("Templates", {
        Cities: [
            { City: "Beijing" },
			{ City: "Berlin" },
			{ City: "Bombay" },
			{ City: "Bonn" },
			{ City: "Boston" },
			{ City: "Cairo" },
			{ City: "Cancun" },
			{ City: "Cannes" },
			{ City: "Frankfurt" }
        ],
        GetItemTemplate: WinJS.Utilities.markSupportedForProcessing(function (item) {
            var template = ["<div class='tItem'><img height='60' src='/images/Cities/" + item.City + ".jpg'/>",
		        "<h3>" + item.City + "</h3></div>"].join("");
            return template;
        }),
        GetTagTemplate: WinJS.Utilities.markSupportedForProcessing(function (item) {
            var template = ["<img style='vertical-align: middle' height='25' src='/images/Cities/" + item.City + ".jpg'/>",
		        "<span>&nbsp;" + item.City + "</span>"].join("");
            return template;
        })
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
