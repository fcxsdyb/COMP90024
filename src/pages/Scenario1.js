import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const DataAnalysis = () => {
  const data = [
    { name: 'A', value: 400 },
    { name: 'B', value: 300 },
    { name: 'C', value: 200 },
    { name: 'D', value: 100 },
  ];

  const position = [51.505, -0.09];

  return (
    <div className="data-analysis" style={{ margin: '30px', textAlign: 'center' }}>
      <h1>Data Analysis</h1>

      <div className="bar-chart">
        <h2>Bar Chart</h2>
        <BarChart width={600} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </div>

      <div className="map">
        <h2>Map</h2>
        <MapContainer center={position} zoom={13} style={{ height: '600px', width: '80%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A sample popup.<br />Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default DataAnalysis;
