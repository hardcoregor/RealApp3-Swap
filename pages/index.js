import Image from 'next/image';
import { useState, useContext } from 'react';
import { useTheme } from 'next-themes';
import BeatLoader from 'react-spinners/BeatLoader';

import images from '../assets';
import { Button, CurrencyField } from '../components';
import { DEFIContext } from '../context/DEFIContext';
import ConfigModal from '../components/ConfigModal';

const Home = () => {
  const { connectedAcc } = useContext(DEFIContext);
  const { theme, setTheme } = useTheme();
  const [activeSelect, setActiveSelect] = useState('DAI');
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flexCenter w-full sm:px-4 p-20 m-0 min-h-screen">
      <div className="w-2/4 border rounded-3xl p-6 mt-14 font-poppins bg-nft-black-1 dark:bg-nft-black-4">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold text-white flexCenter">Swap</h1>
          <Image
            src={images.gear}
            objectFit="contain"
            width={35}
            height={35}
            alt="arrow"
            className="cursor-pointer"
            onClick={() => setShowModal((prev) => !prev)}
          />
        </div>
        <CurrencyField
          field="input"
          tokenName="WETH"
        />
        <CurrencyField
          field="output"
          tokenName="UNI"
        />
        <div className="flex-col flexCenter">
          <Button btnName="Swap" classStyle="uppercase rounded-2xl mt-4 w-full py-4 text-xl nft-gradient text-white" />
        </div>
      </div>

      {showModal && (
        <ConfigModal
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default Home;