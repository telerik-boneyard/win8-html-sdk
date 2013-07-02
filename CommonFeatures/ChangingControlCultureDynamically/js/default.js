// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    // defining variables for the initial state
    var startDefault = new Date(2012, 0, 1);
    var endDefault = new Date(2012, 11, 31);

    // defining variables for the controls to use globally
    var startDatePicker, endDatePicker, chart;

    // defining an array with the culture strings to use by index
    var cultures = ["en-US", "de-DE", "es-ES", "fr-FR", "el-GR", "it-IT", "ja-JP", "ru-RU", "zh-CN"];

    // the dataSource for the RadChart
    var sales = [
            { Date: new Date(2010, 0, 25), Sales: 230 },
            { Date: new Date(2010, 1, 25), Sales: 250 },
            { Date: new Date(2010, 2, 25), Sales: 330 },
            { Date: new Date(2010, 3, 25), Sales: 530 },
            { Date: new Date(2010, 4, 25), Sales: 210 },
            { Date: new Date(2010, 5, 25), Sales: 450 },
            { Date: new Date(2010, 6, 25), Sales: 345 },
            { Date: new Date(2010, 7, 25), Sales: 432 },
            { Date: new Date(2010, 8, 25), Sales: 653 },
            { Date: new Date(2010, 9, 25), Sales: 478 },
            { Date: new Date(2010, 10, 25), Sales: 456 },
            { Date: new Date(2010, 11, 25), Sales: 725 },
            { Date: new Date(2011, 0, 25), Sales: 634 },
            { Date: new Date(2011, 1, 25), Sales: 645 },
            { Date: new Date(2011, 2, 25), Sales: 775 },
            { Date: new Date(2011, 3, 25), Sales: 794 },
            { Date: new Date(2011, 4, 25), Sales: 657 },
            { Date: new Date(2011, 5, 25), Sales: 873 },
            { Date: new Date(2011, 6, 25), Sales: 675 },
            { Date: new Date(2011, 7, 25), Sales: 456 },
            { Date: new Date(2011, 8, 25), Sales: 579 },
            { Date: new Date(2011, 9, 25), Sales: 475 },
            { Date: new Date(2011, 10, 25), Sales: 477 },
            { Date: new Date(2011, 11, 25), Sales: 576 },
            { Date: new Date(2012, 0, 25), Sales: 685 },
            { Date: new Date(2012, 1, 25), Sales: 675 },
            { Date: new Date(2012, 2, 25), Sales: 535 },
            { Date: new Date(2012, 3, 25), Sales: 645 },
            { Date: new Date(2012, 4, 25), Sales: 695 },
            { Date: new Date(2012, 5, 25), Sales: 573 },
            { Date: new Date(2012, 6, 25), Sales: 586 },
            { Date: new Date(2012, 7, 25), Sales: 822 },
            { Date: new Date(2012, 8, 25), Sales: 831 },
            { Date: new Date(2012, 9, 25), Sales: 820 },
            { Date: new Date(2012, 10, 25), Sales: 785 },
            { Date: new Date(2012, 11, 25), Sales: 850 }
    ];

    // a closure to attach event handlers to all the buttons in a for loop
    function cultureBtnHandler(cultureString) {
        var cultChange = cultureString;

        return function changeCulture() {
            startDatePicker.culture = cultChange;
            endDatePicker.culture = cultChange;
            chart.categoryAxis.labels.culture = cultChange;
            chart.refresh();
        };
    };

    // defining a namespace to use the functions in the mark-up. Chart dataSource and the refresh function.
    WinJS.Namespace.define("Chart", {
        DataSource: new Telerik.Data.DataSource({
            data: sales,
            filter: [
                { field: "Date", operator: "gte", value: startDefault },
                { field: "Date", operator: "lte", value: endDefault }
            ]
        }),
        refresh: function () {
            var chartDS = chart.dataSource;
            var startDate = new Date(startDatePicker.value.getFullYear(), startDatePicker.value.getMonth(), 1);
            var endDate = new Date(endDatePicker.value.getFullYear(), endDatePicker.value.getMonth(), 31);;

            if (startDate > endDate) {
                var messageDialog = new Windows.UI.Popups.MessageDialog("The 'From' date cannot be a later date than the 'To' date");
                messageDialog.showAsync();
            }

            chartDS.filter = [
                { field: "Date", operator: "gte", value: startDate },
                { field: "Date", operator: "lte", value: endDate }
            ];
            chart.dataSource = chartDS;
            chart.refresh();
        }
    });

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
                // defining the controls properties and attaching event handlers to the buttons
                startDatePicker = Telerik.UI.find.DatePicker("#pickerMin");
                endDatePicker = Telerik.UI.find.DatePicker("#pickerMax");
                chart = Telerik.UI.find.Chart("#chart");

                startDatePicker.value = startDefault;
                endDatePicker.value = endDefault;

                var refreshChartBtn = document.getElementById("refreshChartBtn");
                refreshChartBtn.addEventListener("click", Chart.refresh);

                var cultureBtns = document.querySelectorAll(".cultureBtn");
                var cultureCount = cultureBtns.length;

                for (var i = 0; i < cultureCount; i++) {
                    var changeCulture = cultureBtnHandler(cultures[i]);
                    cultureBtns[i].addEventListener("click", changeCulture);
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
