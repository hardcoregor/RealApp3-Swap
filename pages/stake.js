import Image from 'next/image';
import { useContext, useState } from 'react';
import { useTheme } from 'next-themes';
import { ethers } from 'ethers';
import Web3 from 'web3';

import images from '../assets';
import { Button } from '../components';
import { DEFIContext } from '../context/DEFIContext';

const stake = () => {
  const { currentAccount, formInput, setFormInput, onStake, unStake } = useContext(DEFIContext);
  const { daiTokenBalance, dappTokenBalance, stakingBalance } = currentAccount;
  const valueToStaking = Web3.utils.toWei(formInput, 'ether');

  return (
    <div className="p-16 min-h-screen">
      <div className="flex-col flexCenter my-20">
        <div className="flex flexCenter flex-row w-49 font-poppins my-6 border rounded-xl py-6">
          <div className="flex flexCenter flex-col justify-center w-2/4">
            <h1 className="font-bold text-xl  mb-2">Staking balance</h1>
            <h1>{ethers.utils.formatEther(stakingBalance)} mDai</h1>
          </div>
          <div className="flex flexCenter flex-col justify-center w-2/4">
            <h1 className="font-bold text-xl mb-2">Reward balance</h1>
            <h1>{ethers.utils.formatEther(dappTokenBalance)} HRD</h1>
          </div>
        </div>
      </div>
      <div className="flex flexCenter w-full sm:px-4 m-0 px-4">
        <div className=" w-2/4 border rounded-3xl p-6 font-poppins bg-nft-black-1 dark:bg-nft-black-4">
          <div className=" text-white flex justify-between mb-4 flexCenter">
            <h1 className="text-2xl font-bold w-3/4">Stake</h1>
            <p className="flex-1">Balance: {ethers.utils.formatEther(daiTokenBalance)} DAI</p>
          </div>
          <div className="flex justify-between bg-white p-3 rounded-xl mt-2">
            <div className="flexCenter">
              <div className="text-nft-black-1 font-semibold mr-3">DAI</div>
              <Image
                src={images.arrow}
                objectFit="contain"
                width={15}
                height={15}
                alt="arrow"
                className="cursor-pointer"
              />
            </div>
            <input
              className="flex w-2/4 outline-none rounded-xl p-2 border bg-white text-nft-black-1"
              type="number"
              min="0"
              placeholder="amount"
              onChange={(e) => setFormInput(e.target.value)}
            />
          </div>
          <div className="flex-col flexCenter">
            <div className="text-lg font-semibold text-white mt-4">Estimated Gas: </div>
            <Button btnName="Stake" classStyle="uppercase rounded-2xl mt-4 w-full py-4 text-xl nft-gradient" handleClick={() => onStake(valueToStaking)} />
            <Button btnName="Unstake" classStyle="uppercase rounded-2xl mt-4 w-full py-4 text-xl border" handleClick={() => unStake()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default stake;
