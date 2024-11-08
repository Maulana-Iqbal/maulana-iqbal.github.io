// Cover
$(document).ready(function () {
	// Pastikan hanya #cover yang muncul pertama kali
	$('#cover').fadeIn(500); // Menampilkan cover saat halaman pertama kali dimuat
	$('#salam, #quote, #mempelai, #acara, #alamat, #galeri, #doa, #rsvp, #hadiah').hide(); // Menyembunyikan elemen lain saat pertama kali

	// Ketika tombol "Open" diklik
	$('#openButton').click(function (e) {
		e.preventDefault(); // Mencegah default action (navigasi ke #salam)

		// Sembunyikan elemen #cover
		$('#cover').hide(500, function () {
			// Setelah elemen #cover disembunyikan, tampilkan elemen lainnya
			$('#salam, #quote, #mempelai, #acara, #alamat, #galeri, #doa, #rsvp, #hadiah').show(500); // Menampilkan elemen lainnya dengan animasi
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
	const commentForm = document.getElementById('kirimUcapan');

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

				// // Merefresh halaman setelah sukses
				// setTimeout(() => {
				// 	location.reload(); // Memuat ulang halaman setelah 2 detik
				// }, 1000); // Waktu tunggu sebelum refresh (2 detik)
				// Hide the comment form after successful submission
				commentForm.style.display = 'none';
				updateCommentSection(); // Function to update the comment section
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

// Function to update the comment section by fetching new comments
function updateCommentSection() {
	fetch(apiUrl) // Pastikan apiUrl mengarah ke endpoint yang mengembalikan daftar komentar
		.then((response) => response.json())
		.then((data) => {
			const commentSection = document.getElementById('commentSection');
			commentSection.innerHTML = ''; // Clear existing comments

			// Loop through each item in the data array and create a card for each comment
			data.forEach((item) => {
				// Membuat elemen card baru
				const card = document.createElement('div');
				card.classList.add('card', 'mb-3'); // Add 'card' and 'mb-3' classes for styling

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

				// Menambahkan card ke dalam commentSection
				commentSection.appendChild(card);
			});
		})
		.catch((error) => {
			console.error('Error fetching comments:', error);
		});
}

// Initialize form submission
document.getElementById('commentForm').addEventListener('submit', addComment);

// Scroll
let currentSection = 0;
const sections = document.querySelectorAll('.cover, .salam, .quote, .mempelai, .acara, .alamat, .galeri, .doa, .rsvp, .hadiah');
const totalSections = sections.length;
let isScrolling = false; // Menghindari double scroll

// Fungsi untuk menggulir ke bagian tertentu
function scrollToSection(index) {
	// Pastikan index berada dalam rentang yang valid
	if (index >= 0 && index < totalSections && !isScrolling) {
		isScrolling = true; // Menandakan sedang menggulir

		// Scroll ke elemen yang sesuai
		sections[index].scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});

		// Setel currentSection
		currentSection = index;

		// Setel isScrolling kembali ke false setelah scroll selesai (timeout 1 detik)
		setTimeout(() => {
			isScrolling = false;
		}, 1000); // Atur waktu delay untuk scroll selesai
	}
}

// Event listener untuk scroll dengan mouse
document.addEventListener(
	'wheel',
	(event) => {
		// Hanya merespon scroll vertikal dan menghindari aksi scroll default
		event.preventDefault();

		// Cek apakah scroll ke bawah atau ke atas
		if (event.deltaY > 0) {
			// Scroll ke bawah (next section)
			scrollToSection(currentSection + 1);
		} else if (event.deltaY < 0) {
			// Scroll ke atas (previous section)
			scrollToSection(currentSection - 1);
		}
	},
	{ passive: false }
);

// Menambahkan logika untuk perangkat sentuh (touch devices)
let yDown = null;

// Fungsi untuk menangani sentuhan pertama
function handleTouchStart(evt) {
	const firstTouch = evt.touches[0];
	yDown = firstTouch.clientY;
}

// Fungsi untuk menangani pergerakan sentuhan
function handleTouchMove(evt) {
	if (!yDown) return;

	let yUp = evt.touches[0].clientY;
	let yDiff = yDown - yUp;

	if (Math.abs(yDiff) > 50) {
		// Menambahkan ambang batas agar geseran cukup besar
		if (yDiff > 0) {
			// Scroll ke bawah (next section)
			scrollToSection(currentSection + 1);
		} else {
			// Scroll ke atas (previous section)
			scrollToSection(currentSection - 1);
		}
		yDown = null; // Reset nilai setelah scroll
	}
}

// Menghindari scroll default pada elemen yang digulirkan
function preventDefaultScroll(evt) {
	evt.preventDefault();
}

// Menambahkan event listeners untuk touchstart dan touchmove
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, { passive: false });

// Pastikan halaman tidak ter-scroll native pada elemen tertentu
sections.forEach((section) => {
	section.addEventListener('wheel', preventDefaultScroll, { passive: false });
});

// Menambahkan event listener untuk scroll pada mouse dan touch secara bersamaan
document.addEventListener(
	'touchmove',
	(event) => {
		if (yDown) {
			// Menghentikan scroll native ketika sudah menggunakan logika scroll kita
			event.preventDefault();
		}
	},
	{ passive: false }
);

// Membuat halaman responsif penuh untuk setiap section
window.addEventListener('resize', () => {
	sections.forEach((section) => {
		// Pastikan setiap section mengambil tinggi penuh layar
		section.style.height = `${window.innerHeight}px`;
	});
});

// Setel tinggi untuk setiap section ketika halaman pertama kali dimuat
window.addEventListener('load', () => {
	sections.forEach((section) => {
		section.style.height = `${window.innerHeight}px`;
	});
});
