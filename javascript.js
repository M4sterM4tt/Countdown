// Countdown Code


// Date Variables
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
var distance;
var days;
var hours;
var minutes;
var seconds;
var distanceStored;
var daysStored;
var hoursStored;
var minutesStored;
var secondsStored;


// Storage Variables.
var detailsNow;
var countdownStorage;
var countdownJSON;
var loop;
var object;
var div;
var collection;




window.onload = function() {
	
	
	// Format Time
	now = new Date();
	formatNow = now.toString("HH:mm:ss");
	document.getElementById("timeInput").value = formatNow;
	formatNow = now.toString("yyyy-MM-dd");
	document.getElementById("dateInput").value = formatNow;
	
	
	// Creating Arrays
	distanceStored = [0];
	daysStored = [0];
	hoursStored = [0];
	minutesStored = [0];
	secondsStored = [0];
	countdownStorage = [0];
	div = [0];
	object = [0];
	collection = true;
	
	
	// Creating Events
	document.addEventListener("deviceready", Countdown, false);
	document.addEventListener("deviceready", startCountdown, false);
	
	
}




function Process() {
	
	
	name = nameInput.value;
	dateSet = timeInput.value;
	targetDate = new Date(dateInput.value);
	formatDate = targetDate.toString("MMMM dd yyyy") + " " + dateSet.toString("HH:mm:ss");
	document.getElementById("target").innerHTML = formatDate;
	countdownDate = new Date(formatDate).getTime();
	
	
	countdownStorage[Number(countdownStorage.length)] = { "id":Number(countdownStorage.length), "name":name, "date":countdownDate }
	countdownJSON = JSON.stringify(countdownStorage[Number(countdownStorage.length)-1]);
	localStorage.setItem(Number(countdownStorage.length)-1, countdownJSON);
	text = localStorage.getItem(Number(countdownStorage.length)-1);
	object[Number(object.length)] = JSON.parse(text);
	
	
	Countdown();
	
}




function startCountdown() {
	
		// Get todays date and time.
		now = new Date().getTime();
		
		loop = 1;
		
		while (collection == true) {
			
			text = localStorage.getItem(loop);
			object[loop] = JSON.parse(text);
			if (loop == object[loop].id) {
				
				distanceStored[loop] = object[loop].date - now;
				daysStored[loop] = Math.floor(distance / (1000 * 60 * 60 * 24));
				hoursStored[loop] = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				minutesStored[loop] = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
				secondsStored[loop] = Math.floor((distance % (1000 * 60)) / 1000);
				document.getElementById("stored").innerHTML = document.getElementById("stored").innerHTML + object[loop].name + ":    " + daysStored[loop] + " days, " + hoursStored[loop] + " hours, " + minutesStored[loop] + " minutes, " + secondsStored[loop] + " seconds. "  + "<BR>";
				
			}
			else {
				collection = false;
			}
			
			loop = loop + 1;			
		}
	
}




function Countdown() {
	
    process = setInterval(function() {
		
		// For the First page.
		// Get todays date and time.
		now = new Date().getTime();
		
		// Find the distance between now an the count down date.
		distance = countdownDate - now;
		
		// Time calculations for days, hours, minutes and seconds.
		days = Math.floor(distance / (1000 * 60 * 60 * 24));
		hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		seconds = Math.floor((distance % (1000 * 60)) / 1000);
		
		// Output the Result.
		if (distance < 0) {
			// When the Countdown is Over.
			document.getElementById("countdown").innerHTML = name + ":   EXPIRED";
		}
		else {
			// Countdown is still going.
			document.getElementById("countdown").innerHTML = name + ":   " + days + " days, " + hours + " hours, " + minutes + " minutes, " + seconds + " seconds. ";
		}
		
		
		// For the Second page.
		// Clears HTML Element.
		document.getElementById("stored").innerHTML = "";
		
		// Creates a loop.
		for(loop = 1; loop < countdownStorage.length; loop+=1) {
			
			// Get todays date and time.
			distanceStored[loop] = object[loop].date - now;
			
			// Time calculations for days, hours, minutes and seconds.
			daysStored[loop] = Math.floor(distanceStored[loop] / (1000 * 60 * 60 * 24));
			hoursStored[loop] = Math.floor((distanceStored[loop] % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			minutesStored[loop] = Math.floor((distanceStored[loop] % (1000 * 60 * 60)) / (1000 * 60));
			secondsStored[loop] = Math.floor((distanceStored[loop] % (1000 * 60)) / 1000);
			
			// Output the Result.
			if (distanceStored[loop] < 0) {
				// When the Countdown is Over.
				document.getElementById("stored").innerHTML = document.getElementById("stored").innerHTML + name + ":   EXPIRED"  + "<BR>";
			}
			else {
				// Countdown is still going.
				document.getElementById("stored").innerHTML = document.getElementById("stored").innerHTML + object[loop].name + ":    " + daysStored[loop] + " days, " + hoursStored[loop] + " hours, " + minutesStored[loop] + " minutes, " + secondsStored[loop] + " seconds. "  + "<BR>";
			}
			
		}	
		
	}, 1000);

}