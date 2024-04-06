import { ComponentClass } from "react";

type RaffleData = {
    id: string;
    name: string;
    description: string;
    location: string;
};

function RaffleGame() {
    return (
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                Pick Five Numbers
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="0-9">
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="0-9">
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="0-9">
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="0-9">
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="0-9">
        </div>
    );
}

function RaffleCard({cost}: {cost: number }) {
    return (
        <>
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <RaffleGame />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Coin Flip</div>
                    <button>Buy Raffle</button>
                    <RaffleGame></RaffleGame>
                    <p className="text-gray-700 text-base">
                        Costs {cost}
                    </p>
                </div>
            </div>
        </>
    );
}

export default function RedeemRaffle() {
    return (
        <RaffleCard cost={1} />
    );
}