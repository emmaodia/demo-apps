import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { FuseSDK } from "@fuseio/fusebox-web-sdk";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast, Slide, } from 'react-toastify';

  import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  
  const [loggedIn, setLoggedIn] = useState(false);
 
//   const notify = () => toast("Wow so easy !", {
// position: "top-center",
// autoClose: 4000,
// hideProgressBar: false,
// closeOnClick: true,
// pauseOnHover: true,
// draggable: true,
// progress: undefined,
// theme: "light",
// transition: Slide,
// });

  const connect = async () => {
    // const router = useRouter();
    let signer = null;

    let provider;
    if (window.ethereum == null) {
      console.log("MetaMask not installed; using read-only defaults");
      provider = ethers.getDefaultProvider();
    } else {
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();

      console.log(signer);

      const apiKey = "pk_wEP0gTlc3jcvBXEDpSnXBgbQ";

      const fuseSDK = await FuseSDK.init(apiKey, signer);
      console.log(`logged in, ${fuseSDK.wallet.getSender()}`);
      setLoggedIn(true);
      console.log(loggedIn);
    }
  };

  const mint = async() => {
    try {
      
    
    const mintTx = new ethers.Interface([
        "function mint()",
      ]);
      const txData = mintTx.encodeFunctionData("mint");



  const to = "0x1eC948D48f3CA2ff37b7F094A25Aa6E0519FB127";
  const value = ethers.parseEther("0");
  const data = Uint8Array.from([txData]);

  console.log(data);

  const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      console.log(signer);

      const apiKey = "pk_3sVM3dzWOBMmeklIOGU0dFO2";

      const fuseSDK = await FuseSDK.init(apiKey, signer);

      const res = await fuseSDK.callContract(to, value, data);
     
    console.log(`UserOpHash: ${res?.userOpHash}`);
    console.log("Waiting for transaction...");
    toast("Waiting for Transaction!", {
position: "top-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
transition: Slide,
})

    const receipt = await res?.wait();
    console.log("Transaction Hash:", receipt?.transactionHash);
     toast("Transaction Completed!", {
position: "top-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
transition: Slide,
})

      } catch (error) {
     console.log(error) 
    }
  }

  const logout = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.destroy();
  };

//   useEffect(() => {
// connect()
//   }, [loggedIn])

  return (
    <main className={`flex flex-col items-center p-24 ${inter.className}`}>
      {loggedIn ? (
        <>
          <p>Logged In</p>

          <button
            type="button"
            onClick={mint}
            className="mt-10 max-w-64 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Mint NFT
          </button>

          <button
            type="button"
            onClick={logout}
            className="mt-10 max-w-64 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Log Out
          </button>

          {/* <button onClick={notify}>Notify !</button> */}
        <ToastContainer transition={Slide} />
        </>
      ) : (
        <button
          type="button"
          onClick={connect}
          className="max-w-64 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Login
        </button>
      )}
    </main>
  );
}
