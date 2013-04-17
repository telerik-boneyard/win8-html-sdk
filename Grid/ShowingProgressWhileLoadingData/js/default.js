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
				var work = WinJS.Application.working();

				var grid = new Telerik.UI.RadGrid(document.getElementById("grid1"), {
					dataSource: {
						transport: {
							read: {
								url: 'http://services.odata.org/Northwind/Northwind.svc/Order_Details',
								dataType: 'json'
							}
						},
						schema: {
							data: 'd.results'
						},
						filter: { field: "Discount", operator: "gt", value: 0 }
					},
					columns: [
						{ field: "OrderID", title: "Order ID" },
						{ field: "ProductID", title: "Product ID" },
						{ field: "UnitPrice", title: "Unit Price ($)" },
						{ field: "Quantity", title: "Quantity" },
						{ field: "Discount", title: "Discount", format: "{0:p}" },
						{
							title: "Total Price",
							template: "<span style='color:cyan'>#='$'+(UnitPrice * Quantity * (1-Discount)).toFixed(2) #</span>"
						}
					],
					ondatabound: dataBound,
					height: 410,
					sortable: "multiple, allowUnsort"
				});

				grid.dataSource.addEventListener("error", webServiceError);

				function dataBound(e) {
					work.finished();
					e.target.removeEventListener("databound", dataBound);
				}
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

	function working() {
		document.getElementById("progress").classList.remove("hidden");
		return {
			finished: function () {
				document.getElementById("progress").classList.add("hidden");
			}
		}
	}

	app.working = working;

	app.start();
})();
