import { ethers } from 'ethers';

import tokenFarm from './TokenFarm.json';
import daiToken from './DaiToken.json';
import dappToken from './DappToken.json';
import swapToken from './Uniswap.json';
import CustomTokenABI from './CustomTokenABI.json';

export const TokenFarmAddress = '0xcF0EEF041886c43Cc1f66bb34dC91bA599dfDAeF';
export const TokenFarmAddressABI = tokenFarm.abi;

export const DaiTokenAddress = '0xc78f2860Deff6dd0bc779C2797A6c8a2c35ac666';
export const DaiTokenAddressABI = daiToken.abi;

export const DappTokenAddress = '0xA92E0430C5b553208c2d7C6a9353E525161BDb22';
export const DappTokenAddressABI = dappToken.abi;

export const tokenContract = async address => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window
  if (ethereum) {
    const signer = provider.getSigner();
    const contractReader = new ethers.Contract(address, CustomTokenABI, signer);
    return contractReader;
  }
};

export const contract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window
  if (ethereum) {
    const signer = provider.getSigner();
    const contractReader = new ethers.Contract('0xE2960498e2C02d259B6f00Dce3Afe4586ccA9B4c', swapToken, signer);
    return contractReader;
  }
};

export const SwapAddress = '0xE2960498e2C02d259B6f00Dce3Afe4586ccA9B4c';
export const SwapTokenAddressABI = swapToken.abi;

