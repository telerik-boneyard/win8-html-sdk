// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
	"use strict";

	WinJS.Binding.optimizeBindingReferences = true;

	var app = WinJS.Application;
	var activation = Windows.ApplicationModel.Activation;
	var calendarElement,
		calendarCtrl,
		pickerInput,
		valueInput,
		selectionBtn,
		selectionSpan;

	function showCalendar() {
		calendarElement.style.visibility = "visible";
	}

	function hideCalendar() {
		calendarElement.style.visibility = "hidden";
	}

	function getSelectedDate() {
		var date = new Date(valueInput.value);
		selectionSpan.innerText = date;
	}

	function maintainCalendarVisibility(e) {
		if (calendarElement.style.visibility == "visible") {
			setTimeout(function () {
				showCalendar();
				pickerInput.focus();
			}, 10);
		}
	}

	function selectDate(e) {
		var date = e.target.value;
		pickerInput.value = date.toLocaleDateString();
		valueInput.value = date;
		hideCalendar();
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
				calendarElement = document.querySelector("#calendar");
				calendarCtrl = calendarElement.winControl;
				pickerInput = document.querySelector("#textInput");
				valueInput = document.querySelector("#valueInput");
				selectionBtn = document.querySelector("#btn");
				selectionSpan = document.querySelector("#selection");

				pickerInput.addEventListener("click", showCalendar);
				pickerInput.addEventListener("blur", hideCalendar);
				calendarCtrl.addEventListener("change", selectDate);
				calendarCtrl.addEventListener("navigate", maintainCalendarVisibility);
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
