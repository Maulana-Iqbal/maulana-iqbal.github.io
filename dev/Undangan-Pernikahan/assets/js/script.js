// $(window).scroll(function () {
//   var $heightScrolled = $(window).scrollTop();
//   var $defaultHeight = screen.height;

//   if ($heightScrolled < $defaultHeight) {
//       $('.navbar').removeClass("bg-pink-100")
//       $('.navbar-ul').removeClass("text-black/70")
//       $('.navbar-ul').addClass("text-white")
//   }
//   else {
//       $('.navbar').addClass("bg-pink-100"),
//       $('.navbar-ul').removeClass("text-white"),
//       $('.navbar-ul').addClass("text-black/70")
//   }

// });

  //cover
$('#btn-open').click(function() {
  $('#cover').css({
    'visibility': 'hidden'
  });
  $('#body').removeClass('overflow-hidden');
  $('#nav').removeClass('hidden');
  $('#nav').addClass('flex');
  $('#banner').removeClass('opacity-20');
  $('#banner').removeClass('blur-sm');
  $('#music').removeClass('hidden');
  // document.getElementById("audio").autoplay = true;
  document.getElementById("audio").play();
  document.getElementById("playPauseBtn").setAttribute('data-play', 'true');
})

  //countdown
const countdown = new Date("September 13, 2023 17:00:00").getTime();

const x = setInterval(function() {
  const now = new Date().getTime();

  const distance = countdown - now;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("day").innerHTML = days;
  document.getElementById("hour").innerHTML = hours;
  document.getElementById("minute").innerHTML = minutes;
  document.getElementById("seccond").innerHTML = seconds;

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("day").innerHTML = "00"
  }
},1000);

  //swiper
const swiper = new Swiper('.swiper', {
  spaceBetween: 30,
        centeredSlide: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        
  // Optional parameters
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});


  //query url
console.log("Window Location: ", window.location);

const myKeyValue = window.location.search;
const urlParams = new URLSearchParams(myKeyValue);
const param = urlParams.get('to');

document.getElementById("inviteName").innerHTML = param;

window.addEventListener("scroll", onscroll);

  //when scroll effect
function onscroll() {
  let elements = document.querySelectorAll(".swipe");
  for (let i = 0; i < elements.length; i++) {
    let heights = window.innerHeight;
    let distances = elements[i].getBoundingClientRect().top;
    let scrollSize = -30;
    
    if (distances < heights - scrollSize) {
      elements[i].classList.remove("translate-y-40")
    } else {
      elements[i].classList.add("translate-y-40")
    }
  }
}

window.addEventListener("scroll", popup);

  //when scroll effect
function popup() {
  let elements = document.querySelectorAll(".popup");
  for (let i = 0; i < elements.length; i++) {
    let heights = window.innerHeight;
    let distances = elements[i].getBoundingClientRect().top;
    let scrollSize = 50;
    
    if (distances < heights - scrollSize) {
      elements[i].classList.remove("scale-50")
    } else {
      elements[i].classList.add("scale-50")
    }
  }
};

  //play music
const myAudio = document.getElementById("audio");
const btn = document.getElementById("playPauseBtn");
const btnPlay = document.getElementById("buttonPlay");
const btnMuted = document.getElementById("buttonMuted");

const playPause = () => {
  const dataPlay = btn.getAttribute('data-play');
  if (dataPlay === 'false')  {
    btn.setAttribute('data-play', 'true');
    myAudio.play();
    btnMuted.classList.add("hidden");
    btnPlay.classList.remove("hidden");
  } else {
    btn.setAttribute('data-play', 'false');
    myAudio.pause();
    btnMuted.classList.remove("hidden");
    btnPlay.classList.add("hidden");
  }
}

  //nav
function homeNav() {
  $(window).scrollTop($('#body').position().top);
}

function coupleNav() {
  $(window).scrollTop($('#couple-profile').position().top);
}

function receptionNav() {
  $(window).scrollTop($('#reception').position().top);
}

function galleryNav() {
  $(window).scrollTop($('#gallery').position().top);
}

function giftNav() {
  $(window).scrollTop($('#gift').position().top);
}