import axios from "axios";
import { useEffect, useState } from "react";

const mint = () => {
  const walletAddress =
    typeof window !== "undefined" ? localStorage.getItem("walletAddress") : "";
  const [image, setImage] = useState();
  const [ipfsImgHash, setIpfsImgHash] = useState();
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();

  const uploadToIPFS = async () => {
    const formData = new FormData();
    formData.append("file", image);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}`,
      formData,
      {
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
      }
    );
    setIpfsImgHash(response);
  };

  const handleMint = async () => {
    const query = {
      name: title,
      description: desc,
      image: ipfsImgHash,
    };
    if (title && desc && ipfsImgHash && ipfsGlbHash) {
      const json = JSON.stringify(query);
      const file = new Blob([json], { type: "text/json" });
      const uploadResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}`,
        formData,
        {
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
        }
      );

      if (uploadResponse) {
        const uniq = new Date().getTime().toString();
        const query = {
          chain: "MATIC",
          tokenId: uniq, // unique string
          to: walletAddress[0],
          contractAddress: process.env.NEXT_PUBLIC_NFT_CONTRACT,
          url: uploadResponse.data.ipfsHash,
          fromPrivateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY,
        };
        const nftResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/v3/nft/mint`,
          query,
          {
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          }
        );
      }
    }
  };

  useEffect(() => {
    if (ipfsImgHash) {
      handleMint();
    }
  }, [ipfsImgHash]);

  return (
    <div className="mintContainer">
      <h1>Mint a NFT</h1>
        <label>Image</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <label>title</label>
        <input type="text" onChange={(e) => setTitle(e.target.value)} />
        <label>description</label>
        <input type="text" onChange={(e) => setDesc(e.target.value)} />
        <button onClick={() => uploadToIPFS()}>Mint</button>
      </div>
  );
};

export default mint;
