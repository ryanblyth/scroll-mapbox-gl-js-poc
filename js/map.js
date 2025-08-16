// Mapbox GL JS initialization and configuration
mapboxgl.accessToken = 'pk.eyJ1IjoiaW5kZWxpYmUiLCJhIjoiY2xvM2k1Z25jMGZmbjJsbW9iMGV0M293cyJ9.UPel041iNYR3w_gq01-X8g';

// Global map variable for future interactions
let map;

// City data for the four major Colorado cities (panels 2-5)
const majorCities = {
    2: { name: "Denver", coordinates: [-104.9833786, 39.7375448], zoom: 10 },
    3: { name: "Colorado Springs", coordinates: [-104.7607490, 38.8672553], zoom: 10 },
    4: { name: "Fort Collins", coordinates: [-105.0648327, 40.5482164], zoom: 10 },
    5: { name: "Grand Junction", coordinates: [-108.5674520, 39.0890618], zoom: 10 }
};

// Colorado overview coordinates (for intro panel)
const coloradoOverview = {
    center: [-105.0, 39.5],
    zoom: 6
};

// Load DOM and initialize map
document.addEventListener("DOMContentLoaded", (event) => {
    // Initialize the map centered on Colorado overview
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v11',
        center: coloradoOverview.center,
        zoom: coloradoOverview.zoom,
        pitch: 0,
        bearing: 0
    });

    // Wait for map to load
    map.on('load', () => {
        console.log('Map loaded successfully - centered on Colorado overview');
        
        // Add navigation controls
        map.addControl(new mapboxgl.NavigationControl(), 'top-right');
        
        // Load Colorado cities data
        loadColoradoCities();
        
        // Setup map interactions
        setupMapInteractions();
    });
});

// Function to load Colorado cities data
function loadColoradoCities() {
    // Add the Colorado cities as a source
    map.addSource('colorado-cities', {
        type: 'geojson',
        data: 'data/colorado-cities-detailed.geojson'
    });

    // Add a layer for all cities (subtle background boundaries)
    map.addLayer({
        'id': 'colorado-cities-all',
        'type': 'fill',
        'source': 'colorado-cities',
        'paint': {
            'fill-color': 'rgba(255, 255, 255, 0.1)',
            'fill-outline-color': 'rgba(255, 255, 255, 0.3)',
            'fill-opacity': 0.3
        }
    });

    // Add a layer for the four major cities (highlighted when active)
    map.addLayer({
        'id': 'colorado-cities-major',
        'type': 'fill',
        'source': 'colorado-cities',
        'filter': ['in', 'NAME', 'Denver', 'Colorado Springs', 'Fort Collins', 'Grand Junction'],
        'paint': {
            'fill-color': 'rgba(52, 152, 219, 0.3)',
            'fill-outline-color': 'rgba(52, 152, 219, 0.6)',
            'fill-opacity': 0.3
        }
    });

    // Add labels for major cities
    map.addLayer({
        'id': 'colorado-cities-labels',
        'type': 'symbol',
        'source': 'colorado-cities',
        'filter': ['in', 'NAME', 'Denver', 'Colorado Springs', 'Fort Collins', 'Grand Junction'],
        'layout': {
            'text-field': ['get', 'NAME'],
            'text-font': ['Open Sans Bold'],
            'text-size': 14,
            'text-offset': [0, 0],
            'text-anchor': 'center'
        },
        'paint': {
            'text-color': '#ffffff',
            'text-halo-color': '#000000',
            'text-halo-width': 1
        }
    });
}

// Function to setup map interactions based on panel scroll
function setupMapInteractions() {
    // Function to update map based on active panel
    window.updateMapForPanel = function(panelNumber) {
        if (!map) return;
        
        // Handle intro panel (Colorado overview)
        if (panelNumber === 1) {
            map.flyTo({
                center: coloradoOverview.center,
                zoom: coloradoOverview.zoom,
                duration: 3000
            });
            
            // Show all major cities
            map.setFilter('colorado-cities-major', ['in', 'NAME', 'Denver', 'Colorado Springs', 'Fort Collins', 'Grand Junction']);
            return;
        }
        
        // Handle city panels (2-5)
        const cityData = majorCities[panelNumber];
        if (!cityData) return;
        
        // Fly to the city
        map.flyTo({
            center: cityData.coordinates,
            zoom: cityData.zoom,
            duration: 3000
        });
        
        // Highlight the active city
        highlightCity(cityData.name);
    };
}

// Function to highlight a specific city
function highlightCity(cityName) {
    // Update the major cities layer to highlight only the active city
    map.setFilter('colorado-cities-major', ['==', 'NAME', cityName]);
    
    // Make the active city more prominent
    map.setPaintProperty('colorado-cities-major', 'fill-color', 'rgba(52, 152, 219, 0.8)');
    map.setPaintProperty('colorado-cities-major', 'fill-outline-color', '#ffffff');
    map.setPaintProperty('colorado-cities-major', 'fill-opacity', 0.7);
    
    // Reset after a delay
    setTimeout(() => {
        map.setFilter('colorado-cities-major', ['in', 'NAME', 'Denver', 'Colorado Springs', 'Fort Collins', 'Grand Junction']);
        map.setPaintProperty('colorado-cities-major', 'fill-color', 'rgba(52, 152, 219, 0.3)');
        map.setPaintProperty('colorado-cities-major', 'fill-outline-color', 'rgba(52, 152, 219, 0.6)');
        map.setPaintProperty('colorado-cities-major', 'fill-opacity', 0.3);
    }, 4000);
}

// Handle window resize
window.addEventListener('resize', () => {
    if (map) map.resize();
});
