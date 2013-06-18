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

	function getPhotoTemplate(emp) {
	    var html;

	    MSApp.execUnsafeLocalFunction(function () {
	        html = "<img src='" + emp.Photo + "' />";
	    });
	    return html;
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
							    url: "http://services.odata.org/Northwind/Northwind.svc/Invoices",
								dataType: "json"
							}
						},
						schema: {
							data: "value",
							model: {
								fields: {
									ShipName: { type: "string" },
									ShipCity: { type: "string" },
									ShipCountry: { type: "string" },
									ProductName: { type: "string" },
									Quantity: { type: "number" },
									UnitPrice: { type: "number" },
								}
							}
						}
					},
					columns: [
						{ field: "ShipName", title: "Ship Name", width: 275},
						{ field: "ShipCity", title: "Ship City" },
						{ field: "ShipCountry", title: "Ship Country" },
						{ field: "ProductName", title: "Product", width: 275 },
                        { field: "Quantity", width: 100 },
                        { field: "UnitPrice", title: "Unit Price", format: "{0:c0}", width: 100 }
					],
					sortable: "single, allowUnsort",
					height: 400
				});

				grid.dataSource.addEventListener("error", webServiceError);
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
