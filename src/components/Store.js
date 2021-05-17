import React from 'react'
import Navbar from './Navbar';
import videoBackground from '../images/storeWallpaper.mp4'
import { Button } from '@material-ui/core'

const Store = (props) => {

    const createNewGem = async (e) => {
        e.preventDefault();
        const createdGem = await props.contract.methods.requestNewGemRandom(52).send({ from:props.account, value:10000000000000000});
        return createdGem;
    }
    
      const openBoosterPack = async (e) => {
        e.preventDefault();
        const boosterPack = await props.contract.methods.openBoosterPack(52).send({ from:props.account, value:50000000000000000});
        return boosterPack;
    }

    return (
        <div className="store-page">
            <video className='video-background' autoPlay loop muted>
                <source src={videoBackground} type='video/mp4' />
            </video>
            <div className="purchase-form">
                <form onSubmit={(e) => createNewGem(e)}>
                    <h2>Purchase a Treasure!</h2>
                    <Button variant='contained' type='submit'>
                        0.01 ETH
                    </Button >
                </form>
                <form onSubmit={(e) => openBoosterPack(e)}>
                    <h2>Purchase a Booster Pack with a guaranteed rare treasure!</h2>
                    <Button variant='contained' type='submit'>
                        0.05 ETH
                    </Button >
                </form>
            </div>
        </div>
    )
}

export default Store
