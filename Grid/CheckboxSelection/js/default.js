// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
	"use strict";

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
				var grid;

				grid = new Telerik.UI.RadGrid(document.getElementById("grid1"), {
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
								fields: {
									ProductName: { type: "string" },
									UnitPrice: { type: "string" }
								}
							}
						}
					},
					filterable: true,
					columns: [
						{
							template: cellTemplate,
							headerTemplate: headerTemplate,
							width: 100
						},
						{ field: "ProductName", title: "Product Name" },
						{ field: "UnitPrice", title: "Unit Price" }
					],
					selectable: "multiple, row",
					height: 400
				});

				grid.addEventListener("databound", function () {
					var checkboxes = $(".selectCheckbox"),
						rows = $(".k-grid-content>table tr");

					for (var i = 0; i < rows.length; i++) {
						rows.click(function (e) {
							e.stopPropagation();
						});
					}

					checkboxes.click(function (e) {
						var checkedRows = $(".k-grid-content > table tr").filter(":has(:checkbox:checked)");
						grid.clearSelection();
						grid.selection = checkedRows;

						if (grid.selection.length === grid.dataSource.view.length) {
							$("#headerCheckbox").prop("checked", true);
						}
						else {
							$("#headerCheckbox").prop("checked", false);
						}

					});
				});

				$("#headerCheckbox").click(function (e) {
					if (e.target.checked) {
						grid.selection = $(".k-grid-content > table tr");
						$(".k-grid-content>table tr .selectCheckbox").prop("checked", true);
					}
					else {
						grid.clearSelection();
						$(".k-grid-content>table tr .selectCheckbox").prop("checked", false);
					}
				});

				function cellTemplate() {
					return toStaticHTML("<input type='checkbox' class='selectCheckbox'></input>");
				}

				function headerTemplate() {
					return toStaticHTML("<input type='checkbox' id='headerCheckbox'></input>");
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

	app.start();
})();
