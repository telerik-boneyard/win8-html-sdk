// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    var tokenInput,
        sampleData = [
        { id: 1, text: "New York" },
        { id: 2, text: "Philadelphia" },
        { id: 3, text: "Boston" }
        ];

    WinJS.Namespace.define("Tokens", {
        SampleData: sampleData
    });

    // The keydown handler of the TokenInput's text input element. Checks if the key pressed is the "Enter" key.
    function tokenKeyDownHandler(e) {
        var enterKey = 13;
        if (e.keyCode == enterKey) {
            var text = e.target.value;

            // if there was a text typed in the text input element, create a new object with a new id
            // add it to the TokenInput's dataSource and select it via the select() method.
            if (text) {
                var data = tokenInput.dataSource.data;
                var dataLength = data.length;

                var value = data[dataLength - 1].id + 1;
                var item = {
                    id: value,
                    text: text
                };
                tokenInput.dataSource.add(item);

                var items = tokenInput.list;
                var toSelect = $("li:contains('" + text + "')", items);
                tokenInput.select(toSelect);
            }
        }
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
            args.setPromise(WinJS.UI.processAll().then(function() {
                tokenInput = Telerik.UI.find.TokenInput("#tokenInput");

                // Get the TokenInput's text input element by its class and add an event listener to it.
                var tokenInputField = document.querySelector("#tokenInput .k-input");
                tokenInputField.addEventListener("keydown", tokenKeyDownHandler);
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
