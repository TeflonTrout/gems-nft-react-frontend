import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { GEMS_ABI, GEMS_ABI_ADDRESS } from '../config';
import { Grid } from '@material-ui/core';
import Gem from './Gem';
import { connectWeb3 } from '../actions/index'
import { useDispatch, useSelector } from 'react-redux';


const Account = (props) => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.rootReducer)

    useEffect(() => {
        dispatch(connectWeb3());
        console.log('########333', state)
    }, [])

    return (
        <div className='account-page'>
            <Grid 
                container
                spacing={0} 
                align="center" 
                justify="center"
            >
                {state.account}
                No Gems
            </Grid>
        </div>
    )
}

export default Account
