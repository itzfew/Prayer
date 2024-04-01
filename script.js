// Fetch prayer times using the PrayTimes.js library
navigator.geolocation.getCurrentPosition(function(position) {
    var coordinates = [position.coords.latitude, position.coords.longitude];
    var prayerTimesDiv = document.getElementById('prayerTimes');
    var locationDiv = document.getElementById('location');

    // Update date and address periodically
    updateDate();
    fetchAddress(coordinates);

    // Get and display prayer times
    updatePrayerTimes();

    // Function to update date periodically
    function updateDate() {
        setInterval(function() {
            var currentDate = new Date();
            var hijriDate = getHijriDate(currentDate);
            var gregorianDate = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            document.querySelector('.hijri').innerText = 'Hijri Date: ' + hijriDate;
            document.querySelector('.gregorian').innerText = 'Gregorian Date: ' + gregorianDate;
        }, 60000); // Update every minute
    }

    // Function to update prayer times
    function updatePrayerTimes() {
        var date = new Date();
        var prayerTimes = prayTimes.getTimes(date, coordinates, 'auto', 'auto', '24h');

        // Display prayer times in HTML
        var prayerTimesHTML = '';
        for (var prayer in prayerTimes) {
            if (prayerTimes.hasOwnProperty(prayer)) {
                prayerTimesHTML += `
                    <div class="row">
                        <div class="column">
                            <p class="prayer-name">${prayer}</p>
                            <p class="prayer-time">${prayerTimes[prayer]}</p>
                        </div>
                    </div>
                `;
            }
        }
        prayerTimesDiv.innerHTML = prayerTimesHTML;
    }

    // Function to fetch present address using reverse geocoding
    function fetchAddress(coordinates) {
        var url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coordinates[0]}&longitude=${coordinates[1]}&localityLanguage=en`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                locationDiv.innerHTML = `Location: ${data.city}, ${data.localityInfo.administrative[1].name}, ${data.countryName}`;
            })
            .catch(error => console.error('Error fetching location:', error));
    }
});

// Function to get Hijri date
function getHijriDate(date) {
    var hijriDate = new Intl.DateTimeFormat('ar-u-ca-islamic', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(date);
    return hijriDate;
}
