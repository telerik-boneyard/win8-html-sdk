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
            	var grid = new Telerik.UI.RadGrid(document.getElementById("grid1"), {

            		dataSource: {
            			transport:
						{
							read: {
								url: "/js/BooksJSON.json",
								dataType: "json"
							}
						},
            			schema: {
            				// specify the the schema is JSON
            				type: "json",
            				// the JSON object which represents a single data record
            				data: "books.book"
            			},
            		},
            		columns: [
						{ field: "title" },
						{ field: "info.author", title: "author" },
						{ field: "info.url", template: "<a href='#=info.url#'>Go to address</a>", title: "url" }
            		]
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
