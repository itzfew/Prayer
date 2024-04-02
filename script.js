// Fetch prayer times using the PrayTimes.js library
navigator.geolocation.getCurrentPosition(function(position) {
    var coordinates = [position.coords.latitude, position.coords.longitude];
    var date = new Date();
    var prayerTimes = prayTimes.getTimes(date, coordinates, 'auto', 'auto', '24h');

    // Get the location name using reverse geocoding (optional)
    fetchLocationName(coordinates[0], coordinates[1]);

    // Display prayer times in HTML
    var locationDiv = document.getElementById('location');
    locationDiv.innerHTML = 'Location: Loading...';

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

// Function to fetch location name using reverse geocoding
function fetchLocationName(latitude, longitude) {
    var url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            var locationDiv = document.getElementById('location');
            locationDiv.innerHTML = `Location: ${data.city}, ${data.countryName}`;
        })
        .catch(error => console.error('Error fetching location:', error));
}
