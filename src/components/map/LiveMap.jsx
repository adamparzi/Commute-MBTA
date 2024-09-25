'use client';

import L from 'leaflet';
import { getCommutePrediction } from '@src/util/mainBoxLogic';
import { useEffect, useRef } from 'react';

import 'leaflet/dist/leaflet.css';
//import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
//import 'leaflet-defaulticon-compatibility';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const LiveMap = () => {
  const predictions = getCommutePrediction();

  // const mapRef = useRef(); // create a reference for the map

  // // recenter the map
  // useEffect(() => {
  //   if (mapRef.current) {
  //     const bounds = L.latLngBounds(
  //       predictions.map((prediction) => [
  //         prediction.location.vehicleLatitude,
  //         prediction.location.vehicleLongitude
  //       ])
  //     );

  //     mapRef.current.fitBounds(bounds);
  //   }
  // }, [predictions]); // Run this effect whenever predictions change

  // ----------
  const createVehicleIcon = (bearing) => {
    return L.divIcon({
      className: 'vehicle-icon',
      html: `<img src="/arrow_north.png" style="transform: rotate(${bearing}deg); width: 25px; height: 25px;" />`
      //iconSize: [40, 40], // Size of the SVG
      //iconAnchor: [20, 20] // Center the icon
    });
  };
  // ---------

  return (
    <div className="flex justify-center m-4">
      <MapContainer
        center={[42.3601, -71.0789]}
        zoom={12}
        scrollWheelZoom={true}
        style={{ height: '400px', width: '500px' }}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {predictions.map((prediction, idx) => (
          <Marker
            key={idx}
            interactive={false}
            position={[prediction.location.vehicleLatitude, prediction.location.vehicleLongitude]}
            icon={createVehicleIcon(prediction.bearing ?? 0)}></Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LiveMap;
