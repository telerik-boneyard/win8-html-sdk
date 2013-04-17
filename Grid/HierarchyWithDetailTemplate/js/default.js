// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
	"use strict";

	WinJS.Binding.optimizeBindingReferences = true;

	var app = WinJS.Application;
	var activation = Windows.ApplicationModel.Activation;

	function detailTemplateInit(args) {
		return "<div id='chart_" + args.Name + "'/>";
	}

	function detailInit(e) {
		var chart = new Telerik.UI.RadChart(document.getElementById("chart_" + e.data.Name), {
			dataSource: {
				data: Sample.data,
				filter: { field: "CategoryID", operator: "eq", value: e.data.ID }
			},
			series: [
				{
					field: "Price",
					type: "column",
					labels: {
						visible: true,
						template: "$#=value#"
					},
					name: "Price"
				}
			],
			categoryAxis: {
				field: "Name"
			},
			width: 700,
			height: 200
		});
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
				var grid = new Telerik.UI.RadGrid(document.getElementById("grid1"), {
					dataSource: Sample.categories,
					ondetailinit: detailInit,
					detailTemplate: detailTemplateInit,
					columns: [
						{ field: "ID", width: 40 },
						{ field: "Name" }
					]
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

var data = [
    { "ID": 0, "Name": "Bread", "Price": "2.5", "CategoryID": 0 },
    { "ID": 1, "Name": "Milk", "Price": "3.5", "CategoryID": 1 },
    { "ID": 2, "Name": "Vint soda", "Price": "20.9", "CategoryID": 1 },
    { "ID": 3, "Name": "Havina Cola", "Price": "19.9", "CategoryID": 1 },
    { "ID": 4, "Name": "Fruit Punch", "Price": "22.99", "CategoryID": 1 },
    { "ID": 5, "Name": "Cranberry Juice", "Price": "22.8", "CategoryID": 1 },
    { "ID": 6, "Name": "Pink Lemonade", "Price": "18.8", "CategoryID": 1 },
    { "ID": 7, "Name": "DVD Player", "Price": "35.88", "CategoryID": 2 },
    { "ID": 8, "Name": "LCD HDTV", "Price": "1088.8", "CategoryID": 2 },
    { "ID": 9, "Name": "Soup", "Price": "10.5", "CategoryID": 0 },
    { "ID": 10, "Name": "Cake", "Price": "7.5", "CategoryID": 0 },
    { "ID": 11, "Name": "Surface Tablet", "Price": "499 ", "CategoryID": 2 }
];

var categories = [
    { ID: 0, Name: "Food" },
    { ID: 1, Name: "Beverages" },
    { ID: 2, Name: "Electronics" }
];

WinJS.Namespace.define("Sample", {
	data: data,
	categories: categories
});