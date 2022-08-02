import React, { useState } from "react";
import { useRouter } from "next/router";

const index = () => {
  const [walletAddress, setWalletAddress] = useState();
  const router = useRouter();

  const connectMetamask = async () => {
    if (typeof window !== "undefined" && window?.ethereum) {
      const response = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      localStorage.setItem("walletAddress", response);
      setWalletAddress(response);
      router.push('/mint');
    } else {
      alert("Install Metamask");
    }
  };

  return (
    <div className="container">
      <h1>Connect Your Metamask 🦊</h1>
      <button onClick={() => connectMetamask()} className="btn">Connect</button>
      {/* {walletAddress ? walletAddress : ""} */}
    </div>
  );
};

export default index;
