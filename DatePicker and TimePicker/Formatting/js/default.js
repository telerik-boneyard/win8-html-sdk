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
				//The code below is only related to handling the radio buttons click, 
				//it is not related to the pickers functionality. 
				var radios = document.querySelectorAll(".options input");
				for (var i = 0; i < radios.length; i++) {
					radios[i].addEventListener("click", function (e) {
						var pickerId = e.currentTarget.value;
						var pickerWrappers = document.getElementById("pickers").children;
						for (var i = 0; i < pickerWrappers.length; i++) {
							pickerWrappers[i].style.display = "none";
						}
						var currentpicker = document.getElementById(pickerId);
						currentpicker.style.display = "block";
					});
				}
				radios[0].click();

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
