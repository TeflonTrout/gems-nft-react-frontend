import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { GEMS_ABI, GEMS_ABI_ADDRESS } from './config.js';
import Gem from './components/Gem';
import { TextField, Button, Grid } from '@material-ui/core';
import Truncate from 'react-truncate';
import './style.css';


function App() {
  const [complexGemData, setComplexGemData] = useState([]);
  const [newName, setNewName] = useState()
  const [totalSupply, setTotalSupply] = useState();
  const [metaMaskAccounts, setMetaMaskAccounts] = useState();
  const [gemsContract, setGemsContract] = useState();
  // const [gemOwner, setGemOwner] = useState([]);
  // const [gemData, setGemData] = useState([]);
  
  useEffect(() => {
    loadBlockChainData();
  }, [])
  
  useEffect(() => {
    loadGemData(totalSupply);
  }, [totalSupply])

  async function loadBlockChainData() {
    const web3 = new Web3(Web3.givenProvider);
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
      const gemsContract = new web3.eth.Contract(GEMS_ABI, GEMS_ABI_ADDRESS);
      setGemsContract(gemsContract);
      const totalGemSupply = await gemsContract.methods.totalSupply().call();
      setTotalSupply(totalGemSupply)
      const accounts = await web3.eth.getAccounts()
      setMetaMaskAccounts(accounts[0]);
      return true;
    } else {
      return false;
    };
  }  
  
  async function loadGemData(totalSupply) {
    for (let i = 0; i < totalSupply; i++) {
      const newGemData = await gemsContract.methods.getGemOverview(i).call();                        
      const gemOwner = await gemsContract.methods.ownerOf(i).call();
      setComplexGemData(prevState => [...prevState, {id: i, owner: gemOwner, data: newGemData}]);
    }
    return complexGemData;
  }
  
  const updateGemName = e => {
    e.preventDefault();
    setNewName(e.target.value);
  }
  
  const createNewGem = async (e) => {
    e.preventDefault();
    const createdGem = await gemsContract.methods.requestNewGemRandom(52, newName).send({ from:metaMaskAccounts });
    return createdGem;
  }

  return (
    <div className="App">
      <h1>Welcome to CryptoTreasure!</h1>
      <h3>Account: <Truncate lines={5}>{metaMaskAccounts}</Truncate></h3>
      <div>
        <form onSubmit={(e) => createNewGem(e)}>
          <TextField className='create-gem-input' type="text" placeholder="Enter a New Gem Name" onChange={e => updateGemName(e)}/>
          <Button variant='contained' type='submit'>Open Treasure</Button >
        </form>
      </div>
      {/* <Button variant='contained' onClick={() => loadGemData(totalSupply)}>Fetch</Button> */}
      <div>
        <h1 className="heading">Existing Treasure's</h1>
        <Grid container
          style={{display: 'flex', width: '100%', margin: '0'}} 
          spacing={2} 
          align="center" 
          justify="center">
          {complexGemData.map((gem, index) => (
            <Grid item key={index}>
              <div>
                <Gem data={gem.data} account={metaMaskAccounts} owner={gem.owner}/>
              </div>
            </Grid>
          ))}
        </Grid>
        </div>
    </div>
  );
}

export default App;
