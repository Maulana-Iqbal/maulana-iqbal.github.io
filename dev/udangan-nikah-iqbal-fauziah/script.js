$(window).scroll(function () {
	var wScroll = $(this).scrollTop();

	if (wScroll > $('.flower').offset().top - 500) {
		$('.flower').addClass('muncul');
	} else {
		$('.flower').removeClass('muncul');
	}

	if (wScroll > $('.title').offset().top - 510) {
		$('.title').addClass('muncul');
	} else {
		$('.title').removeClass('muncul');
	}

	if (wScroll > $('.opening').offset().top - 530) {
		$('.opening').addClass('muncul');
	} else {
		$('.opening').removeClass('muncul');
	}

	if (wScroll > $('.profiles').offset().top - 560) {
		$('.profiles').addClass('muncul');
	} else {
		$('.profiles').removeClass('muncul');
	}

	if (wScroll > $('.profile-1').offset().top - 500) {
		$('.profile-1').addClass('muncul');
	} else {
		$('.profile-1').removeClass('muncul');
	}

	if (wScroll > $('.profile-2').offset().top - 500) {
		$('.profile-2').addClass('muncul');
	} else {
		$('.profile-2').removeClass('muncul');
	}

	if (wScroll > $('.dan').offset().top - 550) {
		$('.dan').addClass('muncul');
	} else {
		$('.dan').removeClass('muncul');
	}

	if (wScroll > $('.dan2').offset().top - 500) {
		$('.dan2').addClass('muncul');
	} else {
		$('.dan2').removeClass('muncul');
	}

	if (wScroll > $('.flower2').offset().top - 550) {
		$('.flower2').addClass('muncul');
	} else {
		$('.flower2').removeClass('muncul');
	}

	if (wScroll > $('.title2').offset().top - 540) {
		$('.title2').addClass('muncul');
	} else {
		$('.title2').removeClass('muncul');
	}

	if (wScroll > $('.flower3').offset().top - 550) {
		$('.flower3').addClass('muncul');
	} else {
		$('.flower3').removeClass('muncul');
	}

	if (wScroll > $('.title3').offset().top - 550) {
		$('.title3').addClass('muncul');
	} else {
		$('.title3').removeClass('muncul');
	}

	if (wScroll > $('.flower4').offset().top - 550) {
		$('.flower4').addClass('muncul');
	} else {
		$('.flower4').removeClass('muncul');
	}

	if (wScroll > $('.title4').offset().top - 550) {
		$('.title4').addClass('muncul');
	} else {
		$('.title4').removeClass('muncul');
	}

	if (wScroll > $('.flower5').offset().top - 550) {
		$('.flower5').addClass('muncul');
	} else {
		$('.flower5').removeClass('muncul');
	}

	if (wScroll > $('.title5').offset().top - 550) {
		$('.title5').addClass('muncul');
	} else {
		$('.title5').removeClass('muncul');
	}

	if (wScroll > $('.card1').offset().top - 500) {
		$('.card1').addClass('muncul');
	} else {
		$('.card1').removeClass('muncul');
	}

	if (wScroll > $('.card2').offset().top - 500) {
		$('.card2').addClass('muncul');
	} else {
		$('.card2').removeClass('muncul');
	}

	if (wScroll > $('#img1').offset().top - 600) {
		$('#img1').addClass('muncul');
	} else {
		$('#img1').removeClass('muncul');
	}

	if (wScroll > $('#img2').offset().top - 600) {
		$('#img2').addClass('muncul');
	} else {
		$('#img2').removeClass('muncul');
	}

	if (wScroll > $('#img3').offset().top - 600) {
		$('#img3').addClass('muncul');
	} else {
		$('#img3').removeClass('muncul');
	}

	if (wScroll > $('#img4').offset().top - 600) {
		$('#img4').addClass('muncul');
	} else {
		$('#img4').removeClass('muncul');
	}

	if (wScroll > $('#img5').offset().top - 600) {
		$('#img5').addClass('muncul');
	} else {
		$('#img5').removeClass('muncul');
	}

	if (wScroll > $('#img6').offset().top - 600) {
		$('#img6').addClass('muncul');
	} else {
		$('#img6').removeClass('muncul');
	}

	if (wScroll > $('.circle1').offset().top - 550) {
		$('.circle1').addClass('muncul');
	} else {
		$('.circle1').removeClass('muncul');
	}

	if (wScroll > $('.circle2').offset().top - 550) {
		$('.circle2').addClass('muncul');
	} else {
		$('.circle2').removeClass('muncul');
	}

	if (wScroll > $('.circle3').offset().top - 550) {
		$('.circle3').addClass('muncul');
	} else {
		$('.circle3').removeClass('muncul');
	}

	if (wScroll > $('.circle4').offset().top - 550) {
		$('.circle4').addClass('muncul');
	} else {
		$('.circle4').removeClass('muncul');
	}

	if (wScroll > $('.btn-map').offset().top - 550) {
		$('.btn-map').addClass('muncul');
	} else {
		$('.btn-map').removeClass('muncul');
	}
});

document.getElementById('open').addEventListener('click', () => {
	const cover = document.querySelector('#cover');
	cover.style.opacity = '0';

	setTimeout(() => {
		cover.style.display = 'none';
	}, 1000); // Sesuaikan dengan durasi transisi dalam milidetik

	setTimeout(() => {
		cover.classList.add('hidden');
	}, 1200); // Sesuaikan dengan durasi transisi + waktu tunda
});

// END JS ANIMATION

// LIGHBOX JS
var fullImgBox = document.getElementById('fullImgBox');
var fullImg = document.getElementById('fullImg');

function openFullImg(pic) {
	fullImgBox.style.display = 'flex';
	fullImg.src = pic;
}

function closeFullImg() {
	fullImgBox.style.display = 'none';
}

// audio js
const playerButton = document.querySelector('.player-button'),
	audio = document.querySelector('audio'),
	timeline = document.querySelector('.timeline'),
	soundButton = document.querySelector('.sound-button'),
	playIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#3D3132">
    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
  </svg>
      `,
	pauseIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#3D3132">
  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
</svg>
      `;

function toggleAudio() {
	if (audio.paused) {
		audio.play();
		playerButton.innerHTML = pauseIcon;
	} else {
		audio.pause();
		playerButton.innerHTML = playIcon;
	}
}

playerButton.addEventListener('click', toggleAudio);

function changeTimelinePosition() {
	const percentagePosition = (100 * audio.currentTime) / audio.duration;
	timeline.style.backgroundSize = `${percentagePosition}% 100%`;
	timeline.value = percentagePosition;
}

// NAV JS
// $(document).ready(function() {
//     $('li').on('click', function(){
//         $(this).siblings().removeClass('active');
//         $(this).addClass('active');
//     })
// });

const navLi = document.querySelectorAll('nav ul li a');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
	let current = '';
	sections.forEach((section) => {
		let sectionTop = section.offsetTop;
		if (scrollY >= sectionTop) {
			current = section.getAttribute('id');
		}
	});
	navLi.forEach((li) => {
		li.classList.remove('active');
		document.querySelector('nav ul li a[href*= ' + current + ']').classList.add('active');
	});
});

// Mengambil nilai parameter "to" dari URL
const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get('to');

// Mengganti teks pada elemen dengan ID "guestNames" dengan nama yang diambil dari URL
if (name) {
	document.getElementById('guestNames').textContent = name;
}

// Menangkap elemen tombol dan audio
const openButton = document.getElementById('open');
const audioPlayer = document.querySelector('.audio-player audio');

// Menambahkan event listener untuk klik tombol
openButton.addEventListener('click', function () {
	// Memulai pemutaran audio
	audioPlayer.play();

	// Mengubah posisi audio player untuk memperlihatkan ke pengguna
	const audioPlayerDiv = document.querySelector('.audio-player');
	audioPlayerDiv.style.right = '20px'; // Anda dapat menyesuaikan posisi sesuai kebutuhan
});

// // Mencegah Klik Kanan
// document.addEventListener('contextmenu', function (event) {
// 	event.preventDefault();
// });

// // Mendefinisikan fungsi untuk menangani event keyboard
// function handleKeyDown(event) {
// 	// Mencegah tindakan default yang dilakukan oleh tombol keyboard
// 	event.preventDefault();
// }

// // Menambahkan event listener ke document untuk menangani event keydown
// document.addEventListener('keydown', handleKeyDown);

// API URL
const apiUrl = 'https://sheetdb.io/api/v1/7d4j3lkzz7bef';

// Initialize nextId (start with a default value or fetch it from comments)
window.nextId = 1;

// Function to add a comment
function addComment() {
	const name = document.getElementById('name').value.trim();
	const comment = document.getElementById('comment').value.trim();
	const errorMessage = document.getElementById('error-message');

	if (name && comment) {
		// Check if the exact combination of name and comment already exists
		fetch(apiUrl)
			.then((response) => response.json())
			.then((data) => {
				const exists = data.some((item) => item.name === name && item.comment === comment);
				if (exists) {
					errorMessage.textContent = 'You have already commented with this name and this comment.';
				} else {
					// Generate a new ID
					const newId = 'CM' + window.nextId;
					window.nextId++; // Increment the ID for next comment

					// Post new comment with generated ID
					fetch(apiUrl, {
						method: 'POST',
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							data: [
								{
									id: newId,
									name: name,
									comment: comment,
								},
							],
						}),
					})
						.then((response) => response.json())
						.then(() => {
							document.getElementById('name').value = '';
							document.getElementById('comment').value = '';
							errorMessage.textContent = '';
							fetchComments(); // Refresh the comment list
						})
						.catch((error) => console.error('Error adding comment:', error));
				}
			});
	} else {
		errorMessage.textContent = 'Please fill out both fields.';
	}
}

// Function to fetch and display comments
function fetchComments() {
	fetch(apiUrl)
		.then((response) => response.json())
		.then((data) => {
			const commentList = document.getElementById('comment-list');
			commentList.innerHTML = ''; // Clear existing comments

			if (data.length > 0) {
				// Update nextId based on the highest ID
				const highestId = Math.max(...data.map((item) => parseInt(item.id.replace('CM', ''))));
				window.nextId = highestId + 1;
			}

			// Sort comments by ID in descending order
			data.sort((a, b) => parseInt(b.id.replace('CM', '')) - parseInt(a.id.replace('CM', '')));

			data.forEach((item) => {
				const commentItem = document.createElement('div');
				commentItem.className = 'comment-item';

				const commentName = document.createElement('div');
				commentName.className = 'comment-name';
				commentName.textContent = item.name;

				const commentText = document.createElement('div');
				commentText.className = 'comment-text';
				commentText.textContent = item.comment;

				commentItem.appendChild(commentName);
				commentItem.appendChild(commentText);

				commentList.appendChild(commentItem);
			});
		})
		.catch((error) => console.error('Error fetching comments:', error));
}

// Initial fetch to display comments
fetchComments();
