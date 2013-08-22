// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    var data = [
    {
        "ProductID": 873,
        "Name": "Patch Kit/8 Patches",
        "ListPrice": "2.2900"
    },
    {
        "ProductID": 922,
        "Name": "Road Tire Tube",
        "ListPrice": "3.9900"
    },
    {
        "ProductID": 870,
        "Name": "Water Bottle - 30 oz.",
        "ListPrice": "4.9900"
    },
    {
        "ProductID": 921,
        "Name": "Mountain Tire Tube",
        "ListPrice": "4.9900"
    },
    {
        "ProductID": 923,
        "Name": "Touring Tire Tube",
        "ListPrice": "4.9900"
    },
    {
        "ProductID": 877,
        "Name": "Bike Wash - Dissolver",
        "ListPrice": "7.9500"
    },
    {
        "ProductID": 872,
        "Name": "Road Bottle Cage",
        "ListPrice": "8.9900"
    },
    {
        "ProductID": 874,
        "Name": "Racing Socks, M",
        "ListPrice": "8.9900"
    },
    {
        "ProductID": 875,
        "Name": "Racing Socks, L",
        "ListPrice": "8.9900"
    },
    {
        "ProductID": 709,
        "Name": "Mountain Bike Socks, M",
        "ListPrice": "9.5000"
    },
    {
        "ProductID": 710,
        "Name": "Mountain Bike Socks, L",
        "ListPrice": "9.5000"
    },
    {
        "ProductID": 871,
        "Name": "Mountain Bottle Cage",
        "ListPrice": "9.9900"
    },
    {
        "ProductID": 846,
        "Name": "Taillights - Battery-Powered",
        "ListPrice": "13.9900"
    },
    {
        "ProductID": 712,
        "Name": "AWC Logo Cap",
        "ListPrice": "8.9900"
    },
    {
        "ProductID": 931,
        "Name": "LL Road Tire",
        "ListPrice": "21.4900"
    },
    {
        "ProductID": 878,
        "Name": "Fender Set - Mountain",
        "ListPrice": "21.9800"
    },
    {
        "ProductID": 844,
        "Name": "Minipump",
        "ListPrice": "19.9900"
    },
    {
        "ProductID": 952,
        "Name": "Chain",
        "ListPrice": "20.2400"
    },
    {
        "ProductID": 858,
        "Name": "Half-Finger Gloves, S",
        "ListPrice": "24.4900"
    },
    {
        "ProductID": 859,
        "Name": "Half-Finger Gloves, M",
        "ListPrice": "24.4900"
    }
    ];

    function getNewFilterRange(e) {
        //e.value contains an array of two values for RadRangeSlider. 
        //e.value[0] is the lower border of the range and e.value[1] is the max value.
        var min = e.value[0];
        var max = e.value[1];

        var listView = document.getElementById("listView").winControl;
        listView.itemDataSource = SampleData.Products.createFiltered(function (p) { return p.ListPrice > min && p.ListPrice < max }).dataSource;
    };

    WinJS.Namespace.define("SampleData", {
        Products: new WinJS.Binding.List(data),
        //the RadRangeSlider change event handler. It calls the getNewFilterRange() function and marks 
        //it for processing, so the handler can be used in the mark up.
        SliderChangeHandler: WinJS.Utilities.markSupportedForProcessing(getNewFilterRange),
        FormatPrice: WinJS.Binding.converter(function (price) {
            var formatted = Telerik.Utilities.toString(parseFloat(price), "c2", "en-US");
            return formatted;
        })
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
            args.setPromise(WinJS.UI.processAll());
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
