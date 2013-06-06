// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
	"use strict";

	WinJS.Binding.optimizeBindingReferences = true;

	var app = WinJS.Application;
	var activation = Windows.ApplicationModel.Activation;

	function webServiceError() {
		var msg = Windows.UI.Popups.MessageDialog("Web service is currently down, try again later");
		msg.showAsync();
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
			args.setPromise(WinJS.UI.processAll().then(function () {


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

	WinJS.Namespace.define("DataEditing", {
		insertId: WinJS.Utilities.markSupportedForProcessing(function (e) {
			//set id to inserted items
			if (!e.model.RecID) {
				e.model.RecID = e.target.dataSource.data.length;
			}
		}),
		data: [{
			Name: 'Kenya Bruni',
			City: 'Anchorage',
			JobTitle: 'Chief Accounting Officer',
			RecID: 1
		}, {
			Name: 'Karry Evertt',
			City: 'San Antonio',
			JobTitle: 'Chief Information Technology Officer',
			RecID: 2
		}, {
			Name: 'Jacklyn Emayo',
			City: 'Boston',
			JobTitle: 'Chief Development Officer',
			RecID: 3
		}, {
			Name: 'Robin Crotts',
			City: 'New York',
			JobTitle: 'Chief Financial Officer',
			RecID: 4
		}]
	})
})();
