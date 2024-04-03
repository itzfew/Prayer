// Fetch prayer times using the PrayTimes.js library
function fetchPrayerTimes() {
    navigator.geolocation.getCurrentPosition(function(position) {
        var coordinates = [position.coords.latitude, position.coords.longitude];
        var date = new Date();
        var prayerTimes = prayTimes.getTimes(date, coordinates, 'auto', 'auto', '12h');
        
        // Get the location name using reverse geocoding
        fetchLocationName(coordinates[0], coordinates[1]);
        
        // Display prayer times in HTML
        displayPrayerTimes(prayerTimes);
    }, function(error) {
        console.error('Error getting user location:', error);
        // If user location is not available, show default location prayer times
        var defaultCoordinates = [33.7143, 74.8467]; // Coordinates for Shopian, Jammu and Kashmir
        var defaultDate = new Date();
        var defaultPrayerTimes = prayTimes.getTimes(defaultDate, defaultCoordinates, 'auto', 'auto', '12h');
        displayPrayerTimes(defaultPrayerTimes);
        fetchLocationName(defaultCoordinates[0], defaultCoordinates[1]);
    });
}

// Function to display prayer times in HTML
function displayPrayerTimes(prayerTimes) {
    var prayerTimesDiv = document.getElementById('prayerTimes');
    prayerTimesDiv.innerHTML = `
        <p><span class="prayer-name">Imsak:</span> <span class="prayer-time">${prayerTimes.imsak}</span></p>
        <p><span class="prayer-name">Fajr:</span> <span class="prayer-time">${prayerTimes.fajr}</span></p>
        <p><span class="prayer-name">Sunrise:</span> <span class="prayer-time">${prayerTimes.sunrise}</span></p>
        <p><span class="prayer-name">Dhuhr:</span> <span class="prayer-time">${prayerTimes.dhuhr}</span></p>
        <p><span class="prayer-name">Asr:</span> <span class="prayer-time">${prayerTimes.asr}</span></p>
        <p><span class="prayer-name">Sunset:</span> <span class="prayer-time">${prayerTimes.sunset}</span></p>
        <p><span class="prayer-name">Maghrib:</span> <span class="prayer-time">${prayerTimes.maghrib}</span></p>
        <p><span class="prayer-name">Isha:</span> <span class="prayer-time">${prayerTimes.isha}</span></p>
        <p><span class="prayer-name">Midnight:</span> <span class="prayer-time">${prayerTimes.midnight}</span></p>
    `;
}


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

// Call the function to fetch prayer times when the page loads
fetchPrayerTimes();
