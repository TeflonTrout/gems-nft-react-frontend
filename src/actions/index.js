import Web3 from 'web3';
import { GEMS_ABI, GEMS_ABI_ADDRESS } from '../../src/config';

export const getWeb3Data = (gemsContract, totalSupply, metaMaskAccounts) => async dispatch => {
    try {
        console.log("%%%%%%%%%%%%%%", metaMaskAccounts)
        dispatch({
            type: "GET_WEB3_DATA",
            payload: ({contract: gemsContract}, {supply: totalSupply}, {myAccount: metaMaskAccounts})
        })
    }
    catch(e) {
        console.log(e)
    }
}

export const connectWeb3 = () => async dispatch => {
    try {
        const web3 = new Web3(Web3.givenProvider);
            if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            window.ethereum.enable();
            const gemsContract = new web3.eth.Contract(GEMS_ABI, GEMS_ABI_ADDRESS);
            const totalGemSupply = await gemsContract.methods.totalSupply().call();
            const accounts = await web3.eth.getAccounts()
            const myAccount = accounts[0];
            dispatch({
                type: 'CONNECT_WEB3',
                payload: ({contract: gemsContract}, {supply: totalGemSupply}, {account: myAccount})
            })
        }
    }
    catch(e) {
        console.log(e)
    }
}

// export const loadGemData = (supply) => async dispatch => {
//     try {

//     }
// }