"use client"
import prisma from "@/prisma";
import gems from '@/assets/images/gems.png';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './ClaimReward.module.css';

function calculateDistance(c1:any, c2:any) {
    const R = 6371e3; // earth radius in meters
    const φ1 = c1.latitude * Math.PI / 180;
    const φ2 = parseFloat(c2.lat) * Math.PI / 180;
    const Δφ = (c2.lat - parseFloat(c1.latitude)) * Math.PI / 180;
    const Δλ = (c2.lng - parseFloat(c1.longitude)) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
}

function isTimeWithinOneHour(time: string): boolean {
  const [hours, minutes] = time.split(':').map(Number);
  const startTime = new Date();
  startTime.setHours(hours, minutes, 0, 0); // Set to input time
  
  const endTime = new Date(startTime);
  endTime.setHours(startTime.getHours() + 1); // Add one hour

  const currentTime = new Date(); // Current time

  return startTime <= currentTime && currentTime <= endTime;
}

export default function ClaimRewardView({classes}:any) {
  const [isClose, setIsClose] = useState<null|boolean>(null);
  const [notAlloed, setNotAllowed] = useState<boolean>(false);
//   const target: Coordinates = {latitude: 34.03891167656135, longitude: -118.43653231621187};
  const proximityThreshold = 500;

  console.log(classes);

  useEffect(() => {
    const update_IsClose = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let new_isClose = false;
                let current_day = new Date().getDay();
                for(let i = 0; i<classes.length; i++){
                    let valid_time = false;
                    for(let j = 0; j<classes[i].classTimes.length; j++){
                        if(isTimeWithinOneHour(classes[i].classTimes[j].startTime) && classes[i].classTimes[j].dayOfWeek == current_day){
                            valid_time = true;
                            break;
                        }
                    }
                    if(!valid_time) continue;
                    const distance = calculateDistance(position.coords, classes[i].location);
                    if(distance <= proximityThreshold) {
                        new_isClose = true;
                        break;
                    }
                }
                setIsClose(new_isClose);
            });
        }
    }
    update_IsClose();
  }, [classes]);

    return <div className={styles.container}>
        {
        isClose == null
        ? <div className={`${styles.title_close}`}>Loading...</div>
        : isClose
        ? 
            <>
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
            </>
        :
            <>
            <Image
                src={gems}
                alt="Reward Image"
                width={150}
                height={150}
                className={`${styles.image_notClose}`}
            />
            <div className={`${styles.title_notClose}`}>You're not close enough to claim your reward ☹️</div>
            <button className={`${styles.button_notClose}`}>
                Go Back
            </button>
            </>
        }
    </div>
}

