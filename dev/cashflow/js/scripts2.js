// Number Format for Rupiah
function formatRupiah(value) {
	// Remove non-numeric characters except decimal
	const number = value.replace(/[^0-9]/g, '');
	// Format number with thousand separator
	const formattedNumber = number.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
	return formattedNumber ? 'Rp ' + formattedNumber : '';
}

function parseRupiah(value) {
	// Remove 'Rp ' and format separator, then convert to number
	return parseFloat(value.replace(/[^\d]/g, ''));
}

// Format amount input
document.getElementById('amount_CFIN').addEventListener('input', function (event) {
	const input = event.target;
	const formattedValue = formatRupiah(input.value);
	// Update the input value with formatted value
	input.value = formattedValue;
});

// Function to handle form submission
function submitForIn() {
	// Get form data
	const date_CFIN = document.getElementById('date_CFIN').value;
	const category_CFIN = document.getElementById('category_CFIN').value;
	const description_CFIN = document.getElementById('description_CFIN').value;
	const rawAmount_CFIN = document.getElementById('amount_CFIN').value;
	const amount_CFIN = parseRupiah(rawAmount_CFIN);
	const created_at = new Date().toISOString(); // ISO format for created_at

	// Generate ID_CFIN
	const id_CFIN = `="CFIN"&${date_CFIN.replace(/-/g, '')}&row()`;

	// Prepare data for API
	const data = {
		data: [
			{
				ID_CFIN: id_CFIN,
				Category_CFIN: category_CFIN,
				Amount_CFIN: amount_CFIN,
				Description_CFIN: description_CFIN,
				Date_CFIN: date_CFIN,
				Created_At: created_at,
			},
		],
	};

	// Send data using fetch
	fetch('https://sheetdb.io/api/v1/fftdc1zso7lnt?sheet=sheet3', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
		.then((response) => response.json())
		.then((data) => {
			console.log('Success:', data);
			alert('Form submitted successfully!');

			// Clear form fields
			document.getElementById('myFormIn').reset();
		})
		.catch((error) => {
			console.error('Error:', error);
			alert('Error submitting form. Please try again.');
		});
}
