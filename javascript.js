// Countdown Code


// Date Input Variables
var now; // Variable for current date.
var formatNow; // Variable for changing the format of the current date.


// Countdown Variables.
var targetDate;
var formatDate;
var countdownDate;
var process;
var now;
var distance;


// Time Variables.
var days;
var hours;
var minutes;
var seconds;


// Storage Variables.
var detailsNow;
var countdownStorage;
var countdownJSON;
var loop;
var div;


window.onload = function() {
	
	now = new Date();
	
	formatNow = now.toString("HH:mm:ss");
	document.getElementById("timeInput").value = formatNow;
	
	formatNow = now.toString("yyyy-MM-dd");
	document.getElementById("dateInput").value = formatNow;
	
	countdownStorage = [0];
	div = [0];
	document.addEventListener("deviceready", onDeviceReady, false);

}


function Process() {
	
	
	name = nameInput.value;
	dateOne = timeInput.value;
	targetDate = new Date(dateInput.value);
	formatDate = targetDate.toString("MMMM dd yyyy") + " " + dateOne.toString("HH:mm:ss");
	document.getElementById("target").innerHTML = formatDate;
	countdownDate = new Date(formatDate).getTime();
	
	countdownStorage[countdownStorage.length] = { "name":name, "date":countdownDate }
	countdownJSON = JSON.stringify(countdownStorage);
	window.localStorage.setItem("testJSON1", countdownStorage);
	window.localStorage.setItem("testJSON2", countdownJSON);
	text = window.localStorage.getItem("testJSON2");
	object = JSON.parse(text);
	
	
	process = setInterval(function() {


		// Get todays date and time.
		now = new Date().getTime();
		
		// Find the distance between now an the count down date.
		distance = countdownDate - now;
		
		// Time calculations for days, hours, minutes and seconds.
		days = Math.floor(distance / (1000 * 60 * 60 * 24));
		hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		seconds = Math.floor((distance % (1000 * 60)) / 1000);
		
		// Output the Result"
		document.getElementById("countdown").innerHTML = name + ":   " + days + "days " + hours + "hours " + minutes + "minutes " + seconds + "seconds ";
		
		// When the Countdown is Over.
		if (distance < 0) {
			clearInterval(process);
			document.getElementById("countdown").innerHTML = name + ":   EXPIRED";
		}
	}, 1000);
	
}


function onDeviceReady() {
	
    process = setInterval(function() {
		
		for(loop = 1; loop < countdownStorage.length - 1; loop+=1) {
			
			div[loop] = document.createElement("div");
			div.id = loop;
			document.body.appendChild(div[loop]);
			
			distance = object[loop].date - now;
			days[loop] = Math.floor(distance / (1000 * 60 * 60 * 24));
			hours[loop] = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			minutes[loop] = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			seconds[loop] = Math.floor((distance % (1000 * 60)) / 1000);
			document.getElementById("stored").innerHTML = object[loop].name + ":    " + days[loop] + "days " + hours[loop] + "hours " + minutes[loop] + "minutes " + seconds[loop] + "seconds ";
			
		}
		
	}, 1000);
	
}

