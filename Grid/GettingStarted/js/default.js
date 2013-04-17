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
				var grid = new Telerik.UI.RadGrid(document.getElementById("grid1"), {
					dataSource: {
						data: [
							{ Name: "Peter", Age: 23, Points: 22.6 },
							{ Name: "Mary", Age: 30, Points: 24 },
							{ Name: "Mark", Age: 27, Points: 28.8 },
							{ Name: "Damon", Age: 23, Points: 23 },
							{ Name: "Harry", Age: 29, Points: 27.2 },
							{ Name: "Gary", Age: 24, Points: 22.6 },
							{ Name: "Melanie", Age: 24, Points: 24 },
							{ Name: "Sarah", Age: 32, Points: 29 },
							{ Name: "Simon", Age: 25, Points: 31 },
							{ Name: "Valery", Age: 29, Points: 27.5 }
						],
						schema: {
							model: {
								fields: {
									Name: { type: "string" },
									Age: { type: "number" },
									Points: { type: "number" }
								}
							}
						}
					},
					height: 300
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
