"use client"
import { useState, useEffect } from 'react';

type Coordinates = {
    latitude: number;
    longitude: number;
}

export default function claimReward() {
  const [isClose, setIsClose] = useState(false);
  const target:Coordinates = {latitude:34.03891167656135, longitude:-118.43653231621187};
  const proximityThreshold = 500; // distance in meters

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const distance = calculateDistance(
          position.coords as Coordinates,
          target
        );
        if (distance <= proximityThreshold) {
          setIsClose(true);
        }
      });
    }
  }, []);

  // Haversine formula to calculate distance between two coordinates in meters
  function calculateDistance(c1:Coordinates, c2:Coordinates) {
    const R = 6371e3; // earth radius in meters
    const φ1 = c1.latitude * Math.PI / 180;
    const φ2 = c2.latitude * Math.PI / 180;
    const Δφ = (c2.latitude - c1.latitude) * Math.PI / 180;
    const Δλ = (c2.longitude - c1.longitude) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  }

  return (
    <div>
      <button style={{ backgroundColor: isClose ? 'blue' : 'grey' }}>
        {isClose ? 'You are close!' : 'You are not close'}
      </button>
    </div>
  );
}
