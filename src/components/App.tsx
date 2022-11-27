import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Deck from './Deck';

function App() {
    const [decks, setDecks] = useState<number[]>([40, 50])
    const [deckNum, setDeckNum] = useState<number>(40)

    return (
        <>
            {
                decks.map((d, i) => {
                    return (
                        <div style={{
                            margin: "5px",
                        }}>
                            <Deck
                                key={i}
                                num={d}
                            />
                        </div>)
                })
            }
            <label>
                DeckNum:
                <input type="number" value={deckNum} onChange={e => setDeckNum(Number(e.target.value))} />
            </label>
            <button onClick={
                () => setDecks([...decks, 40])
            }> Add </button>
        </>
    );
}

export default App;
