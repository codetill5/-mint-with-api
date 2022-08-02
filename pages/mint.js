import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const mint = () => {
  const walletAddress =
    typeof window !== "undefined" ? localStorage.getItem("walletAddress") : "";
  const router = useRouter();
  const [image, setImage] = useState();
  const [ipfsImgHash, setIpfsImgHash] = useState();
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();

  const uploadToIPFS = async () => {
    const formData = new FormData();
    formData.append("file", image);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v3/ipfs`,
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
    if (title && desc && ipfsImgHash) {
      const json = JSON.stringify(query);
      const file = new Blob([json], { type: "text/json" });
      const uploadResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v3/ipfs`,
        file,
        {
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
        }
      );

      if (uploadResponse) {
        const uniq = new Date().getTime().toString();
        const query = {
          chain: "MATIC",
          to: walletAddress,
          url: uploadResponse.data.ipfsHash,
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

  //for checking if connected or not
  useEffect(() => {
    if (!walletAddress) {
      router.push("/");
    }
  }, [walletAddress]);

  return (
    <div className="mintContainer">
      <div className="header">
        <h1>Minting Now 🚀</h1>
        <div className="headerRight">
          <button className="disconnectBtn">Disconnect</button>
        </div>
      </div>

      <div className="bannerContainer">
        <img
          src={image ? URL.createObjectURL(image) : "/banner.jpg"}
          alt="bannerNft"
        />
      </div>

      <div className="forms">
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Name "
        />
        <input
          type="text"
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Description"
          className="descInput"
        />
        <button className="mintBtn" onClick={() => uploadToIPFS()}>
          Mint
        </button>
        <button className="btn" onClick={() => router.push('/showNFT')}>See Nfts</button>
      </div>
    </div>
  );
};

export default mint;
