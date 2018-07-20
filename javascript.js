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
var loopTwo;
var loopThree;
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
	
	for(draw = 0; draw < 999; draw+=1) {
		object.push(0);
		countdownStorage.push(0);
		distanceStored.push(0);
		daysStored.push(0);
		hoursStored.push(0);
		minutesStored.push(0);
		secondsStored.push(0);
	}
	
	// Setting Switches.
	collection = true;
	empty = true;
	
	
	// Creating Events
	document.addEventListener("deviceready", startCountdown, false);	
	
	
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
	
	for	(loopTwo = 1; loopTwo < 1000; loopTwo+=1) {
				
		text = localStorage.getItem(loopTwo);
		object[loopTwo] = JSON.parse(text);	
			
		if (loopTwo == object[loopTwo].id) {
			
			countdownStorage[loopTwo] = loopTwo;
			distanceStored[loopTwo] = object[loopTwo].date - now;
			daysStored[loopTwo] = Math.floor(distanceStored[loopTwo] / (1000 * 60 * 60 * 24));
			hoursStored[loopTwo] = Math.floor((distanceStored[loopTwo] % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			minutesStored[loopTwo] = Math.floor((distanceStored[loopTwo] % (1000 * 60 * 60)) / (1000 * 60));
			secondsStored[loopTwo] = Math.floor((distanceStored[loopTwo] % (1000 * 60)) / 1000);
			
			// Output the Result.
			if (distanceStored[loopTwo] < 0) {
				// When the Countdown is Over.
				document.getElementById("stored").innerHTML = document.getElementById("stored").innerHTML + object[loopTwo].id + ". " + object[loopTwo].name + ":   EXPIRED"  + "<BR>";
				localStorage.removeItem(loopTwo);
			}
			else {
				// Countdown is still going.
				document.getElementById("stored").innerHTML = document.getElementById("stored").innerHTML + object[loopTwo].id + ". " + object[loopTwo].name + ":    " + daysStored[loopTwo] + " days, " + hoursStored[loopTwo] + " hours, " + minutesStored[loopTwo] + " minutes, " + secondsStored[loopTwo] + " seconds. "  + "<BR>";
			}
				
		}
			
	}			
	
	Countdown();
	
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
		for(loopThree = 1; loopThree < 1000; loopThree+=1) {
			
			text = localStorage.getItem(loopThree);
			object[loopThree] = JSON.parse(text);	
			
			// Get todays date and time.
			distanceStored[loopThree] = object[loopThree].date - now;
				
			// Time calculations for days, hours, minutes and seconds.
			daysStored[loopThree] = Math.floor(distanceStored[loopThree] / (1000 * 60 * 60 * 24));
			hoursStored[loopThree] = Math.floor((distanceStored[loopThree] % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			minutesStored[loopThree] = Math.floor((distanceStored[loopThree] % (1000 * 60 * 60)) / (1000 * 60));
			secondsStored[loopThree] = Math.floor((distanceStored[loopThree] % (1000 * 60)) / 1000);
				
			// Output the Result.
			if (distanceStored[loopThree] < 0) {
				// When the Countdown is Over.
				document.getElementById("stored").innerHTML = document.getElementById("stored").innerHTML + object[loopThree].id + ". " + object[loopThree].name + ":   EXPIRED"  + "<BR>";
				localStorage.removeItem(loopThree);
			}
			else {
				// Countdown is still going.
				document.getElementById("stored").innerHTML = document.getElementById("stored").innerHTML + object[loopThree].id + ". "  + object[loopThree].name + ":    " + daysStored[loopThree] + " days, " + hoursStored[loopThree] + " hours, " + minutesStored[loopThree] + " minutes, " + secondsStored[loopThree] + " seconds. "  + "<BR>";
			}
				
		}	
		
	}, 1000);

}