// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    var chart, grid, CPUStats;
    var properties = ["MYCT", "MMIN", "MMAX", "CACH", "CHMIN", "CHMAX", "PRP", "ERP"];
    var maxProperties = {};

    // initializing a new DataSource control that reads from a local file.
    var dataSource = new Telerik.Data.DataSource({
        transport: {
            read: {
                url: 'data/CPUStats.json',
                dataType: 'json'
            }
        }
    });

    // namespace for exposing the chart categories and grid dataSource to be used in the mark-up.
    WinJS.Namespace.define("CPUStats", {
        categories: properties,
        dataSource: dataSource
    });

    // given a CPU property name, this function returns the max value from all values for this property.
    function getMaxValue(property) {
        var CPUArray = Array.prototype.slice.call(CPUStats);
        var max = Math.max.apply(null, Object.keys(CPUArray).map(function (e) {
            return CPUStats[e][property];
        }));

        return max;
    };

    // reading the DataSource, getting the max values per property and pushing them in an object.
    dataSource.read().then(function () {
        CPUStats = dataSource.view;

        properties.forEach(function (property) {
            var maxPropValue = getMaxValue(property);
            maxProperties[property] = maxPropValue;
        });
    }, function (error) {
        debugger;
    });

    // a function that gets a property value rating from 0 to 10. It is multiplied by 2 for better scaling.
    function getRating(value, max) {
        return (2 * value / max) * 10;
    }

    // the "Add" button click handler. Gets the RadGrid selection, generates ratings, creates a new series and refreshes the chart.
    function addGridSelectionToChart() {
        var selection = grid.selection;
        var item;

        if (selection.length > 0) {
            item = grid.dataItem(selection[0]);

            var series = new Telerik.UI.Chart.RadarAreaSeries();
            series.name = item.vendorName + " " + item.modelName;
            var data = [];

            properties.forEach(function (property) {
                var rating = getRating(item[property], maxProperties[property]);
                data.push(rating);
            });

            series.data = data;
            chart.series.push(series);

            chart.refresh();
        }
    }

    // the "Clear" button click handler. Sets the series property of the Chart to a single empty 'radarArea' series.
    // We do this to keep the radar chart radial grid visible even if there are no series in the chart.
    function clearChartSeries() {
        chart.series = [{
            type: 'radarArea'
        }];
        chart.refresh();
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
            args.setPromise(WinJS.UI.processAll().then(function() {
                chart = Telerik.UI.find.Chart("#radarChart");
                grid = Telerik.UI.find.Grid("#dataGrid");

                document.getElementById("add-btn").addEventListener("click", addGridSelectionToChart);
                document.getElementById("clear-btn").addEventListener("click", clearChartSeries);
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
