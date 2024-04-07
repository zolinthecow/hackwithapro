"use client"
import React, { useState, useEffect } from "react";
import getCentsAmountByUserId from '../../actions/getCents';
import getGemsAmountByUserId from '../../actions/getGems';
import {getSession} from "@auth0/nextjs-auth0";

function RaffleGame({setInputOne, setInputTwo, setInputThree, setInputFour, setInputFive}: {setInputOne: any; setInputTwo: any; setInputThree: any; setInputFour: any; setInputFive: any;}) {
    const handleInputChangeOne= (event: any) => {
        setInputOne(event.target.value)
    }
    const handleInputChangeTwo= (event: any) => {
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
        <label className="block text-center uppercase tracking-wide text-gray-700 text-lg font-extrabold mt-4 mb-2" for="grid-zip">
            Pick Five Numbers
        </label>


        <div className="w-full flex flex-row justify-center">
            <input onChange={(event) => handleInputChangeOne(event)} className="appearance-none block w-20 bg-gray-200 text-gray-700 border border-gray-200 rounded p-5 m-5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="0-9"></input>
            <input onChange={(event) => handleInputChangeOne(event)} className="appearance-none block w-20 bg-gray-200 text-gray-700 border border-gray-200 rounded p-5 m-5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="0-9"></input>
            <input onChange={(event) => handleInputChangeOne(event)} className="appearance-none block w-20 bg-gray-200 text-gray-700 border border-gray-200 rounded p-5 m-5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="0-9"></input>
            <input onChange={(event) => handleInputChangeOne(event)} className="appearance-none block w-20 bg-gray-200 text-gray-700 border border-gray-200 rounded p-5 m-5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="0-9"></input>
            <input onChange={(event) => handleInputChangeOne(event)} className="appearance-none block w-20 bg-gray-200 text-gray-700 border border-gray-200 rounded p-5 m-5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="0-9"></input>
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

function RaffleCard({cost}: {cost: number }) {
    const [randomOne, setRandomOne] = useState(0);
    const [randomTwo, setRandomTwo] = useState(0);
    const [randomThree, setRandomThree] = useState(0);
    const [randomFour, setRandomFour] = useState(0);
    const [randomFive, setRandomFive] = useState(0);

    const [inputOne, setInputOne] = useState(0);
    const [inputTwo, setInputTwo] = useState(0);
    const [inputThree, setInputThree] = useState(0);
    const [inputFour, setInputFour] = useState(0);
    const [inputFive, setInputFive] = useState(0);

    const [centsBalance, setCentsBalance] = useState(0);
    const [gemsBalance, setGemsBalance] = useState(0);

    const [outcomeText, setOutcomeText] = useState("");

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const session = await getSession();
                const userId = session?.user.sub;
                const currentGemsBalance = await getGemsAmountByUserId(userId);
                const currentCentsBalance = await getCentsAmountByUserId(userId);

                setCentsBalance(currentCentsBalance);
                setGemsBalance(currentGemsBalance);
                console.log(currentCentsBalance, currentGemsBalance)
            } catch(error) {
                console.error('Error in initializing error', error)
            }
        }
        
        fetchBalance();
    }, [])

    const onClickBuyRaffle = (cost: number, balance: number) => {
        if (balance < cost) {
            return;
        }
    
        setRandomOne(getRandomInt(9));
        setRandomTwo(getRandomInt(9));
        setRandomThree(getRandomInt(9));
        setRandomFour(getRandomInt(9));
        setRandomFive(getRandomInt(9));
        // HARDCODE FOR DEMO 12389
        if (inputOne == 1 && inputTwo == 2 &&
            inputThree == 3 && inputFour == 8
            && inputFive == 9) {
            setRandomOne(1);
            setRandomTwo(2);
            setRandomThree(3);
            setRandomFour(8);
            setRandomFive(9);
        }

        let matches = 0
        if (inputOne == randomOne) {
            matches++;
        }
        if (inputTwo == randomTwo) {
            matches++;
        }
        if (inputThree == randomThree) {
            matches++;
        }
        if (inputFour == randomFour) {
            matches++;
        }
        if (inputFive == randomFive) {
            matches++;
        }
        if (matches == 5) {
            setOutcomeText('You win the JACKPOT!');
            return
        } else if (matches > 0 && matches < 5) {
            setOutcomeText(`You matched ${matches} of the numbers!`)
            return
        }
        setOutcomeText('You lost...');
    }

    return (
        <div className="w-full rounded-lg overflow-hidden shadow-xl p-5 bg-white">
            <div className="w-full mb-5">
                <h1 className="font-bold text-2xl mb-4 text-center text-gray-800">Instant Lottery</h1>
                <p className="text-gray-700 text-lg text-center mb-4">
                    Ticket Cost: <span className="font-semibold">{cost}</span>
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

export default function RedeemRaffle() {
    return (
        <div className="flex justify-center items-center mt-10">
            <div className="max-w-3xl w-full"> {/* Adjust the max-width as needed */}
                <RaffleCard cost={-100} />
            </div>
        </div>
    );
}