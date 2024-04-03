// Fetch prayer times using the PrayTimes.js library
function fetchPrayerTimes() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var coordinates = [position.coords.latitude, position.coords.longitude];
            var date = new Date();
            var prayerTimes = prayTimes.getTimes(date, coordinates, 'auto', 'auto', '24h');

            // Get the location name using reverse geocoding (optional)
            fetchLocationName(coordinates[0], coordinates[1]);

            // Display prayer times in HTML
            displayPrayerTimes(prayerTimes);
        }, function(error) {
            console.error('Error getting user location:', error);
            fetchDefaultPrayerTimes();
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
        fetchDefaultPrayerTimes();
    }
}

// Fetch prayer times for default location (Shopian, Jammu and Kashmir, India)
function fetchDefaultPrayerTimes() {
    var defaultCoordinates = [33.7151, 74.8464]; // Shopian, Jammu and Kashmir, India
    var date = new Date();
    var prayerTimes = prayTimes.getTimes(date, defaultCoordinates, 'auto', 'auto', '24h');

    // Display prayer times in HTML
    displayPrayerTimes(prayerTimes);
}

// Function to display prayer times in HTML
function displayPrayerTimes(prayerTimes) {
    var locationDiv = document.getElementById('location');
    locationDiv.innerHTML = 'Location: Shopian, Jammu and Kashmir, India';

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
}

// Call fetchPrayerTimes function to initiate fetching of prayer times
fetchPrayerTimes();
