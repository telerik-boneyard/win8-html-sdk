// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
	"use strict";

	WinJS.Binding.optimizeBindingReferences = true;

	var app = WinJS.Application;
	var activation = Windows.ApplicationModel.Activation;

	function filterGrid() {
		var grid = document.getElementById("grid1").winControl;
		var categoriesDdl = document.getElementById("categories").winControl;
		var fromNumericBox = document.getElementById("priceFrom").winControl;
		var toNumericBox = document.getElementById("priceTo").winControl;

		var filter = [];

		if (categoriesDdl.value != "") {
			filter.push({ field: "CategoryID", operator: "eq", value: parseInt(categoriesDdl.value) });
		}

		if (fromNumericBox.value) {
			filter.push({ field: "UnitPrice", operator: "gte", value: fromNumericBox.value });
		}

		if (toNumericBox.value > 0) {
			filter.push({ field: "UnitPrice", operator: "lte", value: toNumericBox.value });
		}

		grid.dataSource.filter = filter;
		grid.refresh();
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
					dataSource: {
						transport: {
							read: {
								url: "http://services.odata.org/Northwind/Northwind.svc/Products",
								dataType: "json"
							}
						},
						schema: {
							data: "value",
							model: {
								id: "ProductID",
								fields: {
									ProductName: { type: "string" },
									UnitPrice: { type: "number" },
									CategoryID: { type: "number" }
								}
							}
						}
					},
					columns: [
						{
							field: "ProductName",
							title: "Product"
						},
						{
							field: "UnitPrice",
							title: "Price",
							format: "{0:C}"
						}
					],
					height: 320
				});

				var categoriesDdl = new Telerik.UI.RadDropDownList(document.getElementById("categories"), {
					dataSource: {
						transport: {
							read: {
								url: "http://services.odata.org/Northwind/Northwind.svc/Categories",
								dataType: "json"
							}
						},
						schema: {
							data: "value"
						}
					},
					dataTextField: "CategoryName",
					dataValueField: "CategoryID",
					optionLabel: "Choose a category to filter by..."
				});

				var fromNumericBox = new Telerik.UI.RadNumericBox(document.getElementById("priceFrom"), {
					min: 0,
					placeholder: "Enter min price",
					onchange: function (e) {
						document.getElementById("priceTo").winControl.min = e.target.value;
					}
				});

				var toNumericBox = new Telerik.UI.RadNumericBox(document.getElementById("priceTo"), {
					placeholder: "Enter max price",
					onchange: function (e) {
						document.getElementById("priceFrom").winControl.max = e.target.value;
					}
				});

				filterBtn.addEventListener("click", filterGrid);
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
