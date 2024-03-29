//  COMP90024 GROUP48
//  Yuhang Zhou     ID:1243037
//  Jitao Feng      ID:1265994
//  Hui Liu         ID:1336645
//  Jihang Yu       ID:1341312
//  Xinran Ren      ID:1309373

import React from 'react';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Function to set the default icon for Leaflet markers
const setDefaultIcon = () => {
    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
        iconSize: [25, 41], // size of the icon
        iconAnchor: [12, 41], // point of the icon which will correspond to the marker's location
        shadowSize: [41, 41], // size of the shadow
        shadowAnchor: [13, 41], // the same for the shadow
        popupAnchor: [0, -41], // point from which the popup should open relative to the iconAnchor
    });

    // Set the default icon for all Leaflet markers
    L.Marker.prototype.options.icon = DefaultIcon;
};

// Map component that renders a map using the react-leaflet library
const Map = ({ dataPoints }) => {
    const defaultCenter = [-25.2744, 133.7751]; // Default center coordinates
    setDefaultIcon(); // Set the default icon for markers

    return (
        <MapContainer center={defaultCenter} zoom={4} style={{ height: '600px', width: '100%' }}>
            <TileLayer
                attribution='&amp;copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Render markers for each data point */}
            {dataPoints.map((point, index) => (
                <Marker key={index} position={[point.name[2], point.name[1]]}>
                    <Popup>
                        {point.name[0]}: {point.value}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
