# scroll-mapbox-gl-js-poc
Scroll-driven Mapbox GL JS Proof of Concept

## Steps to Reproduce Project

### Create Python virtual environment, add libraries, add to .gitgnore.

python3 -m venv venv<br />
source venv/bin/activate<br />
pip install geopandas censusdata pandas<br />
pip freeze > requirements.txt

### Add the 2024 shapefile for Colorado places./

Source: https://www2.census.gov/geo/tiger/TIGER2024/PLACE/<br />
Note: The the tl_2024_08_place.zip is specific to Colorado as the Colorado state code is 08.

### Add the Python script and run it to convert the Colorado places shapefile to GeoJSON.
The script is located at /scripts/make_colorado_geojson.py

The GeoJSON can be generated as a simplfied version for better performance. This file name is called colorado-cities-enriched-simplified-app.geojson. I am using the non-simplified/detailed version that is generated call colorado-cities-enriched-detailed-app.geojson.<br /><br />

Note: This file was created with assistance of generative AI and lightly modfied to fit the specfic requirements of this project and file structure.