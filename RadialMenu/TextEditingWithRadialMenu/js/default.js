// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    WinJS.Namespace.define("Events", {
        action: WinJS.Utilities.markSupportedForProcessing(function (e) {
            var item = e.item;
            var action = e.item.id;
            if (item.parent) {
                // handle nested commands based on the parent item id. The value for the commands 
                // is represented by the item id.
                switch (item.parent.id) {
                    case "FontName":
                        document.execCommand("fontName", false, action);
                        break;
                    case "FontSize":
                        var size = parseInt(action);
                        document.execCommand("fontSize", false, size);
                        break;
                    case "FontColor":
                        document.execCommand("foreColor", false, action);
                        break;
                    case "BackColor":
                        document.execCommand("backColor", false, action);
                        break;
                    case "Justify":
                        document.execCommand(action, false);
                        break;
                    case "FontStyle":
                        document.execCommand(action, false);
                        break;
                    case "CopyTools":
                        document.execCommand(action, false);
                        break;
                    case "Lists":
                        document.execCommand(action, false);
                        break;
                }
            }
            else {
                switch (action) {
                    // handle root level commands. In this case if the user clicks on the 'Copy' button 
                    // without expanding it, the text will be copied.
                    case "CopyTools":
                        document.execCommand("copy", false);
                        break;
                }
            }

        })
		,
        expand: WinJS.Utilities.markSupportedForProcessing(function (e) {
            var menu = e.menu;
            // persist the selected state of items based on the current text selection when the menu expands
            menu.getItem("Bold").selected = document.queryCommandState("bold");
            menu.getItem("Italic").selected = document.queryCommandState("italic");
            menu.getItem("Underline").selected = document.queryCommandState("underline");
            menu.getItem("JustifyLeft").selected = document.queryCommandState("JustifyLeft");
            menu.getItem("JustifyRight").selected = document.queryCommandState("JustifyRight");
            menu.getItem("JustifyCenter").selected = document.queryCommandState("JustifyCenter");
            menu.getItem("InsertOrderedList").selected = document.queryCommandState("InsertOrderedList");
            menu.getItem("InsertUnorderedList").selected = document.queryCommandState("InsertUnorderedList");
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
