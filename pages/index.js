import Image from 'next/image';
import { useState, useContext } from 'react';
import { useTheme } from 'next-themes';

import images from '../assets';
import { Button, SearchBar } from '../components';
import { DEFIContext } from '../context/DEFIContext';

const Home = () => {
  const { theme, setTheme } = useTheme();
  const { currentAccount } = useContext(DEFIContext);
  const [activeSelect, setActiveSelect] = useState('DAI');

  return (
    <div className="flex flexCenter w-full sm:px-4 p-20 m-0 min-h-screen">
      <div className="w-2/4 border rounded-3xl p-6 mt-14 font-poppins bg-nft-black-1 dark:bg-nft-black-4">
        <div className="text-2xl font-bold text-white flexCenter">Swap</div>
        <div className="flex justify-between bg-white p-3 rounded-xl mt-2">
          <SearchBar />
          <input className="flex w-2/4 outline-none rounded-xl p-2 border bg-white text-nft-black-1" type="number" min="0" placeholder="amount" />
        </div>
        <div className="flex justify-between bg-white p-3 rounded-xl mt-3">
          <SearchBar />
          <input className="flex w-2/4  outline-none rounded-xl p-2 border bg-white text-nft-black-1" type="number" min="0" placeholder="amount" />
        </div>
        <div className="flex-col flexCenter">
          <div className="text-lg font-semibold text-white mt-4">Estimated Gas: </div>
          <Button btnName="Swap" classStyle="uppercase rounded-2xl mt-4 w-full py-4 text-xl nft-gradient" />
        </div>
      </div>
    </div>

  );
};

export default Home;
