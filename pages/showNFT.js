import axios from "axios";
import React, { useEffect, useState } from "react";

const showNFT = () => {
  const [metadata, setMetadata] = useState();
  const walletAddress =
    typeof window !== "undefined" ? localStorage.getItem("walletAddress") : "";

  const getAllNfts = async () => {
    const response = await axios(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v3/nft/address/balance/MATIC/0xf48cd0f94724c21e9b1e4209fe91c86c0cc8e24a`,
      {
        headers: {
            "x-api-key": "40d3e0f6-9de3-4d86-837f-67323ff3b3a2",
            "content-type": "application/json"
        }
    }
    );
    console.log(response);
    setMetadata(response);
  };

  useEffect(() => {
    getAllNfts();
  }, []);

  return <div>My NFTS</div>;
};

export default showNFT;
