import React, { useState } from 'react';

const index = () => {
  const [walletAddress, setWalletAddress] = useState();

  const connectMetamask = async() => {
    if (typeof window !== "undefined" && window?.ethereum) {
      const response = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(response);
    } else {
      alert("Install Metamask")
    }
  }

  return(
    <div>
      <h1>Connect here</h1>
      <button onClick={() => connectMetamask()}>Connect</button>
      {walletAddress ? walletAddress : ''}
    </div>
  ) 
}

export default index;