// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    // The four functions generate the coordinates for the curves based on the equations and given angles
    // The main point here is the polar angle coordinates accept values from 0 to 360, so angles above 360
    // have to be converted into their 0-360 equivalents.
    function generateRhodoneaFuncCoords() {
        var coordinates = [];

        for (var angle = 0; angle <= 360; angle += 2) {
            var distance = Math.sin((5 * angle) * Math.PI / 180);
            coordinates.push([angle, distance]);
        }

        return coordinates;
    }

    function generateArchimedesFuncCoords() {
        var coordinates = [];

        for (var angle = 0; angle <= 1440; angle += 20) {
            var distance = angle * Math.PI / 180;
            coordinates.push([angle - (Math.floor(angle / 360)) * 360, distance]);
        }

        return coordinates;
    }

    function generateFermatFuncPosCoords() {
        var coordinates = [];

        for (var angle = 0; angle <= 1440; angle += 5) {
            var distance = Math.sqrt(4 * angle);
            coordinates.push([angle - (Math.floor(angle / 360)) * 360, distance]);
        }

        return coordinates;
    }

    function generateFermatFuncNegCoords() {
        var coordinates = [];

        for (var angle = 0; angle <= 1440; angle += 5) {
            var distance = Math.sqrt(4 * angle);
            coordinates.push([(angle + 180) - Math.floor((angle + 180) / 360) * 360, distance]);
        }

        return coordinates;
    }

    // Namespaces for exposing the coordinate arrays globally so they can be used in the mark-up.
    WinJS.Namespace.define("RhodoneaFunction", {
        coordinates: WinJS.Utilities.markSupportedForProcessing(generateRhodoneaFuncCoords())
    });

    WinJS.Namespace.define("ArchimedesFunction", {
        coordinates: WinJS.Utilities.markSupportedForProcessing(generateArchimedesFuncCoords())
    });

    WinJS.Namespace.define("FermatFunction", {
        positiveCoords: WinJS.Utilities.markSupportedForProcessing(generateFermatFuncPosCoords()),
        negativeCoords: WinJS.Utilities.markSupportedForProcessing(generateFermatFuncNegCoords())
    });

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
