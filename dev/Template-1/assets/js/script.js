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
