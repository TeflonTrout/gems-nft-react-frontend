import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Web3 from 'web3';
import { GEMS_ABI, GEMS_ABI_ADDRESS } from './config.js';
import Gem from './components/Gem';
import { AppBar, Toolbar, TextField, Button, Grid } from '@material-ui/core';
import Truncate from 'react-truncate';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './components/Navbar'
import Store from './components/Store'
import Account from './components/Account'
import { getWeb3Data } from './actions/index'


function App() {
  const dispatch = useDispatch();
  const gemState = useSelector(state => state.rootReducer)
  const [complexGemData, setComplexGemData] = useState([]);
  const [newName, setNewName] = useState()
  const [totalSupply, setTotalSupply] = useState();
  const [metaMaskAccounts, setMetaMaskAccounts] = useState();
  const [gemsContract, setGemsContract] = useState();
  
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
      const newGemColorData = await gemsContract.methods.getGemColorOverview(i).call();                        
      const newGemCutData = await gemsContract.methods.getGemOverview(i).call();                        
      const gemOwner = await gemsContract.methods.ownerOf(i).call();
      setComplexGemData(prevState => [...prevState, {id: i, owner: gemOwner, colorData: newGemColorData, cutData: newGemCutData}]);
    }
    return complexGemData;
  }
  
  const updateGemName = e => {
    e.preventDefault();
    setNewName(e.target.value);
  }
  
  const createNewGem = async (e) => {
    e.preventDefault();
    const createdGem = await gemsContract.methods.requestNewGemRandom(52).send({ from:metaMaskAccounts, value:10000000000000000});
    return createdGem;
  }

  const openBoosterPack = async (e) => {
    e.preventDefault();
    const boosterPack = await gemsContract.methods.openBoosterPack(52).send({ from:metaMaskAccounts, value:50000000000000000});
    return boosterPack;
  }

  return (
    <Router>
      <Switch>
        <div className="App">
          <Route path='/' exact>
            <div className='navbar'>
              <Navbar account={metaMaskAccounts}/>
            </div>
          </Route>
          <Route path='/store'>
            <Navbar account={metaMaskAccounts} />
            <Store account={metaMaskAccounts} contract={gemsContract}/>
          </Route>
          <Route path='/gallery'>
            <Navbar account={metaMaskAccounts} />
            <h1 className="heading">Existing Treasure's</h1>
            <Grid container
              style={{display: 'flex', width: '100%', backgroundColor: 'lightgrey', margin: '0'}} 
              spacing={0} 
              align="center" 
             justify="center">
                {complexGemData.map((gem, index) => (
                  <Grid item key={index}>
                    <div>
                      <Gem index={index} data={gem.colorData} cutData={gem.cutData} account={metaMaskAccounts} owner={gem.owner}/>
                    </div>
                  </Grid>
                ))}
            </Grid>
          </Route>
          <Route path='/account'>
            <Navbar account={metaMaskAccounts} />
            <Account gemArray={complexGemData} contract={gemsContract} account={metaMaskAccounts}/>
          </Route>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
