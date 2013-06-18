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
				var grid = new Telerik.UI.RadGrid(document.getElementById("grid1"), {
					dataSource: {
						transport: {
							read: {
								url: "http://services.odata.org/Northwind/Northwind.svc/Employees",
								dataType: "json"
							}
						},
						schema: {
							data: "value",
							model: {
								fields: {
									FirstName: { type: "string" },
									LastName: { type: "string" },
									BirthDate: { type: "date" },
									Title: { type: "string" },
									PostalCode: { type: "string" },
									City: { type: "string" }
								}
							}
						}
					},
					sortable: "single, allowUnsort",
					filterable: true,
					columns: [
					{
						title: "Picture",
						template: "<img src='http://demos.telerik.com/aspnet-ajax/salesdashboard/Images/#= FirstName #_#=LastName#.png' />"
					},
					{
						field: "FirstName",
						title: "First Name",
						filterable: false
					},
					{
						field: "LastName",
						title: "Last Name"
					},
					{
						field: "BirthDate",
						format: "{0:MMMM dd, yyyy}",
						title: "Birth Date"
					},
					{
						field: "Title",
						sortable: false,
						width: 200,
						attributes: { style: "font-weight: bold; text-align: center" },
						headerAttributes: { style: "text-align: center" }
					},
					{
						field: "PostalCode",
						sortable: false,
						title: "Postal Code",
						width: 140
					},
					{
						field: "City"
					}
					],
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
