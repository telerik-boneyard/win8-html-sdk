// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    function webServiceError() {
    	var msg = Windows.UI.Popups.MessageDialog("Web service is currently down, try again later");
    	msg.showAsync();
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
            	var winTemplateComboBoxCtrl = new Telerik.UI.RadComboBox(document.getElementById("winTemplateComboBox"), {
            		dataTextField: "Title",
            		dataValueField: "Id",
            		filter: "contains",
            		dataSource: {
            			transport: {
            				read: {
            					url: "http://ebayodata.cloudapp.net/Deals",
            					dataType: "json"
            				}
            			},
            			schema: {
            				data: "d.results"
            			}
            		},
            		template: document.getElementById("comboBoxTemplate").winControl,
            		height: 265
            	});

            	winTemplateComboBoxCtrl.dataSource.addEventListener("error", webServiceError);
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
