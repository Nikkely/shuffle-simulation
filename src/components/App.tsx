import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Deck from './Deck';

function App() {
    const [decks, setDecks] = useState<number[]>([40, 50])
    const [deckNum, setDeckNum] = useState<number>(40)

    return (
        <>
            {
                decks.map((d, i) => {
                    return (
                        <Card sx={{ minWidth: 300, m: 3 }} variant="outlined" key={i}>
                            <CardContent>
                                <Deck
                                    num={d}
                                />
                            </CardContent>
                        </Card>)
                })
            }
            <Tooltip title="シミュレータ追加">
                <Button
                    sx={{ mx: 5 }}
                    onClick={
                        () => setDecks([...decks, 1 <= Math.trunc(deckNum) && Math.trunc(deckNum) < 100 ? deckNum : 40])
                    }> Add </Button>
            </Tooltip>
            <TextField
                sx={{ mx: 5 }}
                helperText="デッキ数"
                inputProps={{ inputMode: 'numeric', pattern: '[1-9]?[0-9]' }}
                label="DeckNum"
                value={deckNum}
                onChange={e => setDeckNum(Number(e.target.value))}
            />
        </>
    );
}

export default App;
