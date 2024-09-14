'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState, useContext } from 'react';
import { getCommutePrediction } from '@src/util/mainBoxLogic';
import { StopContext } from '@src/util/StopProvider';

const LiveMap = () => {
  const { selectedStop } = useContext(StopContext);
  const [loc, setLoc] = useState(getCommutePrediction());

  console.log('loc', loc);
  // ----------
  const whiteCircleIcon = new L.DivIcon({
    className: 'custom-icon',
    html: '<div style="background-color: white; border-radius: 50%; width: 20px; height: 20px; border: 2px solid black;"></div>',
    iconSize: [10, 10], // Size of the icon
    iconAnchor: [10, 10] // Anchor point of the icon
  });
  // ---------
  return (
    <div className="flex justify-center m-4">
      <MapContainer
        center={[42.3601, -71.0589]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '400px', width: '50%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[42.3601, -71.0589]} icon={whiteCircleIcon}>
          <Popup>Vehicle</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LiveMap;
