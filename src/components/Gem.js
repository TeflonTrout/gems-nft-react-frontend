import React, { useState, useEffect } from 'react'
import Truncate from 'react-truncate';
import DiamondSVG from '../images/diamond.svg';
import RubySVG from '../images/ruby.svg';
import SapphireSVG from '../images/emerald.svg';
import AmethystSVG from '../images/amethyst.svg';
import { Accordion, AccordionDetails, AccordionSummary, Button, Card } from '@material-ui/core';
import '../style.css';

const Gem = (props) => {
    const [owner, setOwner] = useState();
    const [isRare, setIsRare] = useState(false);
    const [gemType, setGemType] = useState();
    const [gemImage, setGemImage] = useState();
    const [gemCut, setGemCut] = useState();
    const [gradRed, setGradRed] = useState();
    const [gradGreen, setGradGreen] = useState();
    const [gradBlue, setGradBlue] = useState();
    const [red, setRed] = useState();
    const [green, setGreen] = useState();
    const [blue, setBlue] = useState();

    useEffect(() => { 
        setOwner(props.owner.slice(0,5))
        defineGemColor();
        defineGemCut();
        defineIsRare();
        const type = props.cutData[2]
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

    const defineIsRare = () => {
        if (props.data[0] === "1" ){
            setIsRare(true);
            const gradientRed = props.data[4]
            setGradRed(gradientRed);
            const gradientGreen = props.data[5]
            setGradGreen(gradientGreen);
            const gradientBlue = props.data[6]
            setGradBlue(gradientBlue);
        }
    }

    const defineGemColor = () => {
        const red = props.data[1];
        setRed(red);
        const green = props.data[2];
        setGreen(green);
        const blue = props.data[3];
        setBlue(blue);
    }

    const defineGemCut = () => {
        if (props.cutData[2] === "0") {
            setGemCut("Pure")
        } else if (props.cutData[2] === "1") {
            setGemCut("Great")
        } else if (props.cutData[2] === "2") {
            setGemCut("Average")
        }
    }


    return (
        <div className="gem-card">
            <Accordion style={
                isRare ? 
                {border: '5px solid gold', width: '200px', borderRadius: '15px', display: 'flex', flexDirection: 'column'}
                : 
                {width: '200px', borderRadius: '15px', display: 'flex', flexDirection: 'column'}}>
                <AccordionSummary
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <img 
                        style={
                            isRare ? {
                                background: `linear-gradient(145deg, rgba(${red},${green},${blue},1) 25%, rgba(${gradRed},${gradGreen},${gradBlue},1) 75%)`,
                                maxWidth: "200px", 
                                borderRadius: '15px', 
                                padding: "10px",
                            }
                            :{ 
                            maxWidth: "200px", 
                            borderRadius: '15px', 
                            padding: "10px", 
                            background: `rgb(${red}, ${green}, ${blue})`}} 
                        src={gemImage} 
                        alt=""
                    />
                </AccordionSummary>
                <AccordionDetails className="card-details">
                    <h1 className="gem-name" style={{ padding: '5px', textAlign: 'center' }}>{props.index}</h1>
                    <h5 className='bold'>
                        Owner: {owner}...
                    </h5>
                    {isRare ? <div><h6>Gradient: from rgb({red}, {green}, {blue}) to rgb({gradRed}, {gradGreen}, {gradBlue})</h6></div> : ""}
                    <h6>Red: {red}</h6>
                    <h6>Green: {green}</h6>
                    <h6>Blue: {blue}</h6>
                    <h6>Type: {gemType}</h6>
                    <h6>Cut: {gemCut}</h6>
                    <Button 
                        variant='contained' 
                        disableElevation>
                            Trade
                    </Button>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default Gem
