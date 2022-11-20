import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import images from '../assets';
import { DEFIContext } from '../context/DEFIContext';

const CurrencyField = ({ tokenName, loading, spinner, value, field, balance }) => {
  const { theme } = useTheme();

  return (
    <div className="flex justify-between bg-white p-3 rounded-xl mt-2">
      <div className="flex-col">
        <div className="flex items-center flex-1 text-nft-black-1 font-semibold mr-3 relative">
          <p className="text-nft-black-1 mr-3">{tokenName}</p>
          <Image
            src={images.arrow}
            objectFit="contain"
            width={15}
            height={15}
            alt="arrow"
            className="cursor-pointer"
          />
        </div>
        <p className="mr-3 text-xs text-nft-gray-2">Balance: {balance?.toFixed(3)}</p>
      </div>
      {loading ? (
        <div>{spinner}</div>
      ) : (
        <input
          className="flex w-2/4 outline-none rounded-xl p-2 border bg-white text-nft-black-1"
          type="number"
          min="0"
          placeholder="0.0"
          value={value}
        />
      )}
    </div>
  );
};

export default CurrencyField;
