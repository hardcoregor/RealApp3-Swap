import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

import images from '../assets';
import Button from './Button';
import { DEFIContext } from '../context/DEFIContext';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { connectWallet, connectedAcc } = useContext(DEFIContext);

  return (
    <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-black-4 bg-white dark:border-nft-black-1 border-nft-gray-1">
      <div className="flex flex-row justify-start w-1/3">
        <Link href="/">
          <div className="flexCenter cursor-pointer">
            <Image
              src={images.logo}
              objectFit="contain"
              width={32}
              height={32}
              alt="logo"
              className={theme === 'dark' ? 'filter invert' : ''}
            />
            <p className="dark:text-white text-nft-black-1 font-semibold text-lg ml-1">Swapper</p>
          </div>
        </Link>
      </div>

      <div className="w-1/3">
        <ul className="flex flex-row dark:text-white text-nft-black-1 font-semibold text-xl">
          <Link href="/">
            <li className="ml-5 cursor-pointer hover:underline underline-offset-4">Trade</li>
          </Link>
          <Link href="stake">
            <li className="ml-5 cursor-pointer hover:underline underline-offset-4">Stake</li>
          </Link>
          <Link href="faucet">
            <li className="ml-5 cursor-pointer hover:underline underline-offset-4">Faucet</li>
          </Link>
        </ul>
      </div>

      <div className="flex flexBetween">
        <div className="flex items-center mr-6">
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          />
          <label htmlFor="checkbox" className="flexBetween w-8 h-4 dark:bg-white bg-black rounded-2xl p-1 relative label cursor-pointer">
            <i className="fas fa-sun" style={{ color: 'white' }} />
            <i className="fas fa-moon" style={{ color: 'black' }} />
            <div className="w-3 h-3 absolute dark:bg-black bg-white rounded-full ball" />
          </label>
        </div>
        {!connectedAcc
          ? (<Button btnName="Connect" classStyle="rounded-2xl nft-gradient" handleClick={connectWallet} />)
          : (<Button btnName="Connected!" classStyle="rounded-2xl border" />)}
      </div>
    </nav>
  );
};

export default Navbar;