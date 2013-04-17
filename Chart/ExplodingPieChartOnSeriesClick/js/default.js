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

WinJS.Namespace.define("eventHandlers", {
	seriesClick: WinJS.Utilities.markSupportedForProcessing(function (e) {
		var dataItem = e.dataItem;
		var dataItems = e.target.dataSource.data;
		//setting the explode value of all sectors to false
		for (var i = 0; i < dataItems.length; i++) {
			dataItems[i].Highlighted = false;
		}
		//exploding the currently selected sector
		dataItem.Highlighted = true;
		e.target.refresh();
		//populating the information area below the chart
		document.getElementById("info").style.visibility = "visible";
		document.getElementById("employee").innerText = dataItem.Employee;
		document.getElementById("value").innerText = dataItem.Value + "%";
		var changeSpan = document.getElementById("change");
		if (dataItem.Change > 0) {
			changeSpan.style.color = "green";
			changeSpan.innerText = "+" + dataItem.Change + "%";
		}
		else {
			changeSpan.style.color = "red";
			changeSpan.innerText = dataItem.Change + "%";
		}

	})
});