// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var listView,
		listDataSource;

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
            		url: "/js/data.json"
            	}).then(function (result) {
            		var data = JSON.parse(result.responseText).data;
            		listDataSource = new WinJS.Binding.List(data);

            		listView = document.querySelector("#listView").winControl;
            		listView.itemDataSource = listDataSource.dataSource;
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

    WinJS.Namespace.define("CustomInitializers", {
    	chartBindingInitializer: WinJS.Binding.initializer(function (source, sourceProperty, target, targetProperty) {
    		//target is the chart element
    		var chart = target.winControl;
    		//source holds the current data item, sourceProperty is the property name we specified in data-win-bind
    		chart.dataSource.data = source.Stats;
    		chart.height = 150;
    		chart.width = 250;
    		chart.refresh();
    	})
    });
})();
