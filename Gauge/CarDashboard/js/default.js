// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
	"use strict";

	WinJS.Binding.optimizeBindingReferences = true;

	var app = WinJS.Application;
	var activation = Windows.ApplicationModel.Activation;

	var animateInterval;
	function animateDashboard() {
		if (animateInterval) {
			return;
		}

		var GEARS = [0.14, 0.06, 0.035, 0.027, 0.019],
			IDLE_RPM = 0.9,
			CHANGE_RPM = 4,
			CHANGE_DELAY = 400,
			DECAY_RATE = 0.0017,
			TOP_SPEED = 150,
			ACCELERATION = 0.6,
			INTERVAL = 50;

		var speed = 0,
			skip = 0,
			ratio,
			gear = 0;

		function update() {
			document.querySelector("#rpm").winControl.value = GEARS[gear] * speed + IDLE_RPM;
			document.querySelector("#speed").winControl.value = speed;
		}

		animateInterval = setInterval(function () {
			if (speed < TOP_SPEED) {
				if (GEARS[gear] * speed > CHANGE_RPM && gear < GEARS.length) {
					gear++;
					skip = CHANGE_DELAY / INTERVAL;
					update();
				}

				if (skip-- < 0) {
					speed += ACCELERATION - (DECAY_RATE * speed);
					update();
				}
			} else {
				skip = 100;
				speed = 0;
				gear = 0;
			}
		}, INTERVAL);
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
				//logic used to animate the gauges
				animateInterval = null;
				animateDashboard();
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
