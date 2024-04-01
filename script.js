// Fetch prayer times using the PrayTimes.js library
navigator.geolocation.getCurrentPosition(function(position) {
    var coordinates = [position.coords.latitude, position.coords.longitude];
    var date = new Date();
    var prayerTimes = prayTimes.getTimes(date, coordinates, 'auto', 'auto', '24h');

    // Display prayer times in HTML
    var prayerTimesDiv = document.getElementById('prayerTimes');
    prayerTimesDiv.innerHTML = `
        <p>Imsak: ${prayerTimes.imsak}</p>
        <p>Fajr: ${prayerTimes.fajr}</p>
        <p>Sunrise: ${prayerTimes.sunrise}</p>
        <p>Dhuhr: ${prayerTimes.dhuhr}</p>
        <p>Asr: ${prayerTimes.asr}</p>
        <p>Sunset: ${prayerTimes.sunset}</p>
        <p>Maghrib: ${prayerTimes.maghrib}</p>
        <p>Isha: ${prayerTimes.isha}</p>
        <p>Midnight: ${prayerTimes.midnight}</p>
    `;
}, function(error) {
    console.error('Error getting user location:', error);
});
