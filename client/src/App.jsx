import { useState, useEffect } from "react";
import "./App.css";
import { ethers } from "ethers";

import abi from "./contractJson/coffee.json";

import Memos from "./components/Memos";
import Buy from "./components/Buy";

function App() {
  const [state, setState] = useState({
    provide: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState("Not Connected");

  useEffect(() => {
    const initializeEthers = async () => {
      const contractAddress = "0xE3Ca443c9fd7AF40A2B5a95d43207E763e56005F"; // Replace with my contract address (when deployed)
      const contractABI = abi.abi;
      console.log(contractABI);
      const { ethereum } = window;

      if (ethereum) {
        try {
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });
          setAccount(accounts[0]);

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );

          // console.log(contract);

          setState({ provider, signer, contract });
        } catch (error) {
          console.error("Error connecting to MetaMask:", error);
        }
      } else {
        console.error(
          "MetaMask not installed. Please install MetaMask to use this app."
        );
      }
    };

    initializeEthers();
  }, []);

  return (
    <div className="App">
      <p>Connect Account: {account}</p>
      <Buy state={state}></Buy>
      {/* <Memos state={state}></Memos> */}
    </div>
  );
}

export default App;
