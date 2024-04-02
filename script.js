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

    // Function to fetch address from coordinates using OpenStreetMap Nominatim API
    function getAddressFromCoordinates(latitude, longitude) {
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data && data.address) {
                    const { road, city, country } = data.address;
                    return `${road}, ${city}, ${country}`;
                } else {
                    throw new Error('Invalid response format');
                }
            })
            .catch(error => {
                console.error('Error fetching address:', error);
                throw error;
            });
    }

    // Function to display prayer times, address, and location
    function displayPrayerTimesAndLocation(prayerTimes, address) {
        const locationElement = document.getElementById('location');
        locationElement.textContent = `Your present address: ${address}`;

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
            return getAddressFromCoordinates(latitude, longitude)
                .then(address => {
                    const date = new Date(); // Current date
                    const prayerTimes = prayTimes.getTimes(date, [latitude, longitude]);
                    displayPrayerTimesAndLocation(prayerTimes, address);
                });
        })
        .catch(error => console.error('Error getting prayer times:', error));
});
