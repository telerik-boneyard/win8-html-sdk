// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
	"use strict";

	WinJS.Binding.optimizeBindingReferences = true;

	var app = WinJS.Application;
	var activation = Windows.ApplicationModel.Activation;
	var grid, list;

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
				grid = document.querySelector("#newsGrid").winControl;
				list = document.querySelector("#categoriesList").winControl;
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

	WinJS.Namespace.define("RSSExample", {
		rssDataSource: new Telerik.Data.DataSource({
			transport:
			{
				read: {
					url: "http://rss.cnn.com/rss/edition_technology.rss"
				}
			},
			schema: {
				type: "xml",
				data: "/rss/channel/item",
				model: {
					fields: {
						title: "title/text()",
						description: "description/text()",
						link: "link/text()",
						publicationDate: "pubDate/text()"
					}
				}
			}
		}),

		categories: new WinJS.Binding.List(
		[
			{ name: "Technology News", feedName: "edition_technology" },
			{ name: "Entertainment News", feedName: "edition_entertainment" },
			{ name: "Travel News", feedName: "edition_travel" }
		]).dataSource,

		rowTemplate: WinJS.Utilities.markSupportedForProcessing(function (data) {
			return ["<tr><td><h3>" + data.title + "</h3>",
						"<span>" + data.publicationDate + "</span>",
						"<p>" + data.description + "</p>",
						"<span><a href='" + data.link + "'>Read the whole article</a></span></td></tr>"
			].join("");
		}),

		itemInvoked: WinJS.Utilities.markSupportedForProcessing(function (e) {
			var itemIndex = e.detail.itemIndex;
			var item = list.itemDataSource.list.getAt(itemIndex);
			grid.dataSource = new Telerik.Data.DataSource({
				transport:
				{
					read: {
						url: "http://rss.cnn.com/rss/" + item.feedName
					}
				},
				schema: {
					type: "xml",
					data: "/rss/channel/item",
					model: {
						fields: {
							title: "title/text()",
							description: "description/text()",
							link: "link/text()",
							publicationDate: "pubDate/text()"
						}
					}
				}
			});
			grid.columns = [{ title: item.name }]
			grid.refresh();
		})
	});
})();