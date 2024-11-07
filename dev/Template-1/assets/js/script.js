// Cover
$(document).ready(function () {
	// Ketika tombol "Open" diklik
	$('#openButton').click(function (e) {
		e.preventDefault(); // Mencegah default action (navigasi ke #salam)

		// Sembunyikan elemen dengan ID #cover
		$('#cover').fadeOut(500, function () {
			// Setelah elemen #cover hilang, tampilkan elemen #salam
			$('#salam').fadeIn(500);
		});
	});
});

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

// comment box view (dimatikan sementara)
const store = new SteinStore('https://api.steinhq.com/v1/storages/672b042fc0883333654b5a17');

// Mengambil semua data dari Sheet1 tanpa limit dan offset
store
	.read('Sheet1')
	.then((data) => {
		console.log(data); // Menampilkan seluruh data yang diambil

		// Menemukan elemen dengan id 'data-container'
		const container = document.getElementById('commentSection');

		// Perulangan data dan menambahkan card untuk setiap baris data
		data.forEach((item) => {
			// Membuat elemen card baru
			const card = document.createElement('div');
			card.classList.add('card');
			card.classList.add('mb-3');

			// Membuat bagian card-body
			const cardBody = document.createElement('div');
			cardBody.classList.add('card-body');

			// Menambahkan judul (h5) untuk Name
			const cardTitle = document.createElement('h5');
			cardTitle.classList.add('card-title');
			cardTitle.textContent = item.Name; // Ambil data Name

			// Menambahkan paragraf (p) untuk Comment
			const cardText = document.createElement('p');
			cardText.classList.add('card-text');
			cardText.textContent = item.Comment; // Ambil data Comment

			// Menambahkan cardTitle dan cardText ke dalam cardBody
			cardBody.appendChild(cardTitle);
			cardBody.appendChild(cardText);

			// Menambahkan cardBody ke dalam card
			card.appendChild(cardBody);

			// Menambahkan card ke dalam container
			container.appendChild(card);
		});
	})
	.catch((error) => {
		console.error('Error:', error); // Menangani error jika ada
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

				// Merefresh halaman setelah sukses
				setTimeout(() => {
					location.reload(); // Memuat ulang halaman setelah 2 detik
				}, 1000); // Waktu tunggu sebelum refresh (2 detik)
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
