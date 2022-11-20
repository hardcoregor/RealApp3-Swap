import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import images from '../assets';

const CurrencyField = ({ getSwapPrice, wethAmount }) => {
  const [search, setSearch] = useState('SELECT A TOKEN');
  const [toggle, setToggle] = useState(false);
  const { theme } = useTheme();

  const getPrice = (value) => {
    getSwapPrice(value);
  };

  return (
    <div
      className="flex items-center flex-1 text-nft-black-1 font-semibold mr-3 relative"
    >
      <p className="text-nft-black-1 mr-3">{search}</p>
      <Image
        src={images.arrow}
        objectFit="contain"
        width={15}
        height={15}
        alt="arrow"
        className="cursor-pointer"
        onClick={() => setToggle((premToggle) => !premToggle)}
      />
      {toggle && (
        <div
          className="absolute top-full left-0 right-0 w-45 bg-nft-black-4 mt-4 z-10 py-3 px-4 rounded-2xl cursor-pointer flexCenter flex-col -ml-3 text-nft-black-1 border"
        >
          {['DAI', 'USDT', 'BNB', 'ETH', 'BTC'].map((item) => (
            <p
              className="text-white"
              onClick={() => {
                setSearch(item);
                setToggle(false);
              }}
              key={item}
            >
              {item}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencyField;
