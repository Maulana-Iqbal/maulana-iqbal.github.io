// Number Format
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

document.getElementById('amount_CF').addEventListener('input', function (event) {
	const input = event.target;
	const formattedValue = formatRupiah(input.value);
	// Update the input value with formatted value
	input.value = formattedValue;
});

// Global object to map Kategori to No_Categori
let categoryMapping = {};
let allData = []; // Cache for all fetched data

// Function to fetch all necessary data from SheetDB and populate the selects
function fetchData() {
	return fetch('https://sheetdb.io/api/v1/fftdc1zso7lnt?sheet=sheet2')
		.then((response) => response.json())
		.then((data) => {
			allData = data; // Cache the data

			// Populate categories
			populateCategories();

			// Populate payment methods
			populatePaymentMethods();
		})
		.catch((error) => console.error('Error fetching data:', error));
}

// Function to populate categories
function populateCategories() {
	const selectElement = document.getElementById('category_CF');

	// Clear existing options
	selectElement.innerHTML = '<option value="" selected disabled>Select a category</option>';

	// Populate options from cached data where Level column is '1'
	allData.forEach((item) => {
		if (item.Level === '1') {
			categoryMapping[item.Kategori] = item.No_Categori; // Map Kategori to No_Categori
			const option = document.createElement('option');
			option.value = item.Kategori; // Set the value to Kategori
			option.textContent = item.Kategori; // Display Kategori as text
			selectElement.appendChild(option);
		}
	});
}

// Function to populate sub-categories based on selected category
function populateSubCategories(categoryName) {
	const categoryNo = categoryMapping[categoryName]; // Get No_Categori from Kategori
	const selectElement = document.getElementById('sub_category_CF');

	// Clear existing options
	selectElement.innerHTML = '<option value="" selected disabled>Select a sub-category</option>';

	// Populate options based on the selected category from cached data
	allData.forEach((item) => {
		if (item.Parent === categoryNo) {
			// Filter sub-categories based on the parent number
			const option = document.createElement('option');
			option.value = item.Sub_Kategori; // Set the value for the option
			option.textContent = item.Sub_Kategori; // Set the text to display
			selectElement.appendChild(option); // Append the option to the select element
		}
	});
}

// Function to populate payment methods
function populatePaymentMethods() {
	const selectElement = document.getElementById('payment_method_CF');

	// Clear existing options
	selectElement.innerHTML = '<option value="" selected disabled>Select a payment method</option>';

	// Populate options from cached data where Payment_Method_CF_Level column is '1'
	allData.forEach((item) => {
		if (item.Payment_Method_CF_Level === '1') {
			const option = document.createElement('option');
			option.value = item.Payment_Method_CF_List;
			option.textContent = item.Payment_Method_CF_List;
			selectElement.appendChild(option);
		}
	});
}

// Event listener for category selection
document.getElementById('category_CF').addEventListener('change', function () {
	const selectedCategoryName = this.value;
	if (selectedCategoryName) {
		populateSubCategories(selectedCategoryName);
	}
});

// Function to handle form submission
function submitFormOut() {
	// Get form data
	const date_CF = document.getElementById('date_CF').value;
	const category_CF = document.getElementById('category_CF').value; // This will be Kategori
	const sub_category_CF = document.getElementById('sub_category_CF').value;
	const description_CF = document.getElementById('description_CF').value;
	const rawAmount_CF = document.getElementById('amount_CF').value;
	const amount_CF = parseRupiah(rawAmount_CF);
	const payment_method_CF = document.getElementById('payment_method_CF').value;

	// Generate ID_CF
	const id_CF = `="CFOUT"&${date_CF.replace(/-/g, '')}&row()`;

	// Get current date and time for created_at
	const created_at = new Date().toISOString(); // ISO format for created_at

	// Prepare data for API
	const data = {
		data: [
			{
				ID_CFOUT: id_CF,
				Date_CFOUT: date_CF,
				Category_CFOUT: category_CF, // Use Kategori here
				Sub_Category_CFOUT: sub_category_CF,
				Description_CFOUT: description_CF,
				Amount_CFOUT: amount_CF,
				Payment_Method_CFOUT: payment_method_CF,
				Created_At: created_at, // Add created_at here
			},
		],
	};

	// Send data using fetch
	fetch('https://sheetdb.io/api/v1/fftdc1zso7lnt', {
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
			document.getElementById('myForm').reset();
		})
		.catch((error) => {
			console.error('Error:', error);
			alert('Error submitting form. Please try again.');
		});
}

// Fetch all data and populate dropdowns when the page loads
window.onload = fetchData;
