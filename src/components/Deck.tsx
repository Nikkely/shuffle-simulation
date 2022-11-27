import React, { useState } from 'react';
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import './Deck.css'
import Card from './Card'
import { HinduShuffle, ShotgunShuffle, FarrowShuffle, ShuffledType } from '../logics/shuffle'

type DeckProps = {
    num: number
}

type CardParams = {
    key: number
    x: number
    color: string
}

function Deck(props: DeckProps) {
    var _cards = []
    for (var i = 0; i < props.num; i++) {
        _cards.push({ key: i, x: i, color: makeGradation(i, props.num) })
    }
    const [cards, setCards] = useState<CardParams[]>(_cards)
    const reflect = (shuffle: (c: CardParams[]) => ShuffledType[]) => {
        return () => {
            cards.sort((a, b) => a.x - b.x)
            const shuffled = shuffle(cards)
            shuffled.sort((a: ShuffledType, b: ShuffledType) => a.old - b.old)
            console.log(shuffled)
            setCards(cards.map((c, i) => {
                return {
                    key: c.key,
                    x: cards[shuffled[i].new].x,
                    color: c.color
                }
            }))
        }
    }
    return (
        <div className="Deck">
            <ButtonGroup variant="contained" aria-label="shuffle pattern">
                <Button variant="outlined" onClick={reflect(HinduShuffle)}>hindu</Button>
                <Button variant="outlined" onClick={reflect(ShotgunShuffle(7))}>shotgun(7)</Button>
                <Button variant="outlined" onClick={reflect(FarrowShuffle)}>farrow</Button>
            </ButtonGroup>
            <div style={{
                margin: "10px",
            }}>
                {
                    cards.map(c => {
                        return (<Card
                            key={c.key}
                            x={c.x * 10}
                            color={c.color}
                        />)
                    })
                }</div>
        </div >
    );
}

function toColorCord(r: number, g: number, b: number): string {
    return '#'
        + r.toString(16).toUpperCase().padStart(2, "0").substring(0, 2)
        + g.toString(16).toUpperCase().padStart(2, "0").substring(0, 2)
        + b.toString(16).toUpperCase().padStart(2, "0").substring(0, 2)
}

function makeGradation(x: number, max: number): string {
    const range = (x: number) => {
        if (x < 0) return 0
        else if (x > 255) return 255
        else return Math.trunc(x)
    }
    const r = range(255 - (x * 255) / max)
    return toColorCord(r, 200, range(255 - r))
}

export default Deck;
