// Atur tanggal countdown di sini
const targetDate = new Date('2024-12-01T00:00:00').getTime();

const updateCountdown = () => {
	const now = new Date().getTime();
	const distance = targetDate - now;

	// Hitung hari, jam, menit, dan detik
	const days = Math.floor(distance / (1000 * 60 * 60 * 24));
	const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((distance % (1000 * 60)) / 1000);

	// Update tampilan
	document.getElementById('days').querySelector('h1').innerHTML = days;
	document.getElementById('hours').querySelector('h1').innerHTML = hours;
	document.getElementById('minutes').querySelector('h1').innerHTML = minutes;
	document.getElementById('seconds').querySelector('h1').innerHTML = seconds;

	// Jika countdown selesai
	if (distance < 0) {
		clearInterval(interval);
		document.querySelectorAll('.acara-body-time h1').forEach((el) => (el.innerHTML = '0'));
	}
};

// Update countdown setiap detik
const interval = setInterval(updateCountdown, 1000);

// Copytext
function copyText(id) {
	// Mendapatkan elemen <p> berdasarkan ID yang diteruskan
	var text = document.getElementById(id);

	// Membuat range dan seleksi teks
	var range = document.createRange();
	range.selectNode(text);
	window.getSelection().removeAllRanges(); // Clear previous selections
	window.getSelection().addRange(range); // Seleksi teks

	// Menyalin teks ke clipboard
	try {
		document.execCommand('copy');
		// alert('Teks berhasil disalin!');
	} catch (err) {
		// alert('Gagal menyalin teks.');
	}

	// Menghapus seleksi setelah menyalin
	window.getSelection().removeAllRanges();
}

// comment box view
document.addEventListener('DOMContentLoaded', () => {
	const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTtb89IysUei1hQpDIFFPw0ea17vStb6VNjnuVTgMM6-BgxKo_gwcKuxYeKvsK1qUkvcwjfdS5B0NPC/pubhtml?gid=1938648971&single=true';

	fetch(sheetUrl)
		.then((response) => response.text())
		.then((text) => {
			const parser = new DOMParser();
			const doc = parser.parseFromString(text, 'text/html');

			const table = doc.querySelector('table');
			if (!table) {
				console.error('Table not found!');
				return;
			}

			const rows = table.querySelectorAll('tr');
			const commentSection = document.querySelector('#commentSection');

			// Clear any existing content
			commentSection.innerHTML = '';

			rows.forEach((row, rowIndex) => {
				if (rowIndex === 0) return; // Skip header row

				const cells = row.querySelectorAll('td');

				// Ambil data dari kolom B (index 1) sebagai Nama
				if (cells[1] && cells[2]) {
					const name = cells[1].innerText.trim(); // Nama di Kolom B
					const comment = cells[2].innerText.trim(); // Komentar di Kolom C

					// Membuat div untuk satu komentar (Nama dan Komentar dalam satu div)
					const commentDiv = document.createElement('div');
					commentDiv.classList.add('card', 'mb-1'); // Menambahkan kelas Bootstrap untuk gaya

					// Mengisi konten dengan nama dan komentar
					commentDiv.innerHTML = `
					<div class="card-body">
						<h5 class="card-title">${name}</h5>
						<p class="card-text">${comment}</p>
					</div>
					`;

					// Menambahkan div komentar ke dalam commentSection
					commentSection.appendChild(commentDiv);
				}
			});
		})
		.catch((error) => {
			console.error('Error fetching the sheet:', error);
		});
});

// Comment box add

const apiUrl = 'https://sheetdb.io/api/v1/y0p8jbk2zh5mb'; // API endpoint

// Function to generate a unique ID based on timestamp and random number
function generateUniqueId() {
	const timestamp = new Date().getTime(); // Current timestamp in milliseconds
	const randomNum = Math.floor(Math.random() * 10000); // Random number between 0 and 9999
	return `="CM"&${timestamp}${randomNum}&row()`;
}

// Function to add a new comment
function addComment(event) {
	event.preventDefault(); // Prevent form from submitting normally

	const Name = document.getElementById('name').value.trim();
	const Comment = document.getElementById('comment').value.trim();
	const errorMessage = document.getElementById('error-message');

	// Validate the form data
	if (Name && Comment) {
		// Generate a unique ID for the new comment
		const newId = generateUniqueId();

		// Post new comment with generated ID
		fetch(apiUrl, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				ID: newId,
				Name: Name,
				Comment: Comment,
			}),
		})
			.then((response) => response.json())
			.then(() => {
				// Clear input fields
				document.getElementById('name').value = '';
				document.getElementById('comment').value = '';

				// Show success message
				errorMessage.textContent = 'Comment successfully submitted!';
				errorMessage.classList.remove('error');
				errorMessage.classList.add('success');
				errorMessage.style.display = 'block';
			})
			.catch((error) => {
				console.error('Error adding comment:', error);
				errorMessage.textContent = 'There was an error submitting your comment. Please try again.';
				errorMessage.classList.remove('success');
				errorMessage.classList.add('error');
				errorMessage.style.display = 'block';
			});
	} else {
		errorMessage.textContent = 'Please fill out both fields.';
		errorMessage.classList.remove('success');
		errorMessage.classList.add('error');
		errorMessage.style.display = 'block';
	}
}

// Initialize form submission
document.getElementById('commentForm').addEventListener('submit', addComment);
