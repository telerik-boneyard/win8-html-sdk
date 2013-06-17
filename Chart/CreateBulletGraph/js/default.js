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
            args.setPromise(WinJS.UI.processAll().then(function () {
                var bulletGraphValue = 267;
                var bulletGraphTarget = 256;

                var bulletGraph = new Telerik.UI.RadChart(document.getElementById('bulletgraph'), {
                    height: 90,
                    width: 400,
                    title: {
                        text: "Revenue 2012 YTD (US $ in thousands)",
                        align: "left",
                        font: "14px Segoe UI",
                        padding: {
                            left: 0
                        },
                        margin: {
                            left: 4
                        }
                    },
                    series: [{
                        type: "bullet",
                        color: "#CCFA00",
                        data: [[bulletGraphValue, bulletGraphTarget]],
                        gap: 4,
                        target: {
                            color: "#FF810C",
                            line: {
                                width: 3,
                            }
                        }
                    }],
                    categoryAxis: {
                        visible: false
                    },
                    valueAxis: {
                        min: 0,
                        max: 300,
                        majorGridLines: {
                            visible: false
                        },
                        majorUnit: 50,
                        majorTicks: {
                            size: 4
                        },
                        minorUnit: 10,
                        minorTicks: {
                            visible: true,
                            size: 4
                        },
                        plotBands: [
                        { from: 0, to: 200, color: "#111111" },
                        { from: 200, to: 250, color: "#6B6B6B" },
                        { from: 250, to: 300, color: "#A0A0A0" },
                        ]
                    }
                });  
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
