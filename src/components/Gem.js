import React, { useState, useEffect } from 'react'
import Truncate from 'react-truncate';
import DiamondSVG from '../images/diamond.svg';
import RubySVG from '../images/ruby.svg';
import SapphireSVG from '../images/emerald.svg';
import AmethystSVG from '../images/amethyst.svg';
import { Accordion, AccordionDetails, AccordionSummary, Button, Card } from '@material-ui/core';
import '../style.css';

const Gem = (props) => {
    const [owner, setOwner] = useState()
    const [gemType, setGemType] = useState();
    const [gemImage, setGemImage] = useState();
    const [gemCut, setGemCut] = useState();
    const [red, setRed] = useState();
    const [green, setGreen] = useState();
    const [blue, setBlue] = useState();

    useEffect(() => { 
        setOwner(props.owner.slice(0,5))
        defineGemColor();
        defineGemCut();
        const type = props.data[4]
        if (type === "0") {
            setGemType("Diamond")
            setGemImage(DiamondSVG)
            return
        } else if (type === "1") {
            setGemType("Ruby")
            setGemImage(RubySVG)
            return
        } else if (type === "2") {
            setGemType("Sapphire")
            setGemImage(SapphireSVG)
            return
        } else if (type === "3") {
            setGemType("Amethyst")
            setGemImage(AmethystSVG)
            return
        }
    }, [])

    const defineGemColor = () => {
        const red = props.data[1];
        setRed(red);
        const green = props.data[2];
        setGreen(green);
        const blue = props.data[3];
        setBlue(blue);
    }

    const defineGemCut = () => {
        if (props.data[5] === "0") {
            setGemCut("Pure")
        } else if (props.data[5] === "1") {
            setGemCut("Great")
        } else if (props.data[5] === "2") {
            setGemCut("Average")
        }
    }


    return (
        <div className="gem-card">
            <Accordion style={{width: '250px', borderRadius: '15px', display: 'flex', flexDirection: 'column'}}>
                <AccordionSummary
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <img style={{ maxWidth: "250px", justifyContent: 'center', borderRadius: '15px', padding: "10px", background: `rgb(${red}, ${green}, ${blue})`}} src={gemImage} alt=""/>
                </AccordionSummary>
                <AccordionDetails className="card-details" style={{padding: '0'}} >
                    <div style={{maxHeight: '100px', overflowY: 'scroll', marginBottom: '5px', width: '90%'}}>
                    <h1 className="gem-name" style={{ fontSize: '18px', padding: '5px', textAlign: 'center' }}>{props.data[0]}</h1>
                        <h5 className='bold'>
                            Owner: {owner}...
                        </h5>
                        <h6>Red: {red}</h6>
                        <h6>Green: {green}</h6>
                        <h6>Blue: {blue}</h6>
                        <h6>Type: {gemType}</h6>
                        <h6>Cut: {gemCut}</h6>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default Gem
