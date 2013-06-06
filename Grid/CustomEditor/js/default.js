// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
	"use strict";

	WinJS.Binding.optimizeBindingReferences = true;

	var app = WinJS.Application;
	var activation = Windows.ApplicationModel.Activation;

	function getRatingEditor(container, options) {
		var ratingWrapper = document.createElement("div");
		//create a hidden input to be able to store the cell value
		var valueInput = document.createElement("input");
		valueInput.type = "hidden";
		valueInput.name = options.field;

		$(valueInput).appendTo(container);
		$(ratingWrapper).appendTo(container);
		var rating = new WinJS.UI.Rating(ratingWrapper, {
			//access the Rating value from the passed data item
			userRating: options.model.Rating,
			tooltipStrings: ["Bad", "Wouldn't recommend", "Good", "Great", "Superb!"],
			//handle the onchange event to update the hidden input with the latest rating value
			onchange: function (e) {
				var input = $("input[type=hidden]", $(e.target).parent());
				input.val(e.target.winControl.userRating).change();
			}
		});
	}

	var dataArrayBikes = [
		{ id: 1, BikeModelName: "BlueBird", BikeType: "Track", BikeModelYear: 2012, Rating: 4 },
		{ id: 2, BikeModelName: "SeaWind", BikeType: "Track", BikeModelYear: 2011, Rating: 3 },
		{ id: 3, BikeModelName: "StormLightening", BikeType: "Track", BikeModelYear: 2010, Rating: 5 },
		{ id: 4, BikeModelName: "Master", BikeType: "Road", BikeModelYear: 2012, Rating: 4 },
		{ id: 5, BikeModelName: "ProRace", BikeType: "Road", BikeModelYear: 2011, Rating: 4 },
		{ id: 6, BikeModelName: "Blade", BikeType: "Road", BikeModelYear: 2013, Rating: 5 },
		{ id: 7, BikeModelName: "Trinity", BikeType: "Road", BikeModelYear: 2012, Rating: 3 },
		{ id: 8, BikeModelName: "Monster", BikeType: "Mountain", BikeModelYear: 2012, Rating: 4 },
		{ id: 9, BikeModelName: "Dragster", BikeType: "Mountain", BikeModelYear: 2011, Rating: 4 },
		{ id: 10, BikeModelName: "Rocker", BikeType: "Mountain", BikeModelYear: 2013, Rating: 4 },
		{ id: 11, BikeModelName: "Destroyer", BikeType: "Mountain", BikeModelYear: 2012, Rating: 5 },
		{ id: 12, BikeModelName: "JBeeX", BikeType: "Bmx", BikeModelYear: 2012, Rating: 4 },
		{ id: 13, BikeModelName: "SBeeX", BikeType: "Bmx", BikeModelYear: 2011, Rating: 3 },
		{ id: 14, BikeModelName: "Junkee", BikeType: "Junior", BikeModelYear: 2013, Rating: 4 },
		{ id: 15, BikeModelName: "Rabbit", BikeType: "Junior", BikeModelYear: 2012, Rating: 3 },
		{ id: 16, BikeModelName: "Handy", BikeType: "Portable", BikeModelYear: 2011, Rating: 4 },
		{ id: 17, BikeModelName: "Foldy", BikeType: "Portable", BikeModelYear: 2012, Rating: 4 },
		{ id: 18, BikeModelName: "RoadQueen", BikeType: "Racing", BikeModelYear: 2011, Rating: 5 },
		{ id: 19, BikeModelName: "RaceStorm", BikeType: "Racing", BikeModelYear: 2012, Rating: 4 },
		{ id: 20, BikeModelName: "RacingBully", BikeType: "Racing", BikeModelYear: 2012, Rating: 5 },
	];

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
				var grid = new Telerik.UI.RadGrid(grid1, {
					dataSource: {
						data: dataArrayBikes,
						schema: {
							model: {
								id: "id",
								fields: {
									id: { editable: false, type: "number" },
									BikeModelName: { type: "string", validation: { required: true } },
									BikeType: { type: "string" },
									BikeModelYear: { type: "number", defaultValue: 2013, validation: { max: 2013 } },
									Rating: { type: "number" }
								}
							}
						}
					},
					columns: [
					{ field: "BikeModelName", title: "model" },
					{ field: "BikeType", title: "type", values: ["Road", "Mountain", "Racing", "Track", "Bmx", "Portable", "Junior"], width: 150 },
					{ field: "BikeModelYear", title: "year", format: "{0:yyyy}", width: 150 },
					{ field: "Rating", title: "rating", editor: getRatingEditor }
					],
					editable: {
						enabled: true,
						mode: "row"
					},
					onsave: function (e) {
						//set id to inserted items
						if (e.model.id == 0) {
							e.model.id = e.target.dataSource.data.length;
						}
					},
					height: 330
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