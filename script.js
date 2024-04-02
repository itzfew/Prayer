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

    // Function to fetch prayer times using user's location
    function fetchPrayerTimes(latitude, longitude) {
        const url = `http://api.aladhan.com/v1/timingsByCoordinates/${Date.now()}?latitude=${latitude}&longitude=${longitude}&method=2`;
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data && data.data && data.data.timings) {
                    return data.data;
                } else {
                    throw new Error('Invalid response format');
                }
            })
            .catch(error => {
                console.error('Error fetching prayer times:', error);
                throw error;
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
            return fetchPrayerTimes(latitude, longitude)
                .then(prayerTimes => displayPrayerTimesAndLocation(prayerTimes.timings, location));
        })
        .catch(error => console.error('Error getting prayer times:', error));
});
