const locationEl = document.getElementById('location');
const imsakEl = document.getElementById('imsak');
const fajrEl = document.getElementById('fajr');
const dhuhrEl = document.getElementById('dhuhr');
const asrEl = document.getElementById('asr');
const maghribEl = document.getElementById('maghrib');
const ishaEl = document.getElementById('isha');

// set default location
let latitude = -6.21462;
let longitude = 106.84513;

// get user's location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    getLocationName(latitude, longitude);
    getPrayerTimes(latitude, longitude);
  }, function (error) {
    console.log(error);
    getLocationName(latitude, longitude);
    getPrayerTimes(latitude, longitude);
  });
}

function getLocationName(latitude, longitude) {
  fetch(`https://us1.locationiq.com/v1/reverse.php?key=<YOUR_LOCATIONIQ_API_KEY>&lat=${latitude}&lon=${longitude}&format=json`)
    .then(response => response.json())
    .then(data => {
      locationEl.innerHTML = `${data.address.city}, ${data.address.country}`;
    })
    .catch(error => console.log(error));
}

function getPrayerTimes(latitude, longitude) {
  fetch(`https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`)
    .then(response => response.json())
    .then(data => {
      const timings = data.data.timings;
      imsakEl.innerHTML = timings.Imsak;
      fajrEl.innerHTML = timings.Fajr;
      dhuhrEl.innerHTML = timings.Dhuhr;
      asrEl.innerHTML = timings.Asr;
      maghribEl.innerHTML = timings.Maghrib;
      ishaEl.innerHTML = timings.Isha;
    })
    .catch(error => console.log(error));
}
