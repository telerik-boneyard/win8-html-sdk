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
            	WinJS.xhr({
            		url: "http://ebayodata.cloudapp.net/Deals?$format=json&$top=1",
            	}).then(function (result) {
            		//result is the JSON response from the service, we call JSON.parse to parse it into a JavaScript object
            		var response = JSON.parse(result.response);
            		//there is a single data item inside the d.results object in the parsed response
            		var currentItem = response.d.results[0];
            		//create the hub tile once the data is available
            		var hubTile = new Telerik.UI.RadCustomHubTile(document.getElementById("hubTile"), {
            			frontContentTemplate: '<h2>&nbsp;Newest Deal</h2>',
            			backContentTemplate: LiveDataSample.getDeal(currentItem),
            		});
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

WinJS.Namespace.define("LiveDataSample", {
	getDeal: WinJS.Utilities.markSupportedForProcessing(function (item) {
		var template = "<div class='grid'><div class='cell1'><p class='smallerText'>" +
		item.Title + "</p><p>Price: $" +
		item.ConvertedCurrentPrice + "</p></div><div class='cell2'><img height='120' src='" +
		item.Picture175Url + "' alt='Picture'/></div></div>";

		return template;
	})
});