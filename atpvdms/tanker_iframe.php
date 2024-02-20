<!DOCTYPE html>
<html>
<head>
    <title>Pipeline Map</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/leaflet.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/leaflet.css" />
    <style>
        #map {
            height: 100vh; /* Increased height for better visibility */
            width: 100%;
        }

        .header {
            width: 90%;
            height: fit-content;
            background-color: #800E80;
            color: white;
            border-radius: 0.3em;
            padding: 0.5em;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 1em;
            position: absolute;
            top: 40px;
            left: 5%;
            z-index: 12000000000;
        }

        .header span {
            font-size: 0.75em;
            font-weight: 100;
        }


    </style>
</head>
<body>
    <div class="header"><h3>Maps -</h3> <span>Tanker</span></div>
    <div id="map"></div>

    <script>
        var map = L.map('map').setView([10, 0], 5); // Set initial view to closer zoom level

        // Add Thunderforest Landscape tile layer for satellite imagery
        L.tileLayer('https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=41c719f6f946478cb9ef1b267e7a6e09', {
            attribution: 'Map data &copy; <a href="https://www.thunderforest.com/">Thunderforest</a>',
            maxZoom: 17,
            apikey: 'YOUR_API_KEY' // Replace with your Thunderforest API key
        }).addTo(map);

        // Function to load map data
        function loadMapData() {
            $.ajax({
                url: 'map_data.php',
                type: 'GET',
                dataType: 'json',
                success: function(data) {
                    displayMap(data);
                },
                error: function(xhr, status, error) {
                    console.error('Error fetching map data:', error);
                }
            });
        }

        // Function to display map with markers and adjust map view
        function displayMap(data) {
            // Clear previous markers, if any
            map.eachLayer(function (layer) {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });

            // Create an empty LatLngBounds object to extend it with the marker positions
            var bounds = new L.LatLngBounds();

            // Loop through data and add markers to the map
            data.forEach(function(item) {
                var marker = L.marker([item.latitude, item.longitude]).addTo(map);
                marker.bindPopup('Velocity: ' + item.velocity + ' - Flow Rate: ' + item.flowrate + ' - Vibration: ' + item.vibration); // Customize popup content
                
                // Extend the bounds with each marker's position
                bounds.extend(marker.getLatLng());
            });

            // Fit the map to the bounds, automatically adjusting the zoom level
            map.fitBounds(bounds);
        }

        // Load map data initially
        loadMapData();

        // Refresh map data every X seconds
        setInterval(function() {
            loadMapData();
        }, 10000); // Adjust the interval as needed
    </script>
</body>
</html>