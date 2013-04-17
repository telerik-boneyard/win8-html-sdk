// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
	"use strict";

	WinJS.Binding.optimizeBindingReferences = true;

	var app = WinJS.Application;
	var activation = Windows.ApplicationModel.Activation;

	function getChartTemplate(data) {
		var options = {
			series: [{
				data: data.Sales,
				name: 'Sales'
			},
			{
				data: data.Customers,
				name: 'Customers'
			}
			],
			seriesDefaults: {
				type: 'line',
				markers: {
					visible: false
				}
			},
			valueAxis: {
				labels: { visible: false },
				line: { visible: false },
				majorGridLines: { visible: false }
			},
			categoryAxis: {
				labels: { visible: false },
				line: { visible: false },
				majorGridLines: { visible: false }
			},
			width: 250,
			height: 60
		};
		return "<div class='chart' data-win-control='Telerik.UI.RadChart' data-win-options='" + JSON.stringify(options) + "'></div>";
	}

	function initializeControls(e) {
		if (e.target.element.offsetHeight) {
			WinJS.UI.processAll(e.target.element);
		}
		else {
			setTimeout(initializeControls, 500);
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
				var gridWithChart = new Telerik.UI.RadGrid(document.getElementById("grid1"), {
					dataSource: {
						data: ChartSampleData.employees
					},
					columns: [
						{ field: 'Name', title: 'Name' },
						{
							title: 'Sales',
							template: getChartTemplate
						}
					],
					ondatabound: initializeControls
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

var employees = [
    { Name: "Nancy Davolio", Sales: [5, 12, 9, 21, 23], Customers: [5, 7, 7, 16, 17] },
    { Name: "Andrew Fuller", Sales: [10, 12, 15, 19, 21], Customers: [7, 9, 8, 12, 13] },
    { Name: "Janet Levering", Sales: [14, 15, 14, 21, 18], Customers: [9, 12, 12, 16, 15] },
    { Name: "Margaret Peacock", Sales: [18, 24, 21, 25, 26], Customers: [12, 16, 16, 18, 20] },
    { Name: "Michael Suyama", Sales: [16, 13, 17, 19, 23], Customers: [10, 10, 13, 15, 19] }
];

WinJS.Namespace.define("ChartSampleData", {
	employees: employees
});