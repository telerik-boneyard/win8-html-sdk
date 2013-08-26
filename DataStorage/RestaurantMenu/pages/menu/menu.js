(function () {
	"use strict";
	//in this page we show a ListView with the food categories

	var categoriesList,
		listView;
	function queryDb() {
		//get all categories sorted by id ascending
		var db = Telerik.Data.Database.open("RestaurantDB");
		return db.get("Categories").sort("id", "asc").execute().then(function (data) {
			categoriesList = new WinJS.Binding.List(data);
		});
	}

	function navigateToProducts(e) {
		//when an item in the ListView is invoked, access its category info and pass it as an argument to the products page
		var itemIndex = e.detail.itemIndex;
		var itemElement = listView.elementFromIndex(itemIndex);
		var categoryId = itemElement.getElementsByTagName("input")[0].value;
		var categoryName = itemElement.getElementsByTagName("h2")[0].innerText;
		//navigate with an argument
		WinJS.Navigation.navigate("/pages/products/products.html", categoryId + "," + categoryName);
	}

	WinJS.UI.Pages.define("/pages/menu/menu.html", {
		ready: function (element, options) {
			queryDb().then(function () {
				listView = new WinJS.UI.ListView(element.querySelector("#categories"), {
					itemDataSource: categoriesList.dataSource,
					itemTemplate: element.querySelector("#menuItemTemplate"),
					oniteminvoked: navigateToProducts
				});
			});

		}
	});
})();
