import React, { useState, useEffect} from 'react';
import Web3Modal from"web3modal";
import { ethers } from "ethers";

import imageEth from "../eth.png";
import creator from "../creator.jpeg";

const Home = () => {

  const [ currentAccount, setCurrentAccount ] = useState('');
  const [connect, setConnect] = useState(false);
  return (
    <div>Home</div>
  )
}

export default Home