// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    // defining the database schema. The schema is necessary if you want to use the database for CRUD operations
    var schemaDB = {
        tables: [{
            name: 'GridData',
            columns:
            [
                {
                    name: "id",
                    type: "number",
                    identity: true,
                    autoIncrement: true
                },
                { name: "name", type: "string" },
                { name: "jobTitle", type: "string" },
                { name: "birthDate", type: "date" },
                { name: "hireDate", type: "date" }
            ]
        }]
    };

    // defining RadGrid's DataSource object. The important things here are the type "dataStorage", the transport 
    // object set up and the schema matching the database schema. 
    WinJS.Namespace.define("Grid.Data", {
        dataSource: new Telerik.Data.DataSource({
            type: "dataStorage",
            transport: {
                read: {
                    data: {
                        dbName: "GridDB",
                        tableName: "GridData"
                    }
                },
                create: {
                    data: {
                        dbName: "GridDB",
                        tableName: "GridData"
                    }
                },
                update: {
                    data: {
                        dbName: "GridDB",
                        tableName: "GridData"
                    }
                },
                destroy: {
                    data: {
                        dbName: "GridDB",
                        tableName: "GridData"
                    }
                }
            },
            schema: {
                model: {
                    id: "id",
                    fields: {
                        id: { from: "id", type: "number", nullable: true },
                        name: { from: "name", validation: { required: true } },
                        jobTitle: { from: "jobTitle", validation: { required: true } },
                        birthDate: { from: "birthDate", type: "date" },
                        hireDate: { from: "hireDate", type: "date" }
                    }
                }
            }
        })
    });

    var db;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }

            // this will create a database named "GridDB" if none exists and will open the database if it is existant.
            db = Telerik.Data.Database.open("GridDB", "local", schemaDB);
            // it is necessary to set the serializeObject property to false, because we need to get the data from all 
            // of the database's cells. If the serilizeObject feature is turned on, the data is saved in a single cell in JSON format.
            db.serializeObject = false;

            args.setPromise(WinJS.UI.processAll().then(function() {
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
