import axios from "axios";
import React, { useEffect, useState } from "react";

const showNFT = () => {
  const [metadata, setMetadata] = useState();
  const walletAddress =
    typeof window !== "undefined" ? localStorage.getItem("walletAddress") : "";

  const getAllNfts = async () => {
    const response = await axios(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v3/nft/address/balance/MATIC/${walletAddress}`,
      {
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          "content-type": "application/json",
        },
      }
    );
    setMetadata(response?.data?.metadata);
  };

  useEffect(() => {
    getAllNfts();
  }, []);

  return (
    <div>
      My NFTS
      <div>
        {metadata?.map((item) => {
          <>
            <img src={metadata?.image} alt="nft" />
            <h3>{item?.name}</h3>
            <p>{item?.description}</p>
          </>;
        })}
      </div>
    </div>
  );
};

export default showNFT;
