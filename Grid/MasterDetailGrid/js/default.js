// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
	"use strict";

	WinJS.Binding.optimizeBindingReferences = true;

	var app = WinJS.Application;
	var activation = Windows.ApplicationModel.Activation;

	function loadChildRecords(args) {
		var grid = args.target;
		var selectedRow = grid.selection;
		var dataItem = grid.dataItem(selectedRow);
		var filter = { field: "CategoryID", operator: 'eq', value: dataItem.CategoryID };

		var childGrid = document.getElementById("grid2").winControl;
		childGrid.dataSource.filter = filter;
		childGrid.dataSource.read();
	}

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
				var masterGrid = new Telerik.UI.RadGrid(document.getElementById("grid1"), {
					dataSource: {
						transport: {
							read: {
								url: "http://services.odata.org/Northwind/Northwind.svc/Categories",
								dataType: "json"
							}
						},
						schema: {
							data: "d.results"
						}
					},
					columns: [
						{ field: "CategoryName", title: "Category Name" },
						{ field: "Description" }
					],
					selectable: "row",
					onchange: loadChildRecords
				});
				masterGrid.dataSource.addEventListener("error", webServiceError);

				var detailGrid = new Telerik.UI.RadGrid(document.getElementById("grid2"), {
					autoBind: false,
					dataSource: {
						transport: {
							read: {
								url: "http://services.odata.org/Northwind/Northwind.svc/Products",
								dataType: "json"
							}
						},
						schema: {
							data: "d.results",
							model: {
								fields: {
									OrderDate: { type: "date" }
								}
							},
						},
					},
					columns: [
						{ field: "ProductID", title: "ID" },
						{ field: "ProductName", title: "Product Name" },
						{ field: "QuantityPerUnit", title: "Quantity" }
					]
				});
				detailGrid.dataSource.addEventListener("error", webServiceError);
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
