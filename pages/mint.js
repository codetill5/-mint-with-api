import axios from "axios";
import { useState } from "react";

const mint = () => {
  const [image, setImage] = useState();
  const [ipfsImgHash, setIpfsImgHash] = useState();

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
 

  return (
    <div>
      <h1>Mint</h1>
      <label>Iimage</label>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={() => uploadToIPFS()}>Upload</button>
    </div>
  );
};

export default mint;
