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
				var multipleValueAxesChartCtrl = new Telerik.UI.RadChart(document.getElementById("multipleValueAxesChart"), {
					dataSource: {
						data: DefaultData.chartData
					},
					legend: {
						position: "bottom"
					},
					series: [{
						name: "Temperature",
						axis: "temperature",
						field: "Temperature",
						color: "deepskyblue"
					}, {
						type: "line",
						name: "Humidity",
						axis: "humidity",
						field: "Humidity",
						color: "red"
					},
					{
						type: "line",
						name: "Rainfall",
						axis: "rainfall",
						field: "Rainfall",
						color: "yellow"
					}
					],
					categoryAxis: {
						field: "Month",
						axisCrossingValue: [0, 12, 12]
					},
					valueAxis: [{
						name: "temperature",
						labels: {
							format: "{0}C"
						},
						color: "deepskyblue"
					}, {
						name: "humidity",
						labels: {
							format: "{0}%"
						},
						color: "red"
					}, {
						name: "rainfall",
						color: "yellow"
					}],
					width: 1000
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
