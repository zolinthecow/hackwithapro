"use client"
import gems from '@/assets/images/gems.png';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './ClaimReward.module.css';

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

type Coordinates = {
    latitude: number;
    longitude: number;
}

export default function ClaimReward() {
  const [isClose, setIsClose] = useState(false);
  const target: Coordinates = {latitude: 34.03891167656135, longitude: -118.43653231621187};
  const proximityThreshold = 500;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const distance = calculateDistance(position.coords, target);
        setIsClose(distance <= proximityThreshold);
      });
    }
  }, []);

    return isClose
        ? <div className={styles.container}>
            <Image
                src={gems}
                alt="Reward Image"
                width={150}
                height={150}
                className={`${styles.image_close}`}
            />
            <div className={`${styles.title_close}`}>Claim Reward!</div>
            <button className={`${styles.button_close}`}>
                Claim Reward!
            </button>
        </div>
        : <div className={styles.container}>
            <Image
                src={gems}
                alt="Reward Image"
                width={150}
                height={150}
                className={`${styles.image_notClose}`}
            />
            <div className={`${styles.title_notClose}`}>You're not close enough to claim your reward ☹️</div>
            <button className={`${styles.button_notClose}`}>
                Claim Reward!
            </button>
        </div>
}

