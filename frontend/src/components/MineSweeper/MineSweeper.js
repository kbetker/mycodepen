import React, { useEffect, useRef, useState } from "react"
import "./MineSweeper.css"
import svg003 from "./svg003.svg"
import svg002 from "./svg002.svg"
import svg001 from "./svg001.svg"

function MineSweeper() {
    const [level, setLevel] = useState(0)
    const [rows, setRows] = useState(20)
    const [columns, setColumns] = useState(20)
    const [grid, setGrid] = useState([[]])
    const [mineCount, setMineCount] = useState(0)
    const [emptyCount, setEmptyCount] = useState(0)
    const [squaresLeft, setSquaresLeft] = useState(0)
    const getRandomNum = () => Math.floor(Math.random() * 10);
    const noContextMenu = useRef()
    // const [flags, setFlags] = useState(svg001)

    useEffect(() => {
        if (squaresLeft > 0 && (squaresLeft === emptyCount)) {
            alert("Winner winner chicken dinner!")
        }
    }, [squaresLeft])



    // ======================= Initializes the grid
    function gridInit() {
        let countingEmptys = 0
        //creates new array and sets the "mines"
        let countingMines = 0
        const newArr = []
        for (let i = 0; i < rows; i++) {
            let row = []
            for (let j = 0; j < columns; j++) {
                let random = getRandomNum();
                if (random <= level) {
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
        for (let i = 0; i < newArr.length; i++) {
            for (let j = 0; j < newArr[i].length; j++) {
                let square = newArr[i][j]
                if (square === "X") continue

                let count = 0

                let NW = newArr[i - 1] ? newArr[i - 1][j - 1] : null;
                let N = newArr[i - 1] ? newArr[i - 1][j] : null;
                let NE = newArr[i - 1] ? newArr[i - 1][j + 1] : null;

                let E = newArr[i][j + 1] || null
                let W = newArr[i][j - 1] || null

                let SW = newArr[i + 1] ? newArr[i + 1][j - 1] : null
                let S = newArr[i + 1] ? newArr[i + 1][j] : null
                let SE = newArr[i + 1] ? newArr[i + 1][j + 1] : null
                let surrounding = [NW, N, NE, E, W, SW, S, SE]

                surrounding.forEach(el => el === "X" && count++)
                newArr[i][j] = count
                countingEmptys++
            }
        }
        setGrid(newArr)
        setEmptyCount(countingEmptys)
    }


    function handleStart() {
        gridInit()
    }


    //================ Counts number of non-mine squares have been checked ===============
    function countChecked() {
        let countThis = document.querySelectorAll(".checked")
        setSquaresLeft(countThis.length)
    }

    function handleBoom(e){
        let allBombs = document.querySelectorAll(".bomb")
        // console.log(allBombs)
        for(let i = 0; i < allBombs.length; i++){
            allBombs[i].style.backgroundColor = "red";
            console.log(allBombs[i])
            allBombs[i].classList.remove("bomb")
        }
    }


    //================ handles the click ===============
    function handleSquareClick(e) {
        e.preventDefault()

        let split = e.target.id.split("-")

        if (e.button === 0) {
            if (e.target.childNodes[0].innerHTML === "X") {
               handleBoom(e)
            } else if (e.target.childNodes[0].innerHTML === "0") {
                clearEmpties(split[0], split[1])
                countChecked()
            } else {
                e.target.childNodes[0].classList.remove("msHidden")
                e.target.classList.add("checked")
                countChecked()
            }
        } else if (e.button === 2) {
            if(e.target.classList.value.includes("checked"))return
            const img = e.target.childNodes[1]

            if (img.src.includes("svg001")) {
                img.src = svg002
                if(mineCount > 0){
                setMineCount(old => old -1)
                }
            } else if (img.src.includes("svg002")){
                img.src = svg003
                setMineCount(old => old + 1)
            } else {
                img.src = svg001
            }
        }
    }


    // ================ clear out the zeroes ===============
    function clearEmpties(x, y) {
        //=== edge cases and base case ===
        if (x === null || y === null || grid[x][y] !== 0) return;

        let row = parseInt(x)
        let column = parseInt(y)
        let squareDiv = document.getElementById(`${row}-${column}`)

        squareDiv.classList.add("msEmptySquare")
        squareDiv.classList.add("checked")


        let NW = document.getElementById(`${row - 1}-${column - 1}`)
        let N = document.getElementById(`${row - 1}-${column}`)
        let NE = document.getElementById(`${row - 1}-${column + 1}`)
        let W = document.getElementById(`${row}-${column - 1}`)
        let E = document.getElementById(`${row}-${column + 1}`)
        let SW = document.getElementById(`${row + 1}-${column - 1}`)
        let S = document.getElementById(`${row + 1}-${column}`)
        let SE = document.getElementById(`${row + 1}-${column + 1}`)
        let surroundingArray = [NW, N, NE, W, E, SW, S, SE]
        surroundingArray.forEach(el => el && [el.childNodes[0].classList.remove("msHidden"), el.classList.add("checked")])

        grid[row][column] = "-"

        let up = row - 1 >= 0 ? row - 1 : null
        let down = row + 1 < grid.length ? row + 1 : null
        let left = column - 1 >= 0 ? column - 1 : null
        let right = column + 1 < grid[row].length ? column + 1 : null

        clearEmpties(up, column)
        clearEmpties(down, column)
        clearEmpties(row, left)
        clearEmpties(row, right)
    }

    useEffect(() => {
        noContextMenu.current.addEventListener("contextmenu", e => e.preventDefault())
    }, [])

    const prevent_default = (e) => e.preventDefault();

    return (<div id="noContext" ref={noContextMenu}>
        <div>MineCount{mineCount}</div>
        <div>Empty Squares{emptyCount}</div>
        <div>Squares Left{squaresLeft}</div>
        {grid.map((ele, int) =>
            <div className="msRow" key={`rowKey-${int}`} onMouseDown={(e) => prevent_default(e)}>
                {ele.map((el, i) =>
                    <div
                        className="msSquare"
                        key={`squareKey-${i}`}
                        onMouseDown={(e) => handleSquareClick(e)}
                        id={`${int}-${i}`}
                    >
                        {   el === 0 ? <span className="msSquareValue msHidden">{el}</span>
                            : el === "X" ? <span className="msSquareValue bomb">{el}</span>
                            : <span className="msSquareValue msHidden" style={{color: `${
                                  el === 1 ? "#024C00"
                                : el === 2 ? "#00756D"
                                : el === 3 ? "#00194C"
                                : el === 4 ? "#1A004C"
                                : el === 5 ? "#8E0000"
                                : el === 6 ? "#B40000"
                                : el === 7 ? "#CA0000"
                                : el === 8 ? "#FF0000"
                                : ""
                            }`}}>{el}</span>
                        }
                        <img src={svg001} className="msFlag"></img>
                    </div>)}
            </div>
        )}

        <input type="number" value={level} onChange={(e) => setLevel(e.target.value)}></input>
        <button onClick={handleStart}>Start</button>
    </div>)
}

export default MineSweeper
