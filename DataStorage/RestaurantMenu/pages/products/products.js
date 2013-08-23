// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
	"use strict";
	var db;

	function queryDb(categoryId) {
		//show the products belonging to the current category
		db = Telerik.Data.Database.open("RestaurantDB");
		db.get("Products").filter("categoryId", "==", categoryId)
		.execute().then(querySuccess, function (e) {
			//handle any errors from the read operation, e.message contains the error message
		});
	}

	function showResults(result) {
		var grid = new Telerik.UI.RadGrid(document.querySelector("#products"), {
			dataSource: {
				data: result
			},
			columns: [
				{
					field: "id",
					width: 100
				},
				{
					field: "name",
					width: 350
				},
				{
					field: "description",
				},
				{
					field: "quantity",
					width: 100
				},
				{
					width: 100,
					title: "price",
					template: "$#=data.price#"
				}
			]
		});
	}

	function querySuccess(result) {
		showResults(result);
		db.close();
	}

	WinJS.UI.Pages.define("/pages/products/products.html", {
		ready: function (element, options) {
			//read the parameter passed from the categories page and query the database to get the related products
			var categoryInfo = options.split(",");
			element.querySelector(".pagetitle").innerText = categoryInfo[1];
			queryDb(categoryInfo[0]);

		}
	});
})();
