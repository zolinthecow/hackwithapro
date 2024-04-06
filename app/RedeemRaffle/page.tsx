"use client"
import React, { useState, useEffect } from "react";
import prisma from "@/prisma";

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
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
            Pick Five Numbers
        </label>
        <div className="w-full flex flex-row justify-center">
            <input onChange={(event) => handleInputChangeOne(event)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded p-5 m-5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="0-9"></input>
            <input onChange={(event) => handleInputChangeOne(event)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded p-5 m-5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="0-9"></input>
            <input onChange={(event) => handleInputChangeOne(event)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded p-5 m-5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="0-9"></input>
            <input onChange={(event) => handleInputChangeOne(event)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded p-5 m-5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="0-9"></input>
            <input onChange={(event) => handleInputChangeOne(event)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded p-5 m-5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="0-9"></input>
        </div>
    </div>
}

function LotteryView({randomOne, randomTwo, randomThree, randomFour, randomFive }: {randomOne: number; randomTwo: number, randomThree: number; randomFour: number; randomFive: number; }) {
    return (
        <div>
            <p className="font-bold text-xl mb-2">Lottery Numbers</p>
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

    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const currentBalance = await prisma.class.getMany();
                setBalance(currentBalance);
            } catch(error) {
                console.error('Error in initializing error', error)
            }
            const currentBalance = await prisma.class.findMany();
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

        if (inputOne == randomOne && inputTwo == randomTwo &&
            inputThree == randomThree && inputFour == randomFour
            && inputFive == randomFive) {
            // indicate win TODO
            return
        }
        console.error('doesn\'t match')
        // indicate loss
    }

    return (
        <div className="w-full rounded overflow-hidden shadow-lg">
            <div className="w-full">
                <div className="font-bold text-xl mb-2">Instant Lottery</div>
                <p className="text-gray-700 text-base">
                    Costs {cost}
                </p>
                <button onClick={() => onClickBuyRaffle(cost, balance)} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Buy Raffle</button>
                <RaffleGame setInputOne={setInputOne} setInputTwo={setInputTwo} setInputThree={setInputThree} setInputFour={setInputFour} setInputFive={setInputFive}></RaffleGame>
            </div>
            <LotteryView randomOne={randomOne} randomTwo={randomTwo} randomThree={randomThree} randomFour={randomFour} randomFive={randomFive}></LotteryView>
        </div>
    );
}

export default function RedeemRaffle() {
    return (
        <RaffleCard cost={-100} />
    );
}