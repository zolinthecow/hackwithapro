"use client"
import React, { useState, useEffect } from "react";
import getCentsAmountByUserId from '../../actions/getCents';
import getGemsAmountByUserId from '../../actions/getGems';
import updateCentsAmountByUserId from '../../actions/updateCents';
import updateGemsAmountByUserId from "@/actions/updateGems";
import {getSession} from "@auth0/nextjs-auth0";
import Link from 'next/link';

function RaffleGame({setInputOne, setInputTwo, setInputThree, setInputFour, setInputFive}: {setInputOne: any; setInputTwo: any; setInputThree: any; setInputFour: any; setInputFive: any;}) {
    const handleInputChangeOne= (event: any) => {
        console.log(event)
        setInputOne(event.target.value)
    }
    const handleInputChangeTwo= (event: any) => {
        console.log(event)
        setInputTwo(event.target.value)
    }
    const handleInputChangeThree= (event: any) => {
        setInputThree(event.target.value)
    }
    const handleInputChangeFour= (event: any) => {
        setInputFour(event.target.value)
    }
    const handleInputChangeFive= (event: any) => {
        setInputFive(event.target.value)
    }

    return <div className="w-full">
        <label className="block text-center uppercase tracking-wide text-gray-700 text-lg font-extrabold mt-4 mb-2">
            Pick Five Numbers
        </label>


        <div className="w-full flex flex-row justify-center">
            <input onChange={(event) => handleInputChangeOne(event)} className="appearance-none block w-20 bg-gray-200 text-gray-700 border border-gray-200 rounded p-5 m-5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="0-9"></input>
            <input onChange={(event) => handleInputChangeTwo(event)} className="appearance-none block w-20 bg-gray-200 text-gray-700 border border-gray-200 rounded p-5 m-5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="0-9"></input>
            <input onChange={(event) => handleInputChangeThree(event)} className="appearance-none block w-20 bg-gray-200 text-gray-700 border border-gray-200 rounded p-5 m-5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="0-9"></input>
            <input onChange={(event) => handleInputChangeFour(event)} className="appearance-none block w-20 bg-gray-200 text-gray-700 border border-gray-200 rounded p-5 m-5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="0-9"></input>
            <input onChange={(event) => handleInputChangeFive(event)} className="appearance-none block w-20 bg-gray-200 text-gray-700 border border-gray-200 rounded p-5 m-5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="0-9"></input>
        </div>
    </div>
}

function LotteryView({randomOne, randomTwo, randomThree, randomFour, randomFive }: {randomOne: number; randomTwo: number, randomThree: number; randomFour: number; randomFive: number; }) {
    return (
        <div>
            <p className="font-bold text-xl mb-2 text-center">Lottery Numbers</p>
            <div className="w-full flex flex-row justify-center">
                <div className="mx-5">{randomOne}</div>
                <div className="mx-5">{randomTwo}</div>
                <div className="mx-5">{randomThree}</div>
                <div className="mx-5">{randomFour}</div>
                <div className="mx-5">{randomFive}</div>
            </div>
        </div>
        
    );
}

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

function RaffleCard({cost, userId}: {cost: number; userId:any; }) {
    const [randomOne, setRandomOne] = useState(0);
    const [randomTwo, setRandomTwo] = useState(0);
    const [randomThree, setRandomThree] = useState(0);
    const [randomFour, setRandomFour] = useState(0);
    const [randomFive, setRandomFive] = useState(0);

    const [inputOne, setInputOne] = useState(10);
    const [inputTwo, setInputTwo] = useState(10);
    const [inputThree, setInputThree] = useState(10);
    const [inputFour, setInputFour] = useState(10);
    const [inputFive, setInputFive] = useState(10);

    const [centsBalance, setCentsBalance] = useState(0);
    const [gemsBalance, setGemsBalance] = useState(0);

    const [outcomeText, setOutcomeText] = useState("");

    useEffect(() => {
        // if(inputOne>=0&&inputOne<=9&&inputTwo>=0&&inputTwo<=9&&inputThree>=0&&inputThree<=9&&inputFour>=0&&inputFour<=9&&inputFive>=0&&inputFive<=9){
        const fetchBalance = async () => {
            try {
                const currentGemsBalance = await getGemsAmountByUserId(userId);
                const currentCentsBalance = await getCentsAmountByUserId(userId);

                setCentsBalance(currentCentsBalance);
                setGemsBalance(currentGemsBalance);
                console.log(currentCentsBalance, currentGemsBalance)
            } catch(error) {
                console.log('effect error');
                console.error('Error in initializing error', error)
            }
        }

        fetchBalance();
        console.log(userId)

    //     let matches = 0;
    //     if (inputOne == randomOne) {
    //         matches++;
    //     }
    //     if (inputTwo == randomTwo) {
    //         matches++;
    //     }
    //     if (inputThree == randomThree) {
    //         matches++;
    //     }
    //     if (inputFour == randomFour) {
    //         matches++;
    //     }
    //     if (inputFive == randomFive) {
    //         matches++;
    //     }
    //     if (randomOne == 0 && randomTwo == 0 && randomThree == 0 && randomFour == 0 && randomFive == 0) {
    //         return
    //     }
    //     if (matches == 5) {
    //         setOutcomeText('You win the JACKPOT!');
    //         updateCentsAmountByUserId(userId, centsBalance + 200);
    //     } else if (matches > 0 && matches < 5) {
    //         setOutcomeText(`You matched ${matches} of the numbers!`);
    //         updateCentsAmountByUserId(userId, centsBalance + (20 * matches));
    //     } else {
    //         setOutcomeText('You lost...');
    //     }
    // }
    // else{
    //     setOutcomeText(' ');
    // }
        
    }, [randomOne, randomTwo, randomThree, randomFour, randomFive, inputOne, inputTwo, inputThree, inputFour, inputFive, userId, centsBalance]);
    

    const onClickBuyRaffle = (cost: number, balance: number) => {
        // if (balance < cost) {
        //     setOutcomeText('You need more gems!');
        //     return;
        // }
        let r1 = getRandomInt(9);
        let r2 = getRandomInt(9);
        let r3 = getRandomInt(9);
        let r4 = getRandomInt(9);
        let r5 = getRandomInt(9);
        setRandomOne(r1);
        setRandomTwo(r2);
        setRandomThree(r3);
        setRandomFour(r4);
        setRandomFive(r5);
        // HARDCODE FOR DEMO 12345
        if (inputOne == 1 && inputTwo == 2 &&
            inputThree == 3 && inputFour == 4
            && inputFive == 5) {
            setRandomOne(1);
            setRandomTwo(2);
            setRandomThree(3);
            setRandomFour(4);
            setRandomFive(5);
            r1 = 1;
            r2 = 2;
            r3 = 3;
            r4 = 4;
            r5 = 5;
        }

        let matches = 0
        if (inputOne == r1) {
            matches++;
        }
        if (inputTwo == r2) {
            matches++;
        }
        if (inputThree == r3) {
            matches++;
        }
        if (inputFour == r4) {
            matches++;
        }
        if (inputFive == r5) {
            matches++;
        }
        console.log(inputOne, inputTwo, inputThree, inputFour, inputFive, randomOne, randomTwo, randomThree, randomFour, randomFive)

        console.log(`this doesn't hit ${userId}`)
        updateGemsAmountByUserId(userId, balance-(cost/10))
        if (matches == 5) {
            setOutcomeText('You win the JACKPOT!');
            updateCentsAmountByUserId(userId, centsBalance+1000)
        } else if (matches > 0 && matches < 5) {
            setOutcomeText(`You matched ${matches} of the numbers!`)
            updateCentsAmountByUserId(userId, centsBalance+(20*matches))
        } else {
            setOutcomeText('You lost...');
        }

    }

    return (
        <div className="w-full rounded-lg overflow-hidden shadow-xl p-5 bg-white">
            <div className="w-full mb-5">
                <h1 className="font-bold text-2xl mb-4 text-center text-gray-800">Instant Lottery</h1>
                <p className="text-gray-700 text-lg text-center mb-4">
                    Ticket Cost: <span className="font-semibold">{cost} Gems</span>
                </p>
                <button onClick={() => onClickBuyRaffle(cost, gemsBalance)}
                        className="block mx-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 border border-blue-700 rounded transition ease-in-out duration-300 transform hover:-translate-y-1">
                    Buy Raffle
                </button>
                <RaffleGame setInputOne={setInputOne} setInputTwo={setInputTwo} setInputThree={setInputThree} setInputFour={setInputFour} setInputFive={setInputFive}/>
            </div>
            <LotteryView randomOne={randomOne} randomTwo={randomTwo} randomThree={randomThree} randomFour={randomFour} randomFive={randomFive}/>
            <div>
                {outcomeText}
            </div>
        </div>
    );
}

export default function RedeemRaffle({userId}: {userId: any}) {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 flex items-center h-14 gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
            <Link className="flex items-center gap-2" href="#">
                <Package2Icon className="h-6 w-6" />
                <span className="">Table 7 :)</span>
            </Link>
            <nav className="flex items-center gap-4 ml-auto">
                <Link
                className="font-medium text-gray-900  dark:text-gray-50"
                href="/"
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
            <main className="flex-1 p-4 md:p-6">
                <div className="flex justify-center items-center mt-10">
                    <div className="max-w-3xl w-full"> {/* Adjust the max-width as needed */}
                        <RaffleCard cost={100} userId={userId} />
                    </div>
                </div>
            </main>
        </div>
    );
}

// @ts-expect-error for now
function Package2Icon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
        <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
        <path d="M12 3v6" />
      </svg>
    );
  }
  
