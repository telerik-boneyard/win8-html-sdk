// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

	function itemTemplate(item) {
		return matchQuery(item.ProductName);
	}

	function matchQuery(name) {
		var autoCompleteBox = document.getElementById("autoComplete").winControl;
		var query = autoCompleteBox.text.toLowerCase();
		var index = name.toLowerCase().indexOf(query);
		var match = name.substring(index, index + query.length);
		return name.replace(match, "<span class='match'>" + match + "</span>");
	}

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

            	var matchAutoComplete = new Telerik.UI.RadAutoCompleteBox(document.getElementById("autoComplete"), {
            		dataSource: {
            			transport: {
            				read: {
            					url: "http://services.odata.org/Northwind/Northwind.svc/Products",
            					dataType: "json"
            				}
            			},
            			schema: {
            				data: "value"
            			}
            		},
            		dataTextField: "ProductName",
            		template: itemTemplate
            	});

            	matchAutoComplete.dataSource.addEventListener("error", webServiceError);
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
