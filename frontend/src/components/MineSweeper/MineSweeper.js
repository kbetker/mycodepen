import React, { useEffect, useState } from "react"
import "./MineSweeper.css"

function MineSweeper() {
    const [level, setLevel] = useState(0)
    const [rows, setRows] = useState(20)
    const [columns, setColumns] = useState(20)
    const [grid, setGrid] = useState([[]])
    const [mineCount, setMineCount] = useState(0)
    const [emptyCount, setEmptyCount] = useState(0)
    const getRandomNum = () => Math.floor(Math.random() * 10);



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


    //================ handles the click ===============
    function handleSquareClick(e) {
        // console.log(e.target.childNodes[0])
        let split = e.target.id.split("-")

        if (e.target.childNodes[0].innerHTML === "X") {
            alert("Boom!")
        } else if (e.target.childNodes[0].innerHTML === "0") {

            clearEmpties(split[0], split[1])
            countChecked()

        } else {
            e.target.childNodes[0].classList.remove("msHidden")
            e.target.childNodes[0].classList.add("checked")
            countChecked()
        }
    }

    function countChecked() {
        let countThis = document.querySelectorAll(".checked")
        setEmptyCount(countThis.length)
        console.log(countThis.length)
    }

    useEffect(()=>{
        countChecked()
    },[clearEmpties])

    // ================ clear out the zeroes ===============
    function clearEmpties(x, y) {
        //=== edge cases and base case ===
        if (x === null || y === null || grid[x][y] !== 0) return;


        // if(grid[x][y] !== 0){
        //     setEmptyCount(old => old - 1)
        //     return
        // }

        let row = parseInt(x)
        let column = parseInt(y)
        // msHidden
        // console.log(row,column)
        // childNodes[0].

        document.getElementById(`${row}-${column}`).classList.add("msEmptySquare")
        document.getElementById(`${row}-${column}`).classList.add("checked")

        let NW = document.getElementById(`${row - 1}-${column - 1}`)
        let N = document.getElementById(`${row - 1}-${column}`)
        let NE = document.getElementById(`${row - 1}-${column + 1}`)
        let W = document.getElementById(`${row}-${column - 1}`)
        let E = document.getElementById(`${row}-${column + 1}`)
        let SW = document.getElementById(`${row + 1}-${column - 1}`)
        let S = document.getElementById(`${row + 1}-${column}`)
        let SE = document.getElementById(`${row + 1}-${column + 1}`)
        let surroundingArray = [NW, N, NE, W, E, SW, S, SE]
        surroundingArray.forEach(el => el && [el.childNodes[0].classList.remove("msHidden"), el.childNodes[0].classList.add("checked")])

        // e.target.childNodes[0].classList.add("msEmptySquare")
        grid[row][column] = "-"
        // setEmptyCount(old => old - 1)


        let up = row - 1 >= 0 ? row - 1 : null
        let down = row + 1 < grid.length ? row + 1 : null
        let left = column - 1 >= 0 ? column - 1 : null
        let right = column + 1 < grid[row].length ? column + 1 : null

        clearEmpties(up, column)
        clearEmpties(down, column)
        clearEmpties(row, left)
        clearEmpties(row, right)
        // return newArr
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
                        onClick={(e) => handleSquareClick(e)}
                        id={`${int}-${i}`}
                    >
                        {el === 0 ? <span className="msSquareValue msHidden">{el}</span>
                            : el === "X" ? <span className="msSquareValue red">{el}</span>
                                : <span className="msSquareValue msHidden">{el}</span>
                        }

                    </div>)}
            </div>
        )}

        <input type="number" value={level} onChange={(e) => setLevel(e.target.value)}></input>
        <button onClick={handleStart}>Start</button>
    </>)
}

export default MineSweeper
