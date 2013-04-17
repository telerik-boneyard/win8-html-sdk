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
							data: "d.results"
						}
					},
					columns: [{ title: 'Person Info' }, { title: 'Job Info' }],
					rowTemplate: Rows.rowTemplate,
					altRowTemplate: Rows.altRowTemplate,
					height: 500
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

WinJS.Namespace.define("Rows", {
	rowTemplate: function (item) {
		var firstCell = ["<td><div class='pItem'>",
			"<img src='http://demos.telerik.com/aspnet-ajax/salesdashboard/Images/" + item.FirstName + "_" + item.LastName + ".png' />",
			item.FirstName + " " + item.LastName,
			"</div><div class='notes'>",
			item.Notes + "</div></td>"].join("");

		var secondCell = ["<td><p>Position: ",
			item.Title + "</p><p>Works in: ",
			item.City + ", " + item.Country,
			"</p><p>Extension: " + item.Extension + "</p></td>"].join("");

		var template = "<tr>" + firstCell + secondCell + "</tr>";

		return template;
	},

	altRowTemplate: function (item) {
		//get the regular template content
		var template = Rows.rowTemplate(item);
		//set the different class name for alt rows
		template = template.replace("<tr", "<tr class='altRow'");
		return template;
	}
});