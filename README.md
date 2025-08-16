# Scroll-Driven Mapbox GL JS POC

A proof-of-concept project demonstrating scroll-driven map interactions using GSAP ScrollTrigger and Mapbox GL JS.

## Features

- **Responsive Layout**: Two-column desktop layout with panels on the left and map on the right
- **Mobile-First Design**: Automatically switches to two-row layout on mobile devices
- **Scroll-Driven Interactions**: Panels trigger map updates as you scroll through content
- **GSAP ScrollTrigger**: Smooth animations and scroll-based triggers
- **Mapbox Integration**: Interactive map with panel-based view changes

## Project Structure

```
scroll-mapbox-gl-js-poc/
├── index.html          # Main HTML with responsive layout
├── css/
│   └── style.css      # Responsive CSS with desktop/mobile layouts
├── js/
│   ├── map.js         # Mapbox GL JS initialization and interactions
│   └── scroll-trigger.js # GSAP ScrollTrigger functionality
├── data/               # Data directory for future map layers
└── README.md           # This file
```

## Layout

### Desktop (≥769px)
- **Left Column**: Scrollable panels with content
- **Right Column**: Full-height interactive map

### Mobile (≤768px)
- **Top Row**: Scrollable panels (50% viewport height)
- **Bottom Row**: Interactive map (50% viewport height)

## Panels

The project includes 4 content panels:

1. **Welcome to the Map** - Introduction and overview
2. **Explore the Data** - Data exploration features
3. **Interactive Features** - Interactive map capabilities
4. **Get Started** - Getting started guide

Each panel triggers different map behaviors when scrolled into view.

## Map Interactions

- **Panel 1**: Overview view of Colorado
- **Panel 2**: Zoom to Denver area
- **Panel 3**: Zoom to different region
- **Panel 4**: Return to overview with tutorial overlay

## Technologies Used

- **HTML5**: Semantic markup and responsive structure
- **CSS3**: Flexbox layouts, media queries, and animations
- **JavaScript**: ES6+ features and modern DOM APIs
- **GSAP**: GreenSock Animation Platform for smooth animations
- **ScrollTrigger**: GSAP plugin for scroll-based triggers
- **Mapbox GL JS**: Interactive vector maps

## Getting Started

1. Clone the repository
2. Open `index.html` in a web browser
3. Scroll through the panels to see map interactions
4. Resize the browser to test responsive behavior

## Future Enhancements

- Add more sophisticated map layers and data
- Implement panel-based data filtering
- Add smooth transitions between map states
- Include more interactive map elements
- Add data visualization overlays

## Browser Support

- Modern browsers with ES6+ support
- Mobile browsers with touch support
- Requires JavaScript enabled

## Dependencies

- GSAP 3.13.0+
- ScrollTrigger plugin
- Mapbox GL JS 2.15.0+
- Mapbox access token (configured in map.js)