import React, { useEffect, useState } from "react"
import "./MineSweeper.css"

function MineSweeper() {
    const [level, setLevel] = useState(3)
    const [rows, setRows] = useState(10)
    const [columns, setColumns] = useState(20)
    const [grid, setGrid] = useState([[]])
    const [mineCount, setMineCount] = useState(0)
    const [emptyCount, setEmptyCount] = useState(0)
    const getRandomNum = () => Math.floor(Math.random() * 10);



    // ======================= Initializes the grid
    function gridInit(){
        //creates new array and sets the "mines"
        let countingMines = 0
        let countingEmptys = 0
        const newArr = []
        for(let i = 0; i < rows;  i++){
            let row = []
            for(let j = 0; j < columns; j++){
                let random = getRandomNum();
                if(random <= level){
                    row.push("X")
                    countingMines++
                } else {
                    row.push("-")
                }
            }
            newArr.push(row)
        }
        setMineCount(countingMines)

        //counts surrounding mines and adds number
        for(let i = 0; i< newArr.length; i++){
            for(let j = 0; j < newArr[i].length; j++){
                let square = newArr[i][j]
                if(square === "X")continue

                let count = 0

                let NW = newArr[i-1] ? newArr[i-1][j-1] : null;
                let N = newArr[i-1] ? newArr[i-1][j] : null;
                let NE = newArr[i-1] ? newArr[i-1][j+1] : null;

                let E = newArr[i][j-1] || null
                let W = newArr[i][j+1] || null

                let SW = newArr[i+1] ? newArr[i+1][j-1] : null
                let S = newArr[i+1] ? newArr[i+1][j] : null
                let SE = newArr[i+1] ? newArr[i+1][j+1] : null
                let surrounding = [NW, N, NE, E, W, SW, S, SE]

                surrounding.forEach(el => el === "X" && count++)
                newArr[i][j] = count
                countingEmptys++
            }
        }
        setGrid(newArr)
        setEmptyCount(countingEmptys)
    }


    function handleStart(){
        gridInit()
    }
    function handleSquareClick(e){
        // console.log(e.target.childNodes[0])
        if(e.target.childNodes[0].innerHTML === "X"){
            alert("Boom!")
        } else  if(e.target.childNodes[0].innerHTML === "0"){
            e.target.childNodes[0].classList.add("msEmptySquare")
            setEmptyCount(old => old - 1)
        } else {
            e.target.childNodes[0].classList.remove("msHidden")
            setEmptyCount(old => old - 1)

        }

    }



    return (<>
        <div>MineCount{mineCount}</div>
        <div>Empty Squares{emptyCount}</div>
        {grid.map((ele, int) =>
            <div className="msRow" key={`rowKey-${int}`}>
                {ele.map((el, i) =>
                <div
                className="msSquare"
                key={`squareKey-${i}`}
                onClick={(e)=>handleSquareClick(e)}
                >
                <span className="msSquareValue msHidden">{el}</span>
                </div>)}
            </div>
        )}

        <input type="number" value={level} onChange={(e)=> setLevel(e.target.value)}></input>
        <button onClick={handleStart}>Start</button>
    </>)
}

export default MineSweeper
