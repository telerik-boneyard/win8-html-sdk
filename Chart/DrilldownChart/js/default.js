// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
	"use strict";

	WinJS.Binding.optimizeBindingReferences = true;

	var app = WinJS.Application;
	var activation = Windows.ApplicationModel.Activation;

	function drillDown(e) {
		if (e.target.categoryAxis.baseUnit.toLowerCase() == "years") {
			var date = e.category;
			var year = date.getFullYear();
			var ds = e.target.dataSource;
			var filters = [
			{ field: "Date", operator: "gte", value: new Date(year, 0) },
			{ field: "Date", operator: "lt", value: new Date(year + 1, 0) }];
			ds.filter = filters;

			var chart = e.target;
			chart.categoryAxis.baseUnit = "months";
			chart.refresh();
			document.getElementById("restoreBtn").style.visibility = "visible";
		}
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
				var chart = new Telerik.UI.RadChart(document.getElementById("chart1"), {
					title: { text: "Yearly and monthly review of sales" },
					dataSource: {
						data: Drilldown.sales
					},
					series: [
						{
							type: "column",
							field: "Sales",
							aggregate: "sum",
							name: "Units Sold",
							labels: {
								visible: true
							}
						}
					],
					categoryAxis: {
						field: "Date",
						baseUnit: "years",
						type: "date",
						labels: {
							dateFormats: {
								years: "yyyy",
								months: "MMMM 'yy"
							},
							rotation: 45
						}
					},
					tooltip: {
						visible: true
					},
					onseriesclick: drillDown,
					width: 1000
				});

				document.getElementById("restoreBtn").addEventListener("click", function (e) {
					var chart = document.getElementById("chart1").winControl;
					chart.dataSource.filter = null;
					chart.categoryAxis.baseUnit = "years";
					chart.refresh();
					e.target.style.visibility = "hidden";
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
