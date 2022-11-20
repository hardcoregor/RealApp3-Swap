import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

import { TokenFarmAddress, TokenFarmAddressABI, DaiTokenAddress, DaiTokenAddressABI, DappTokenAddress, DappTokenAddressABI } from './constants';

const fetchContractFarm = (signerOrProvider) => new ethers.Contract(TokenFarmAddress, TokenFarmAddressABI, signerOrProvider);
const fetchContractDai = (signerOrProvider) => new ethers.Contract(DaiTokenAddress, DaiTokenAddressABI, signerOrProvider);
const fetchContractDapp = (signerOrProvider) => new ethers.Contract(DappTokenAddress, DappTokenAddressABI, signerOrProvider);

export const DEFIContext = React.createContext();

export const DEFIProvider = ({ children }) => {
  const [connectedAcc, setConnectedAcc] = useState('');
  const [formInput, setFormInput] = useState('0');
  const [currentAccount, setCurrentAccount] = useState({
    account: connectedAcc,
    daiToken: fetchContractDai,
    dappToken: fetchContractDapp,
    tokenFarm: fetchContractFarm,
    daiTokenBalance: '0',
    dappTokenBalance: '0',
    stakingBalance: '0',
    loading: true,
  });

  const checkWalletIsConnected = async () => {
    if (!window.ethereum) return console.log('Please install MetaMask for using our NFT platform!');

    const accounts = await window.ethereum.request({ method: 'eth_accounts' });

    if (accounts.length) {
      setConnectedAcc(accounts[0]);

      setCurrentAccount((state) => ({ ...state, account: accounts[0] }));
    } else {
      console.log('No accounts found.');
    }
  };
  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) return console.log('Please install MetaMask for using our NFT platform!');

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    setConnectedAcc(accounts[0]);
    setCurrentAccount((state) => ({ ...state, account: accounts[0] }));

    window.location.reload();
  };

  const checkBalances = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const contractDai = fetchContractDai(signer);
    const contractDapp = fetchContractDapp(signer);
    const contractFarm = fetchContractFarm(signer);

    const daiTokens = await contractDai.balanceOf(address);
    const daiBalance = daiTokens.toString();

    const dappTokens = await contractDapp.balanceOf(address);
    const dappBalance = dappTokens.toString();

    const stakingTokens = await contractFarm.stakingBalance(address);
    const stakingBalances = stakingTokens.toString();
    setCurrentAccount((state) => ({ ...state, daiTokenBalance: daiBalance, dappTokenBalance: dappBalance, stakingBalance: stakingBalances, loading: false }));
  };

  useEffect(() => {
    checkBalances();
  }, []);

  const onStake = async (valueToStaking) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contractDai = fetchContractDai(signer);
    const contractFarm = fetchContractFarm(signer);

    await contractDai.approve(contractFarm.address, valueToStaking);
    await contractFarm.stakeTokens(valueToStaking);
  };

  const unStake = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contractFarm = fetchContractFarm(signer);

    await contractFarm.unstakeTokens();
  };

  return (
    <DEFIContext.Provider value={{ connectWallet, connectedAcc, currentAccount, onStake, unStake, formInput, setFormInput }}>
      {children}
    </DEFIContext.Provider>
  );
};
