// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
	"use strict";

	WinJS.Binding.optimizeBindingReferences = true;

	var app = WinJS.Application;
	var activation = Windows.ApplicationModel.Activation;

	function getProducts(args) {
		var regionsList = args.target;
		var territoriesList = document.getElementById("territories").winControl;
		//get index of selected item
		var itemIndex = args.target.index;
		//get data of selected item
		var dataItem = regionsList.dataItem(itemIndex);
		//if selected is the default item, an invalid filter value is provided
		var id = typeof dataItem.RegionID == "number" ? dataItem.RegionID : -1;
		//filter the datasource to include only related items
		territoriesList.dataSource.filter = { field: "RegionID", operator: "eq", value: id };
		territoriesList.dataSource.read();
		territoriesList.enabled = true;
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

				var regionsList = new Telerik.UI.RadDropDownList(document.getElementById("regions"), {
					optionLabel: "Pick a region",
					dataSource: {
						transport: {
							read: {
								url: "http://services.odata.org/Northwind/Northwind.svc/Regions",
								dataType: "json"

							}
						},
						schema: {
							data: "d.results"
						}
					},
					dataTextField: "RegionDescription",
					dataValueField: "RegionID",
					onchange: getProducts
				});

				var territoriesList = new Telerik.UI.RadDropDownList(document.getElementById("territories"), {
					optionLabel: "Pick a territory",
					autoBind: false,
					enabled: false,
					dataSource: {
						transport: {
							read: {
								url: "http://services.odata.org/Northwind/Northwind.svc/Territories",
								dataType: "json"

							}
						},
						schema: {
							data: "d.results"
						}
					},
					dataTextField: "TerritoryDescription",
					dataValueField: "TerritoryID",
				});

				regionsList.dataSource.addEventListener("error", webServiceError);
				territoriesList.dataSource.addEventListener("error", webServiceError);
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
