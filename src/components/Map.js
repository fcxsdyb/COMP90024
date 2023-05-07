import React from 'react';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const setDefaultIcon = () => {
    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
        iconSize: [25, 41], // size of the icon
        iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
        shadowSize: [41, 41], // size of the shadow
        shadowAnchor: [13, 41], // the same for the shadow
        popupAnchor: [0, -41], // point from which the popup should open relative to the iconAnchor
    });

    L.Marker.prototype.options.icon = DefaultIcon;
};

const Map = ({ dataPoints }) => {
    const defaultCenter = [-25.2744, 133.7751];
    setDefaultIcon();

    return (
        <MapContainer center={defaultCenter} zoom={4} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                attribution='&amp;copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {dataPoints.map((point, index) => (
                <Marker key={index} position={[point.lat, point.lng]}>
                    <Popup>
                        {point.position}: {point.count}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
