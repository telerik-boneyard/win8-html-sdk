// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
	"use strict";

	WinJS.Binding.optimizeBindingReferences = true;

	var app = WinJS.Application;
	var activation = Windows.ApplicationModel.Activation;

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
						data: [
							{ Product: "Southwestern Twisted Chips", Price: 6.99, Discount: 0.2 },
							{ Product: "Top Shelf Combo Appetizer", Price: 9.49, Discount: 0 },
							{ Product: "Blue Cheese and Hazelnut Shortbread", Price: 10.69, Discount: 0.1 },
							{ Product: "Avocado Feta Salsa", Price: 6.99, Discount: 0.2 },
							{ Product: "Red Cherry Boost", Price: 6.99, Discount: 0 },
						]
					},
					columns: [
						{ field: "Product" },
						{
							field: "Price",
							template: "#=Price > 7 ? '<span style=\"color: red\">$' + Price + '</span>': '<span style=\"color: lightgreen\">$' + Price + '</span>'#"
						},
						{
							field: "Discount",
							template: "#=Discount != 0 ? Discount*100 + '% off' : ''#",
							attributes: {
								style: "#=Formatting.getBackground(data)#"
							},
						}
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

WinJS.Namespace.define("Formatting", {
	getBackground: function (data) {
		return data.Discount != 0 ? "background: green" : "background: transparent";
	}
});