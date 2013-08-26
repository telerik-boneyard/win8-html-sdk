(function () {
	"use strict";
	//in this page we will populate the database, so it is available on consecutive page loads

	function ensureDataBase() {
		//Make a connection to the DB. If it does not exist,  it will be created.
		var db = Telerik.Data.Database.open("RestaurantDB");
		//Make a query to the table of interest to see if it exists. If it doesn't,  the error function will be entered.
		db.query("select * from Products as x").done(function (result) {
			//DB is OK
			db.close();
		}, function (error) {
			if (error && error.message && error.message.indexOf("no such table:") != -1) {
				//DB is new
				db.close();
				createDb();
			}
		});
	}

	function createDb() {
		var db = Telerik.Data.Database.open("RestaurantDB");
		var categories,
		products,
		orders,
		orderDetails;

		//read data from all four locations, the logic would be identical if you read the data from a web service
		var cPromise = WinJS.xhr({ url: "/Data/Categories.json" }).then(function (e) {
			categories = JSON.parse(e.responseText);
		});

		var pPromise = WinJS.xhr({ url: "/Data/Products.json" }).then(function (e) {
			products = JSON.parse(e.responseText);
		});

		var oPromise = WinJS.xhr({ url: "/Data/Orders.json" }).then(function (e) {
			orders = JSON.parse(e.responseText);
		});

		var odPromise = WinJS.xhr({ url: "/Data/OrderDetails.json" }).then(function (e) {
			orderDetails = JSON.parse(e.responseText);
		});

		//join the four read operations in a promise
		WinJS.Promise.join([cPromise, pPromise, oPromise, odPromise]).done(function () {
			//use the data read from the files to populate the database
			for (var i = 0; i < categories.length; i++) {
				db.insert("Categories", { id: categories[i].CategoryID, categoryName: categories[i].CategoryName });
			}

			for (var i = 0; i < products.length; i++) {
				db.insert("Products", { id: products[i].ID, name: products[i].Name, categoryId: products[i].CategoryID, description: products[i].Description, quantity: products[i].Quantity, price: products[i].Price });
			}

			for (var i = 0; i < orders.length; i++) {
				db.insert("Orders", { id: parseInt(orders[i].OrderID), tableNo: orders[i].Table });
			}

			for (var i = 0; i < orderDetails.length; i++) {
				db.insert("OrderDetails", { orderId: parseInt(orderDetails[i].OrderID), productId: orderDetails[i].ProductID });
			}

			//data isn't really inserted until the sync method is called
			db.sync().then(function () {
				db.close();
			}, function (e) {
				//handle any errors from the db insert operations, e.message contains the error message
			});
		}, function (e) {
			//handle any errors from the joined read operations, e.message contains the error message
		});


	}

	WinJS.UI.Pages.define("/pages/home/home.html", {
		ready: function (element, options) {
			element.querySelector("#hubTileMenu").addEventListener("click", function () {
				WinJS.Navigation.navigate("/pages/menu/menu.html");
			});
			element.querySelector("#hubTileOrders").addEventListener("click", function () {
				WinJS.Navigation.navigate("/pages/orders/orders.html");
			});
			//trigger database creation
			ensureDataBase();
		}
	});
})();
