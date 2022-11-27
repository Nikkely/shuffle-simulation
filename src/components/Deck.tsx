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
    const [history, setHistory] = useState<string[]>([])
    const reflect = (name: string, shuffle: (c: CardParams[]) => ShuffledType[]) => {
        return () => {
            setHistory([...history, name])
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
                <Button variant="outlined" onClick={reflect("Hindu", HinduShuffle)}>hindu</Button>
                <Button variant="outlined" onClick={reflect("Shotgun", ShotgunShuffle(7))}>shotgun(7)</Button>
                <Button variant="outlined" onClick={reflect("Farrow", FarrowShuffle)}>farrow</Button>
            </ButtonGroup>
            <div style={{
                height: "30px",
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
            <p> 
                {displayHistory(history)}
            </p>
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

function displayHistory(history: string[]): string {
    if (history.length == 0) {
        return "not shuffled yet"
    }

    const work: string[] = []
    var counter = 1
    for (var i: number = 0; i < history.length - 1; i++) {
        if (history[i] !== history[i + 1]) {
            work.push(history[i] + " x" + String(counter))
            counter = 0
        }
        counter++
    }
    work.push(history[history.length-1] + " x" + String(counter))
    return work.join(" > ")
}

export default Deck;
