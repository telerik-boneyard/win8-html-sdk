// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
	"use strict";

	WinJS.Binding.optimizeBindingReferences = true;

	var app = WinJS.Application;
	var activation = Windows.ApplicationModel.Activation;
	var tokenInput,
	slider,
	chart;

	function filterChart() {
		//gather the filters from the slider and the token input
		var sliderValues = slider.values;
		var inputFilter;
		var sliderFilter = {
			logic: "and",
			filters: [
				{ field: "medalsCount", operator: "gte", value: sliderValues[0] },
				{ field: "medalsCount", operator: "lte", value: sliderValues[1] }
			]
		};

		if (tokenInput.value.length > 0) {
			var values = tokenInput.value;
			var filter = [];
			for (var i = 0; i < values.length; i++) {
				filter.push({ field: "athleteId", operator: "eq", value: values[i] })
			}
			//change the logic for the result filter to "or" (default is "and")
			inputFilter = { logic: "or", filters: filter };
		}
		else {
			inputFilter = { field: "athleteId", operator: "eq", value: -1 }
		}

		//merge the filter expressions and assign them to the chart's data source
		chart.dataSource.filter = { logic: "and", filters: [sliderFilter, inputFilter] };
		chart.refresh();
	}

	function setSlider(e) {
		//assign the min and max values only at initial load of the chart
		if (!e.target.dataSource.filter) {
			slider = document.querySelector("#medalsCountSlider").winControl;
			slider.max = e.target.dataSource.aggregates.medalsCount.max;
			slider.values = [0, slider.max]
		}
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
				//available after processAll() has been executed, for eariler usage of the variables, you need to instantiate them first, see setSlider()
				tokenInput = Telerik.UI.to.TokenInput(document.querySelector("#athletesInput").winControl);
				slider = Telerik.UI.to.RangeSlider(document.querySelector("#medalsCountSlider").winControl);
				chart = Telerik.UI.to.Chart(document.querySelector("#resultsChart").winControl);

				//preselect values in the token input to be able to display series in the chart
				tokenInput.value = [18397, 16893, 21144, 25163, 5120, 12503];
				filterChart();
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

	WinJS.Namespace.define("FilteringChart", {
		setSlider: WinJS.Utilities.markSupportedForProcessing(setSlider),
		filterChart: WinJS.Utilities.markSupportedForProcessing(filterChart)
	});
})();
