// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    var grid, gridDS, saveSettingsBtn, savedMsg;

    // function for getting the grid settings on app start
    function setGridSettings() {
        Windows.Storage.ApplicationData.current.localFolder.getFileAsync("GridSettings.json").then(function (file) {
            Windows.Storage.FileIO.readTextAsync(file).done(function (jsonData) {
                var settings = JSON.parse(jsonData);
                grid.dataSource.filter = settings.filter;
                grid.dataSource.sort = settings.sort;
                grid.dataSource.group = settings.group;

                grid.refresh();
            });
        });
    }

    // function for saving the grid settings on button click
    function saveGridSettings() {
        gridDS = grid.dataSource;
        var settings = {
            filter: gridDS.filter,
            sort: gridDS.sort,
            group: gridDS.group,
        };

        Windows.Storage.ApplicationData.current.localFolder.createFileAsync
            ("GridSettings.json", Windows.Storage.CreationCollisionOption.openIfExists).then(function (file) {
                Windows.Storage.FileIO.writeTextAsync(file, JSON.stringify(settings)).then(function () {
                    savedMsg.innerText = "Settings Saved";
                    animateMessageBox();
                });
            });
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
                grid = document.getElementById("grid1").winControl;
                saveSettingsBtn = document.getElementById("saveSettingsBtn");
                savedMsg = document.getElementById("savedMsg");

                setGridSettings();
                saveSettingsBtn.addEventListener("click", saveGridSettings);
            }));
        }
    };

    // using the namespace for mark-up declaration of the RadGrid
    WinJS.Namespace.define("PersistenceExample", {
        GridDataSource: new Telerik.Data.DataSource({
            transport: {
                read: {
                    url: "/js/athletesResults.json",
                    dataType: "json",
                }
            }
        }),

    });

    // function for animating the message for saved settings
    function animateMessageBox() {
        WinJS.UI.Animation.fadeIn(savedMsg).done(function () {
            setTimeout(WinJS.UI.Animation.fadeOut, 2000, savedMsg);
        });
    }

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
