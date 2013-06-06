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
				var participants = [{
					Name: "Peter Johnson",
					BirthDate: new Date(1979, 1, 23),
					Email: "peter.johnson@example.com",
					HomePage: "http://example.com",
					Points: 25,
					ParticipantID: "19794321",
					RecID: 1
				}, {
					Name: "Jack Miles",
					BirthDate: new Date(1982, 9, 10),
					Email: "jack.miles@example.com",
					HomePage: "http://example.com",
					Points: 20,
					ParticipantID: "19822136",
					RecID: 2
				}
				];

				var grid = new Telerik.UI.RadGrid(document.getElementById("grid1"), {
					dataSource: {
						data: participants,
						schema: {
							model:
							{
								id: "RecID",
								fields: {
									Name: {
										validation: {
											required: true
										}
									},
									BirthDate: {
										type: "date",
										validation: {
											date: true
										}
									},
									Email: {
										validation: {
											email: true
										}
									},
									HomePage: {
										validation: {
											url: true
										}
									},
									Points: {
										type: "number",
										validation: {
											step: 5
										}
									},
									ParticipantID: {
										validation: {
											pattern: "\\d{8}",
											checkYear: function (el) {
												var value = el.val().substring(0, 4);
												var year = grid.dataItem(el.closest("tr")[0]).BirthDate.getFullYear();
												if (value != year) {
													el.attr("data-checkYear-msg", "Participant ID should start with year of birth");
													return false;
												}
												return true;
											}
										}
									},
									RecID: {
										editable: false,
										nullable: true
									}
								}
							}
						}
					},
					columns: [
						{ field: "Name" },
						{ field: "BirthDate", template: "#=BirthDate.toLocaleDateString()#", title: "Date of birth", },
						{ field: "Email" },
						{ field: "HomePage", title: "Site" },
						{ field: "Points" },
						{ field: "ParticipantID" },
						{ field: "RecID" }
					],
					editable: {
						enabled: true,
						mode: "cellBatch"
					},
					onsave: Validation.insertId
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

	WinJS.Namespace.define("Validation", {
		insertId: WinJS.Utilities.markSupportedForProcessing(function (e) {
			//set id to inserted items
			if (!e.model.RecID) {
				e.model.RecID = e.target.dataSource.data.length;
			}
		})
	})
})();
