import { ComponentClass } from "react";

type RaffleData = {
  id: string;
  name: string;
  description: string;
  location: string;
};

export default function RedeemRafflePage() {
  return (
    RaffleCard({cost: 1})
  )
}

function RaffleGame() {
  return (
    <div class="w-full">
      game
    </div>
  );
}

function RaffleCard({ cost }: { cost: number }) {
  return (
    <div class="max-w-sm rounded overflow-hidden shadow-lg">
      <RaffleGame/>
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">Coin Flip</div>
        <button>Buy Raffle</button>
        <p class="text-gray-700 text-base">
          Costs {cost}
        </p>
      </div>
    </div>
  );
}