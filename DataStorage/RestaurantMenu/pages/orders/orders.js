(function () {
	"use strict";

	var db, //the database instance
		ordersGrid, //the RadGrid displaying grouped orders
		flyOut, //the edit Flyout
		tablesDdl, //the RadDropDownList containing table numbers
		categoriesDdl, //the RadDropDownList containing categories
		productsDdl, //the RadDropDownList containing products
		quantityBox, //the RadNumericBox containing number of products ordered
		typeHiddenInput, //a hidden input element keeping the current type of insert - adding to exsiting order or creating a new order
		tableNo, //a variable keeping the current table number
		maxOrderId; //a variable keeping the last added order id

	function queryDb() {
		//populate the grid by getting all needed info from the OrderDetails, Orders and Products tables
		db = Telerik.Data.Database.open("RestaurantDB");
		db.get("OrderDetails")
		.join("Orders", "id", "orderId")
		.join("Products", "id", "productId")
		.fields({
			//joining tables requires you to specify the needed fields
			tableNo: "Orders.tableNo",
			productName: "Products.name",
			price: "Products.price",
			productId: "Products.id",
			orderId: "Orders.id"
		})
		.execute().then(querySuccess, function (e) {
			//handle any errors from the read operation, e.message contains the error message
		});
	}

	function showResults(result) {
		var grid = new Telerik.UI.RadGrid(document.querySelector("#orders"), {
			dataSource: {
				data: result,
				//group the grid by table number
				group: { field: "tableNo" },
				//define an aggregate which will be used to follow the last order id used
				aggregate: { field: "orderId", aggregate: "max" }
			},
			columns: [
				{
					field: "productName",
					width: 350
				},
				{
					title: "price",
					template: "$#=data.price#",
					width: 100
				},
				{
					field: "tableNo",
					format: "n0",
					groupHeaderTemplate: "Table number: #=value#",
					hidden: true
				}
			],
			ondatabound: setGroupHeaders
		});

	}

	function querySuccess(result) {
		showResults(result);
		db.close();
	}

	function setGroupHeaders(e) {
		//hide collapse icons to prevent groups collapse
		hideGroupIcons(e.target.element);
		//show menu on group header click
		attachClickHandler(e.target.element);
	}

	function hideGroupIcons(gridElement) {
		var icons = gridElement.querySelectorAll(".k-grouping-row .k-icon");
		for (var i = 0; i < icons.length; i++) {
			icons[i].parentNode.removeChild(icons[i]);
		}
	}

	function attachClickHandler(gridElement) {
		var groupRows = gridElement.querySelectorAll(".k-grouping-row");
		for (var i = 0; i < groupRows.length; i++) {
			groupRows[i].addEventListener("click", function (e) {
				orderMenu.winControl.show(e.target, "bottom", "left");
				tableNo = e.target.innerText.replace("Table number: ", "");
			});
		}
	}

	function populateCategoriesDdl() {
	//populate the categories dropdown
		db = Telerik.Data.Database.open("RestaurantDB");
		db.get("Categories")
		.execute()
		.then(function (result) {
			categoriesDdl = Telerik.UI.to.DropDownList(document.querySelector("#categoryDdl").winControl);
			categoriesDdl.dataSource.data = result;
		});
	}

	function populateProductsDdl(id) {
		//populate the products dropdown based on the chosen category
		db = Telerik.Data.Database.open("RestaurantDB");
		db.get("Products")
		.filter("categoryId", "==", id)
		.execute()
		.then(function (result) {
			productsDdl = Telerik.UI.to.DropDownList(document.querySelector("#productDdl").winControl);
			productsDdl.dataSource.data = result;
			productsDdl.enabled = true;
		});
	}

	function prepareInsertForm(e) {
		//display the insert flyout and prepopulate controls
		flyOut = document.querySelector("#addOrderFlyout").winControl;
		flyOut.show(e.target, "bottom", "left");

		tablesDdl = document.querySelector("#tableDdl").winControl;
		ordersGrid = Telerik.UI.to.Grid(document.querySelector("#orders").winControl);
		typeHiddenInput = document.querySelector("#typeInput");

		var gridGroups = ordersGrid.dataSource.view;
		if (e.target.id == "addBtn") {
			//use the hidden input to mark the type of insert, it will be used later when the insert is triggered
			typeHiddenInput.value = "new";

			var filters = [];
			//create a filter to display only tables that do not have active orders
			for (var i = 0; i < gridGroups.length; i++) {
				filters.push({ field: "tableNo", operator: "neq", value: parseInt(gridGroups[i].value) });
			}
			tablesDdl.dataSource.filter = filters;
			tablesDdl.dataSource.read();
		}
		else {
			typeHiddenInput.value = "existing";
			var gridGroups = ordersGrid.dataSource.view;
			var filters = [];
			//create a filter to display only tables that have opened orders
			for (var i = 0; i < gridGroups.length; i++) {
				filters.push({ field: "tableNo", operator: "eq", value: parseInt(gridGroups[i].value) });
			}

			tablesDdl.dataSource.filter = { logic: "or", filters: filters };
			tablesDdl.dataSource.sort = { field: "tableNo", dir: "asc" };
			tablesDdl.dataSource.read();
		}
		//populate the categories dropdown, the products one will be populated afterwards
		populateCategoriesDdl();
		//needed to determine the orderId of the next inserted order
		calculateMaxId();
	}

	function calculateMaxId() {
		if (!maxOrderId) {
			if (ordersGrid.dataSource.aggregates.orderId) {
				maxOrderId = ordersGrid.dataSource.aggregates.orderId.max;
			}
			else {
				maxOrderId = 1;
			}
		}
	}

	function insertOrder() {
		if (categoriesDdl.value && productsDdl.value && quantityBox.value) {
			var productId = productsDdl.value;
			var tableNumber = tablesDdl.value;
			var numberOfItems = quantityBox.value;
			var isNew = (typeHiddenInput.value == "new");

			insertItemsToDb(isNew, tableNumber, productId, numberOfItems);
		}
	}

	function insertItemsToDb(isNew, tableNumber, productId, numberOfItems) {
		db = Telerik.Data.Database.open("RestaurantDB");
		if (isNew) {
			maxOrderId++;
			db.use("Orders").insert({ id: maxOrderId + 1, tableNo: tableNumber }).sync().then(
			function () {
				for (var i = 0; i < numberOfItems; i++) {
					insertOrderDetailToDb(maxOrderId + 1, productId);
				}
				syncAndClose();
			}, function (e) {

			});
		}
		else {
			db.get("Orders").filter("tableNo", "like", tableNumber).execute().then(
			function (result) {
				var orderId = result[0].id;
				for (var i = 0; i < numberOfItems; i++) {
					insertOrderDetailToDb(orderId, productId);
				}
				syncAndClose();
			}, function (e) {

			});
		}
	}

	function syncAndClose() {
		db.sync().then(function () {
			db.close();
			flyOut.hide();
			queryDb();
		}, function (e) { });
	}

	function insertOrderDetailToDb(orderId, productId) {
		db.insert("OrderDetails", { orderId: orderId, productId: productId });
	}

	function deleteOrder() {
		//delete current order from the Orders table and then trigger delete for all records in the OrderDetails table that use this order
		db = Telerik.Data.Database.open("RestaurantDB");
		db.get("Orders").filter("tableNo", "LIKE", tableNo).execute().then(deleteRow);
	}

	function deleteRow(result) {
		db = Telerik.Data.Database.open("RestaurantDB");
		db.query("DELETE FROM [OrderDetails] WHERE orderId = " + result[0].id).then(function () {
			db.use("Orders").remove(result[0]).sync().done(queryDb)
		});
	}

	WinJS.UI.Pages.define("/pages/orders/orders.html", {
		ready: function (element, options) {
			ordersGrid = Telerik.UI.to.Grid(element.querySelector("#orders").winControl);
			element.querySelector("#addBtn").addEventListener("click", prepareInsertForm);
			element.querySelector("#addToBtn").addEventListener("click", prepareInsertForm);
			element.querySelector("#insertBtn").addEventListener("click", insertOrder);
			element.querySelector("#closeBtn").addEventListener("click", deleteOrder);
			//populate orders grid
			queryDb();
		}
	});

	WinJS.Namespace.define("Orders", {
		//handle the change event of the category dropdown to populate the product one with related products
		categoryChange: WinJS.Utilities.markSupportedForProcessing(function (e) {
			var id = e.target.value;
			populateProductsDdl(id);
		}),
		//handle the change event of the product dropdown to enable the quantity numeric box
		productChange: WinJS.Utilities.markSupportedForProcessing(function (e) {
			quantityBox = Telerik.UI.to.NumericBox(document.querySelector("#quantityNumericBox").winControl);
			var insertBtn = document.querySelector("#insertBtn");
			quantityBox.enabled = true;
			//enable the insert button as now there is enough information for an insert
			insertBtn.disabled = false;

		})
	})
})();
