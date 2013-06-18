// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    // defining the products and hubTile variables here, so we can use them in functions outside the processAll promise.
    var products, hubTile;

    // generating a new random index and changing the content of the RadHubTile with the product at the new index
    function refreshHubTile() {
        var rndmItem = Math.floor(Math.random() * 20);
        var currentItem = products[rndmItem];

        hubTile.backContentTemplate = LiveDataSample.getDeal(currentItem);
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
            	WinJS.xhr({
            	    url: "http://services.odata.org/V3/Northwind/Northwind.svc/Products?$format=json",
            	}).then(function (result) {
            		//result is the JSON response from the service, we call JSON.parse to parse it into a JavaScript object
            		var response = JSON.parse(result.response);
            	    //there are 20 products inside the "value" object. We take one on random, so we can have a different one every time.
            		products = response.value;
            		var rndmItem = Math.floor(Math.random() * 20);
            		var currentItem = products[rndmItem];
            		//create the hub tile once the data is available
            		hubTile = new Telerik.UI.RadCustomHubTile(document.getElementById("hubTile"), {
            			frontContentTemplate: '<h2>&nbsp;Newest Deal</h2>',
            			backContentTemplate: LiveDataSample.getDeal(currentItem),
            		});
            	});

            	document.getElementById("refreshBtn").addEventListener("click", refreshHubTile);
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

WinJS.Namespace.define("LiveDataSample", {
	getDeal: WinJS.Utilities.markSupportedForProcessing(function (item) {
		var template = ["<div class='grid'><div class='cell1'><p class='smallerText'>",
		item.ProductName, "</p><p>Price: $",
		item.UnitPrice, "</p></div><div class='cell2'><img height='120' src='/images/Products/",
		item.ProductID, ".png' alt='Picture'/></div></div>"].join("");

		return template;
	})
});