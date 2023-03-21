import { ConnectWallet , useStorageUpload , MediaRenderer } from "@thirdweb-dev/react";
import { useCallback, useState } from "react";
import styles from "../styles/Home.module.css";
import type { NextPage } from "next";
import { useDropzone } from "react-dropzone";

const Home: NextPage = () => {
  const [ uris, setUris ] = useState<string[]>([]);


  const { mutateAsync: upload } = useStorageUpload();
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const _uris = await upload({ data : acceptedFiles });
      console.log(_uris);
      setUris(_uris)

    },
    [upload]);
  const { getRootProps, getInputProps} = useDropzone({ onDrop});
  
  console.log(uris)
  
  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <button>Choose file to upload to Ipfs</button>
      </div>
    <div>
    {uris.map((uri) => {
      return <MediaRenderer key = {uri} src = {uri} alt= "Image"/>;
      })}
    </div>
    <div>
    {uris}
    </div>
    </div>

  );
};

export default Home;
