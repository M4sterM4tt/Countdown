// Countdown Code


// Date Variables
var now;
var formatNow;


// Create Countdown Variables.
var name;
var targetTime;
var targetDate;
var targetCountdown;
var date;


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
var collection;




window.onload = function() {
	
	
	// Format Time.
	now = new Date();
	formatNow = now.toString("HH:mm:ss");
	document.getElementById("timeInput").value = formatNow;
	formatNow = now.toString("yyyy-MM-dd");
	document.getElementById("dateInput").value = formatNow;
	
	
	// Setting Arrays.
	object = [0];
	countdownStorage = [0];
	distanceStored = [0];
	daysStored = [0];
	hoursStored = [0];
	minutesStored = [0];
	secondsStored = [0];
	
	
	// Setting Switches.
	collection = true;
	empty = true;
	
	
	// Creating Events
	document.addEventListener("deviceready", startCountdown, false);
	document.addEventListener("deviceready", Countdown, false);
	
	
}




function Process() {
	
	name = nameInput.value;
	targetTime = timeInput.value;
	targetDate = new Date(dateInput.value);
	targetCountdown = targetDate.toString("MMMM dd yyyy") + " " + targetTime.toString("HH:mm:ss");
	document.getElementById("target").innerHTML = targetCountdown;
	date = new Date(targetCountdown).getTime();
	
	found = false;
	for	(loop = 1; loop < countdownStorage.length + 1; loop+=1) {
	
		if (loop != countdownStorage[loop] && found == false) {	
			
			countdownStorage[loop] = loop;
			found = { "id":countdownStorage[loop], "name":name, "date":date }
			countdownJSON = JSON.stringify(found);
			localStorage.setItem(loop, countdownJSON);
			text = localStorage.getItem(loop);
			object[loop] = JSON.parse(text);
			console.log(object[loop])
		}
		
	}
		
	
	empty = false;
	Countdown();
	
}




function startCountdown() {
	
	// Get todays date and time.
	now = new Date().getTime();
	
	for	(loop = 1; loop < 1000; loop+=1) {
				
		text = localStorage.getItem(loop);
		object[loop] = JSON.parse(text);	
			
		if (loop == object[loop].id) {
			
			countdownStorage[loop] = loop;
			distanceStored[loop] = object[loop].date - now;
			daysStored[loop] = Math.floor(distance / (1000 * 60 * 60 * 24));
			hoursStored[loop] = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			minutesStored[loop] = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			secondsStored[loop] = Math.floor((distance % (1000 * 60)) / 1000);
			document.getElementById("stored").innerHTML = document.getElementById("stored").innerHTML + object[loop].id + ". " + object[loop].name + ":    " + daysStored[loop] + " days, " + hoursStored[loop] + " hours, " + minutesStored[loop] + " minutes, " + secondsStored[loop] + " seconds. "  + "<BR>";
				
		}
			
	}			
	
}




function Countdown() {
	
    start = setInterval(function() {
		
		// Get todays date and time.
		now = new Date().getTime();
			
		if (empty == false) {
			
			
			// For the First page.
			
			// Find the distance between now an the count down date.
			distance = date - now;
			
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
			
		}
		
		
		// For the Second page.
		
		// Clears HTML Element.
		document.getElementById("stored").innerHTML = "";
		
		// Creates a loop.
		for(loop = 1; loop < 1000; loop+=1) {
			
			text = localStorage.getItem(loop);
			object[loop] = JSON.parse(text);	
			
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
				document.getElementById("stored").innerHTML = document.getElementById("stored").innerHTML + object[loop].id + ". " + object[loop].name + ":   EXPIRED"  + "<BR>";
			}
			else {
				// Countdown is still going.
				document.getElementById("stored").innerHTML = document.getElementById("stored").innerHTML + object[loop].id + ". "  + object[loop].name + ":    " + daysStored[loop] + " days, " + hoursStored[loop] + " hours, " + minutesStored[loop] + " minutes, " + secondsStored[loop] + " seconds. "  + "<BR>";
			}
				
		}	
		
	}, 1000);

}