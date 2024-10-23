'use client';

import L from 'leaflet';
import { getCommutePrediction } from '@src/util/mainBoxLogic';

import 'leaflet/dist/leaflet.css';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const LiveMap = () => {
  const predictions = getCommutePrediction();
  console.log('predictions', predictions);

  const vehicleIcon = (bearing) => {
    return L.divIcon({
      className: 'vehicle-icon',
      html: `<img src="/arrow_north.png" style="transform: rotate(${bearing}deg); width: 25px; height: 25px;" />`
      //iconSize: [40, 40], // Size of the SVG
      //iconAnchor: [20, 20] // Center the icon
    });
  };

  const stopIcon = L.icon({
    iconUrl: '/location_pin2.svg',
    iconSize: [30, 30] // adjust the size to your preference
    //popupAnchor: [0, -15], // adjust to properly position the popup relative to the icon
  });

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
            icon={vehicleIcon(prediction.bearing)}></Marker>
        ))}
        <Marker
          //interactive={false}
          position={[
            predictions[0]?.stopLocation?.latitude ?? 0,
            predictions[0]?.stopLocation?.longitude ?? 0
          ]}
          icon={stopIcon}></Marker>
      </MapContainer>
    </div>
  );
};

export default LiveMap;
