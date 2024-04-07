"use client"
import { useRouter } from 'next/router';
import prisma from "@/prisma";
import gems from '@/assets/images/gems.png';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './ClaimReward.module.css';
import Link from "next/link";
import updateClaimTime from '@/actions/updateClaimTime';
import updateGemsAmountByUserId from '@/actions/updateGems';
import getGemsAmountByUserId from '@/actions/getGems';
import { Package2Icon } from 'lucide-react';

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

export default function ClaimRewardView({classes,userId}:any) {
  const [isClose, setIsClose] = useState<null|boolean>(null);
  const [alreadClaimed, setAlreadyClaimed] = useState<boolean>(false);
  const [notAllowed, setNotAllowed] = useState<boolean>(false);
//   const target: Coordinates = {latitude: 34.03891167656135, longitude: -118.43653231621187};
  const proximityThreshold = 500;

  useEffect(() => {
    const update_IsClose = async () => {
        console.log('1')
        if (navigator.geolocation) {
        console.log('2')
            navigator.geolocation.getCurrentPosition((position) => {
        console.log('3')
                let new_isClose = false;
                let current_day = new Date().getDay();
                for(let i = 0; i<classes.length; i++){
                    let valid_time = false;
                    for(let j = 0; j<classes[i].classTimes.length; j++){
                        if(
                            isTimeWithinOneHour(classes[i].classTimes[j].startTime) && 
                            classes[i].classTimes[j].dayOfWeek == current_day 
                        ){
                            if (classes[i].classTimes[j].lastClaimedTimeStamp < Date.now() - 24*60*60*1000) {
                                valid_time = true;
                                break;
                            } else {
                                setAlreadyClaimed(true);
                            }
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
            },() => setNotAllowed(true));
        }
    }
    update_IsClose();
  }, [classes]);

  const claimReward = async () => {
    let current_day = new Date().getDay();
    let classes_per_month = 0;
    for(let i = 0; i<classes.length; i++){
        for(let j = 0; j<classes[i].classTimes.length; j++){
            classes_per_month += 4;
        }
    }
    for(let i = 0; i<classes.length; i++){
        let valid_time = false;
        for(let j = 0; j<classes[i].classTimes.length; j++){
            if(
                isTimeWithinOneHour(classes[i].classTimes[j].startTime) && 
                classes[i].classTimes[j].dayOfWeek == current_day && 
                classes[i].classTimes[j].lastClaimedTimeStamp < Date.now() - 24*60*60*1000
            ){
                console.log('found valid time')
                valid_time = true;
                classes[i].classTimes[j].lastClaimedTimeStamp = Date.now()
                await updateClaimTime(classes[i].classTimes[j].id);
                let update_amount = Math.floor(250/classes_per_month);
                await updateGemsAmountByUserId(
                    userId,
                    await getGemsAmountByUserId(userId)+update_amount
                );
                console.log('reloading!')
                window.location.reload();
                break;
            }
        }
        if(valid_time) break;
    }
  }


    return <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 flex items-center h-14 gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
        <Link className="flex items-center gap-2" href="#">
          <Package2Icon className="h-6 w-6" />
          <span className="">Table 7 :)</span>
        </Link>
        <nav className="flex items-center gap-4 ml-auto">
          <Link
            className="font-medium text-gray-900  dark:text-gray-50"
            href="#"
          >
            <div className="tab-button">
            Classes
            </div>
          </Link>
          <Link
            className="font-medium text-gray-900  dark:text-gray-50"
            href="/claimReward"
          >
            <div className="tab-button">
            Claim Reward
            </div>
          </Link>
          <Link
            className="font-medium text-gray-900  dark:text-gray-50"
            href="/RedeemRaffle"
          >
            <div className="tab-button">
            Buy Raffle
            </div>
          </Link>
        </nav>
      </header>
    <div className={styles.container}>
        {
        isClose == null
        ? <div className={`${styles.title_close}`}>{notAllowed? "Must allow location tracking" :"Loading..."}</div>
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
            <button className={`${styles.button_close}`} onClick={claimReward}>
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
            <div className={`${styles.title_notClose}`}>
                {
                    alreadClaimed
                    ? "You already claimed your reward today! 😊"
                    : "You're not close enough to claim your reward ☹️"
                }
            </div>
            <Link className={`${styles.button_notClose}`} href="/">
                Go Back
            </Link>
            </>
        }
    </div>
    </div>
}

