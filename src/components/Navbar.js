import React from 'react';
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core';
import Truncate from 'react-truncate';
import { useSelector } from 'react-redux'

const Navbar = (props) => {

    
    const state = useSelector(state => state.rootReducer);
    return (
        <div className='navbar'>
            <Link to='/' style={{color: 'lightgrey'}}>
                <h1>CryptoTreasures</h1>
            </Link>
            <h3>Account: {props.account ? props.account.slice(0,8) : ""}...</h3>
            <Link to='/store'>
                <Button variant='contained' color='primary' disableElevation>
                    Store
                </Button>
            </Link>
            <Link to='/gallery'>
                <Button variant='contained' color='primary' disableElevation>
                    Gallery
                </Button>
            </Link>
            <Link to='/account'>
                <Button variant='contained' color='primary' disableElevation>
                    My Account
                </Button>
            </Link>
        </div>
    )
}

export default Navbar
