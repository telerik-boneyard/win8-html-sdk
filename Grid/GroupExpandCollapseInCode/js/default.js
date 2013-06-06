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
						data: People.generatePeople(50),
						group: [{ field: "City" }]
					},
					groupable: "enabled",
					columns: [
                        { field: "FirstName", title: "First Name" },
                        { field: "LastName", title: "Last Name" },
						{ field: "Title", title: "Position" },
						{ field: "City" }
					],
					height: 350
				});

				btn.addEventListener("click", function () {
				//select all group headers
					var groupHeaders = grid.element.querySelectorAll(".k-grid-content tr.k-grouping-row");
					if (groupHeaders.length > 0) {
						var firstGroup = groupHeaders[0];
						//check if first header is expanded or collapsed using its expand/collapse button state
						var icon = firstGroup.getElementsByClassName("k-icon")[0];
						if (icon.classList.contains("k-i-collapse")) {
							grid.collapseGroup(groupHeaders);
						}
						else {
							grid.expandGroup(groupHeaders);
						}
					}
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

	WinJS.Namespace.define("People", {
		generatePeople: WinJS.Utilities.markSupportedForProcessing(function (itemCount) {
			var firstNames = ["Nancy", "Andrew", "Janet", "Margaret", "Steven", "Michael", "Robert", "Laura", "Anne", "Nige"],
			lastNames = ["Davolio", "Fuller", "Leverling", "Peacock", "Buchanan", "Suyama", "King", "Callahan", "Dodsworth", "White"],
			cities = ["Seattle", "Tacoma", "Kirkland", "Redmond", "London", "Philadelphia", "New York", "Seattle", "London", "Boston"],
			titles = ["Accountant", "Vice President, Sales", "Sales Representative", "Technical Support", "Sales Manager", "Web Designer",
			"Software Developer", "Inside Sales Coordinator", "Chief Techical Officer"];

			var data = [];

			do {
				var firstName = firstNames[Math.floor(Math.random() * firstNames.length)],
					lastName = lastNames[Math.floor(Math.random() * lastNames.length)],
					city = cities[Math.floor(Math.random() * cities.length)],
					title = titles[Math.floor(Math.random() * titles.length)];

				data.push({
					Id: data.length + 1,
					FirstName: firstName,
					LastName: lastName,
					City: city,
					Title: title
				});
			} while (data.length < itemCount);
			return data;
		})
	});
})();
