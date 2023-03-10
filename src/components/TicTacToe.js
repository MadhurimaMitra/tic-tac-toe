import React, { useState } from 'react'

export default function TicTacToe() {
    const [symbol, setSymbol] = useState('X')
    const [cells, setCells] = useState(Array(9).fill(''))
    const [turn, setTurn] = useState('Player 1')
    const [winner, setWinner] = useState('')

    function handleClick(index) {
        let squares = [...cells]
        if (squares[index])
            return;
        if (symbol === 'X') {
            setTurn('Player 2')
            squares[index] = 'X'
            setSymbol('O')
        }
        else {
            setTurn('Player 1')
            squares[index] = 'O'
            setSymbol('X')
        }
        setCells(squares)
        checkForWinner(squares)
    }

    function checkForWinner(squares) {
        let combos = [
            [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8]
            ],
            [
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8]
            ],
            [
                [0, 4, 8],
                [2, 4, 6]
            ]
        ]
        for (let combo in combos) {
            combos[combo].forEach(pattern => {
                if (
                    squares[pattern[0]] && 
                    squares[pattern[0]] === squares[pattern[1]] &&
                    squares[pattern[0]] === squares[pattern[2]]
                ) {
                    setWinner(squares[pattern[0]])
                    setTurn('')
                }

            });
        }
        return null;
    }
    
    function Cell({ index }) {
        return (
            <div className="cell" onClick={() => handleClick(index)}>
                {cells[index]}
            </div>
        )
    }
    return (
        <div className='grid'>
            <div className='heading'>
                TIC TAC TOE
            </div>
            <div className='players'>
                <div className='one'>Player 1-<span className='x'>X</span></div>
                <div className='two'>Player 2-<span className='o'>O</span></div>
            </div>
            {winner && winner === 'X' && (
                <>
                    <div> {`Player 1 wins!`} </div>
                </>
            )}
            {winner && winner === 'O' && (
                <>
                    <div> {`Player 2 wins!`} </div>
                </>
            )}
            {turn}
            <div className="row row1">
                <Cell index={0} />
                <Cell index={1} />
                <Cell index={2} />
            </div>
            <div className="row row2">
                <Cell index={3} />
                <Cell index={4} />
                <Cell index={5} />
            </div>
            <div className="row row3">
                <Cell index={6} />
                <Cell index={7} />
                <Cell index={8} />
            </div>
        </div>
    )
}