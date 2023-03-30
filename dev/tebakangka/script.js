// Generate random number
let angka = Math.floor(Math.random() * 100) + 1;

// Counter for number of guesses
let tebakan = 1;

function tebak() {
	// Get user input
	let tebakan_user = document.getElementById("input").value;

	// Convert user input to integer
	tebakan_user = parseInt(tebakan_user);

	// Check if user input is a number
	if (isNaN(tebakan_user)) {
		document.getElementById("info").innerHTML = "Masukkan angka!";
	} else {
		// Check if user input is correct
		if (tebakan_user === angka) {
			document.getElementById("info").innerHTML = "Tebakan anda benar! Anda menebak sebanyak " + tebakan + " kali.";
			document.getElementById("input").disabled = true;
		} else {
			// Check if user input is too high or too low
			if (tebakan_user > angka) {
				document.getElementById("info").innerHTML = "Tebakan anda terlalu tinggi!";
			} else {
				document.getElementById("info").innerHTML = "Tebakan anda terlalu rendah!";
			}

			// Increment the number of guesses
			tebakan++;

			// Clear the input field
			document.getElementById("input").value = "";
		}
	}
}
