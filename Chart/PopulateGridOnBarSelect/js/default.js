// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    var grid, gridTitle, gridContainer, chart;

    function ChartSeriesClickHandler(e) {
        var item = e.dataItem;
        var chartDS = chart.dataSource.data;

        // setting the red color of the selected item and removing the red color from the previous selected item
        for (var i = 0; i < chartDS.length; i++) {
            if (chartDS[i].athleteId == item.athleteId) {
                chartDS[i].color = "red";
            } else if (chartDS[i].color != "#1e98e4") {
                chartDS[i].color = "#1e98e4";
            }
        }

        chart.dataSource.data = chartDS;
        chart.refresh();

        // modifying the h2 title element's innerText
        gridTitle.innerText = item.athleteName + " - " + item.medalsCount + " medals";

        // setting up the filter for the RadGrid
        var filter = [];
        filter.push({ field: "athleteName", operator: "eq", value: item.athleteName });
        grid.dataSource.filter = filter;

        grid.dataSource.read();
        gridContainer.style.visibility = "visible";
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
                gridContainer = document.getElementById('gridcontainer');
                gridTitle = document.getElementById('gridtitle');

                grid = new Telerik.UI.RadGrid(document.getElementById('grid'), {
                    dataSource: {
                        transport: {
                            read: {
                                url: "/js/athletesResults.json",
                                dataType: "json"
                            }
                        }
                    },
                    columns: [
                        { field: 'sport', width: 500 },
                        { field: 'year' },
                        { field: 'medal' },
                    ],
                    height: 200,
                    autoBind: false
                });

                chart = new Telerik.UI.RadChart(document.getElementById('chart'), {
                    dataSource: {
                        transport: {
                            read: {
                                url: "/js/athletesMedals.json",
                                dataType: "json"
                            }
                        }
                    },
                    height: 300,
                    series: [
                        {
                            type: 'column',
                            name: 'Medals Count',
                            field: 'medalsCount',
                            colorField: 'color'
                        }
                    ],
                    categoryAxis: {
                        field: 'athleteName',
                        labels: {
                            rotation: 45,
                            margin: {
                                left: 25
                            }
                        }
                    },
                    transitions: false,
                    onseriesclick: ChartSeriesClickHandler
                });

                chart.refresh();
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
