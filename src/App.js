import React, { useState, useEffect} from "react";
import Web3 from "web3";
import Counter from "./contracts/Counter.json";

function App() {
  const [count, setCount] = useState(0);
   const [contract, setContract] = useState (null);
   const [account, setAccount] = useState("");
  useEffect ( () =>{
    const init = async () => {
      try{
        // Create Web3 instance using Ganache provider
         const ganacheProvider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
        const web3Instance = new Web3(ganacheProvider);

         // Get chain id of Ganache network
         const chainId = await web3Instance.eth.getChainId();
        console. log( "Chain ID:", chainId);

        // Get accounts from Ganache network
         const accounts = await web3Instance.eth.getAccounts();
         console.log( "Accounts:", accounts);
        setAccount (accounts [0]);

        // Load contract
        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = Counter.networks[networkId];
        const counterContract = new web3Instance.eth.Contract(
          Counter.abi,
          deployedNetwork && deployedNetwork.address,
        );
        setContract(counterContract);
        } catch (error) {
          console.log(error);
          }
        };
        init ();
        }, []);

const handleIncrement = async () => {
  try {
    await contract.methods.inc().send({ from: account });
     const newCount = await contract.methods.get().call();
    setCount(newCount);
   } catch (error) {
     console. log(error);
   }
  };

const handleDecrement = async () => {
  try {
     await contract.methods.dec().send({ from: account });
     const newCount = await contract.methods.get().call();
    setCount (newCount);
   }
     catch (error) {
    console. log(error);
     }
};

  return(
      <div>
      <h1>Counter: {count}</h1>
      <button onClick= {handleIncrement}> Increment </button>
      <button onClick={handleDecrement}>Decrement</button>
</div>
  );
  }
export default App;
