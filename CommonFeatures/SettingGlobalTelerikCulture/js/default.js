// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    // defining default variables for initial state
    var startDefault = new Date(2013, 5, 1);
    var endDefault = new Date(2013, 5, 30);
    var minPriceDefault = 0;
    var maxPriceDefault = 1000;

    // defining controls' variables as global to use them everywhere
    var startNumeric, endNumeric, calendar, listViewData;

    // a function to better check if two dates are equal
    function areDatesEqual(DateA, DateB) {
        var a = new Date(DateA);
        var b = new Date(DateB);

        var msDateA = Date.UTC(a.getFullYear(), a.getMonth() + 1, a.getDate());
        var msDateB = Date.UTC(b.getFullYear(), b.getMonth() + 1, b.getDate());

        if (parseFloat(msDateA) == parseFloat(msDateB))
            return true;
        else
            return false;
    }

    // defining filtering variables with initial values
    var dateFilter = startDefault;
    var minPriceFilter = minPriceDefault;
    var maxPriceFilter = maxPriceDefault;

    // a function used as a filter expression. If it returns true, the item is added - false means the item is filtered out.
    function ListViewFilter(ticketInfo) {
        if (areDatesEqual(ticketInfo.date, dateFilter) && ticketInfo.price <= maxPriceFilter && ticketInfo.price >= minPriceFilter) {
            return true;
        } else {
            return false;
        }
    }

    // the handler for the "Search" button - updates the filtering variables and notifies the binding list to refilter the data
    function changeListViewFilters() {
        dateFilter = calendar.value;
        minPriceFilter = startNumeric.value;
        maxPriceFilter = endNumeric.value;

        listViewData.notifyReload();
    }

    // a function to create a random fictional data for the example.
    function createRandomData() {
        var data = [];
        var rndmPrice;

        for (var d = new Date(2013, 5, 1) ; d <= endDefault; d.setDate(d.getDate() + 1)) {
            rndmPrice = Math.floor(Math.random() * 1000);
            data.push({ company: "Pine Air", price: rndmPrice, takeOffTime: "6:30 am", date: new Date(d), fareType: "rückzahlbar, kostenlose Mahlzeit", duration: "02h 50m" });
            rndmPrice = Math.floor(Math.random() * 1000);
            data.push({ company: "Metro Airlines", price: rndmPrice, takeOffTime: "7:00 am", date: new Date(d), fareType: "rückzahlbar, Mahlzeit bezahlt", duration: "03h 30m" });
            rndmPrice = Math.floor(Math.random() * 1000);
            data.push({ company: "Sunset Wing", price: rndmPrice, takeOffTime: "7:30 am", date: new Date(d), fareType: "rückzahlbar, kostenlose Mahlzeit", duration: "01h 30m" });
        }

        listViewData = new WinJS.Binding.List(data);

        return listViewData.createFiltered(ListViewFilter).dataSource;
    }

    // a namespace to use the functions in the mark-up. Binds the binding list and provides binding converters for the date and price.
    WinJS.Namespace.define("ListView", {
        data: createRandomData(),
        formatDate: WinJS.Binding.converter(function (date) {
            var result = [
                date.getDate(), "/", date.getMonth() + 1, "/", date.getFullYear()
            ].join("");

            return result;
        }),
        formatPrice: WinJS.Binding.converter(function (price) {
            var result = Telerik.Utilities.toString(price, "c0", "de-DE");

            return result;
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

            Telerik.Culture.setCurrent("de-DE");

            args.setPromise(WinJS.UI.processAll().then(function () {
                // defining controls properties and refresh button event handler
                startNumeric = Telerik.UI.find.NumericBox("#minNumeric");
                endNumeric = Telerik.UI.find.NumericBox("#maxNumeric");
                calendar = Telerik.UI.find.Calendar("#calendar");

                startNumeric.value = minPriceDefault;
                endNumeric.value = maxPriceDefault;
                calendar.value = new Date(2013, 5, 1);

                var refreshBtn = document.getElementById("refreshBtn");
                refreshBtn.addEventListener("click", changeListViewFilters);
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
