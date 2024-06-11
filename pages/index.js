import React, { useState, useEffect } from 'react';
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import Image from 'next/image';

import imageEth from "../eth.png";
import creator from "../creator.jpeg";

const Home = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [connect, setConnect] = useState(false);
  const [balance, setBalance] = useState("");
  const [showBalance, setShowBalance] = useState(""); // Added showBalance state

  const failMessage = "Please install MetaMask & connect your MetaMask";
  const successMessage = "Your account is successfully connected to MetaMask";

  const INFURA_ID = "";
  const provider = new ethers.providers.JsonRpcProvider(
    `https://mainnet.infura.io/v3/${INFURA_ID}`
  );

  const checkIfWalletConnected = async () => {
    if (!window.ethereum) return;

    try {
      const accounts = await window.ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("Fail");
      }

      const address = "";
      const balance = await provider.getBalance(address);
      const formattedBalance = ethers.utils.formatEther(balance);
      setShowBalance(`${formattedBalance} ETH`);
    } catch (error) {
      console.error("Error connecting to wallet", error);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) return console.log(failMessage);

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setCurrentAccount(accounts[0]);
      setConnect(true);
      window.location.reload();
    } catch (error) {
      console.error("Error connecting to wallet", error);
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  useEffect(()=> {
    async function accountChanged(){
      window.ethereum.on('accountChanged', async function(){
        const accounts = await window.ethereum.request({method: 'eth_accounts'}
      );
      if(accounts.length){
        setCurrentAccount(accounts[0])
      } else {
        window.location.reload();
      }
      });
    }
    accountChanged();

  }, []);

  return (
    <div className="card-container">
      {!currentAccount ? "" : <span className="pro">Pro</span>}
      <Image src={creator} alt='profile' width={80} height={80} />
      <h3>Check Ether</h3>

      {!currentAccount && !connect ? (
        <div>
          <div className="message">
            <p>{failMessage}</p>
          </div>
          <Image src={imageEth} alt='ether' width={100} height={100} />
          <p>Welcome to the Ether account balance checker</p>
          <div className='buttons'>
            <button className='primary' onClick={connectWallet}>Connect Wallet</button>
          </div>
        </div>
      ) : (
        <div className='skills'>
          <h6>Your Ether</h6>
          <ul>
            <li>Account: {currentAccount}</li>
            <li>Balance: {balance}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
