// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
	"use strict";

	WinJS.Binding.optimizeBindingReferences = true;

	var app = WinJS.Application;
	var activation = Windows.ApplicationModel.Activation;
	var tasks = [
	{
		id: 1,
		title: "Take the car to service"
	},
	{
		id: 2,
		title: "Take the dog out"
	},
	{
		id: 3,
		title: "Go to the grocery"
	},
	{
		id: 4,
		title: "Go to the gym"
	},
	{
		id: 5,
		title: "Book tickets for vacation"
	},
	{
		id: 6,
		title: "Cook dinner"
	},
	{
		id: 7,
		title: "Pack up for travel"
	}
	];
	var rowIndex,
		dragContainer;
	
	//Prepare the Grid dataSource
	var tasksDataSource = new Telerik.Data.DataSource({
		data: tasks,
		sort: { field: "id", dir: "asc" }
	});

	//Prepare the Scheduler dataSource
	var taskEventsDataSource = new Telerik.Data.SchedulerDataSource();

	//Returns the pointer event name, so that it can be used as an argument for addEventListener() method
	function getPointerEvent(type) {
		return "onpointerdown" in document ?
			("pointer" + type) :
			("MSPointer" + type.charAt(0).toUpperCase() + type.substr(1));
	}

	//Changes the dragged element position in the document based on the cursor position
	function updatePosition(e) {
		if (dragContainer.innerHTML != "") {
			dragContainer.style.top = e.clientY + "px";
			dragContainer.style.left = e.clientX + "px";
		}
	}

	//Copies the "dragged" grid cell content into the drag container element
	function copyContent(e) {
		var target = e.target;

		//Check whether the clicked element is a grid cell
		var isDataCell = target.nodeName == "TD" && $(target).parents(".k-grid-content").length > 0;
		if (isDataCell) {
			dragContainer.innerText = target.innerText;
			rowIndex = target.parentNode.rowIndex;

			//Show the drag container
			dragContainer.style.display = "block";
			dragContainer.style.position = "absolute";
			dragContainer.style.top = e.clientY + "px";
			dragContainer.style.left = e.clientX + "px";
		}
	}

	//Inserts the dropped event into the Scheduler (if dropped over it)
	function insertNewEvent(e) {
		var coordinates = [e.clientX, e.clientY];

		//Try to copy content only if the drag container is visible and contains text
		if (dragContainer.innerHTML != "") {
			dragContainer.innerHTML = "";
			dragContainer.style.display = "none";

			//Check if the drag container was dropped over the scheduler
			if (coordinates[0] >= tasksScheduler.offsetLeft && coordinates[0] <= (tasksScheduler.offsetLeft + tasksScheduler.clientWidth)
			&& coordinates[1] >= tasksScheduler.offsetTop && coordinates[1] <= (tasksScheduler.offsetTop + tasksScheduler.clientHeight)) {
				//Determine the time slot in the Scheduler where the drag container was dropped
				var slot = tasksScheduler.winControl.view._slotByPosition(e.clientX, e.clientY);
				if (slot) {
					//Get the correct time format before insering
					var start = getUtcDate(slot.start);
					var end = getUtcDate(slot.end);
					var task = tasksDataSource.view[rowIndex];
					//Add the new task to Scheduler and remove it from Grid
					taskEventsDataSource.add({
						id: task.id,
						title: task.title,
						start: start,
						end: end,
						startTimeZone: "Etc/UTC"
					});
					tasksDataSource.remove(task);
				}
			}
		}
	}

	//Converts the current date to UTC format
	function getUtcDate(timespan) {
		var date = new Date(timespan);
		var utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
		return utcDate;
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
			args.setPromise(WinJS.UI.processAll().then(function () {
				dragContainer = document.querySelector("#drag-container");
				var root = document.documentElement;
				root.addEventListener(getPointerEvent("move"), updatePosition);
				tasksGrid.addEventListener(getPointerEvent("down"), copyContent);
				root.addEventListener(getPointerEvent("up"), insertNewEvent);
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

	WinJS.Namespace.define("DragEventsExample", {
		tasksDataSource: tasksDataSource,
		taskEventsDataSource: taskEventsDataSource,
		//If a task is deleted from the Scheduler, put it back in the Grid
		removeTaskEvent: WinJS.Utilities.markSupportedForProcessing(function (e) {
			var event = e.event;
			tasksDataSource.add({ id: event.id, title: event.title })
		})
	});
})();
