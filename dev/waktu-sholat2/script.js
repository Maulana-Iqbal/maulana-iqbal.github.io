if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const url = `https://api.aladhan.com/v1/timings/${Date.now()/1000}?latitude=${latitude}&longitude=${longitude}&method=8`;
  
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const timings = data.data.timings;
          document.getElementById('fajr').textContent = timings.Fajr;
          document.getElementById('dhuhr').textContent = timings.Dhuhr;
          document.getElementById('asr').textContent = timings.Asr;
          document.getElementById('maghrib').textContent = timings.Maghrib;
          document.getElementById('isha').textContent = timings.Isha;
        });
    });
  } else {
    console.log('Geolocation tidak tersedia');
  }
  