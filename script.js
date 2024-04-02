document.addEventListener("DOMContentLoaded", function() {
    // Function to get user's current location
    function getUserLocation() {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        resolve(position.coords);
                    },
                    error => {
                        reject(error);
                    }
                );
            } else {
                reject("Geolocation is not supported by this browser.");
            }
        });
    }

    // Function to display prayer times and location
    function displayPrayerTimesAndLocation(prayerTimes, location) {
        const locationElement = document.getElementById('location');
        locationElement.textContent = `Your location: ${location}`;

        const prayerList = document.getElementById('prayer-list');
        prayerList.innerHTML = ''; // Clear previous list items

        for (const [prayer, time] of Object.entries(prayerTimes)) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${prayer}:</strong> ${time}`;
            prayerList.appendChild(listItem);
        }
    }

    // Get user's location and fetch prayer times
    getUserLocation()
        .then(coords => {
            const latitude = coords.latitude;
            const longitude = coords.longitude;
            const location = `Latitude: ${latitude}, Longitude: ${longitude}`;
            const date = new Date(); // Current date
            const prayerTimes = prayTimes.getTimes(date, [latitude, longitude]);
            displayPrayerTimesAndLocation(prayerTimes, location);
        })
        .catch(error => console.error('Error getting prayer times:', error));
});
