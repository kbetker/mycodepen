import React, { useEffect, useState } from "react"
import "./MineSweeper.css"

function MineSweeper() {
    const [level, setLevel] = useState(3)
    const [rows, setRows] = useState(10)
    const [columns, setColumns] = useState(20)
    const [grid, setGrid] = useState([[]])
    const getRandomNum = () => Math.floor(Math.random() * 10);

    // ======================= Initializes the grid
    function gridInit(){
        const newArr = []
        for(let i = 0; i < rows;  i++){
            let row = []
            for(let j = 0; j < columns; j++){
                let random = getRandomNum();
                if(random <= level){
                    row.push("X")
                } else {
                    row.push("-")
                }
            }
            newArr.push(row)
        }



        for(let i = 0; i< newArr.length; i++){
            for(let j = 0; j < newArr[i].length; j++){
                let square = newArr[i][j]
                if(square === "X")continue

                let ne = newArr[i-1] ? newArr[i-1][j-1] : null

               let count = 0

                // if(newArr[i-1] && newArr[i-1][j-1]){
                    if(ne === "X"){
                        count++
                    }
                // }

                if(newArr[i-1] && newArr[i-1][j]){
                    if(newArr[i-1][j] === "X"){
                        count++
                    }
                }

                if(newArr[i-1] && newArr[i-1][j+1]){
                    if(newArr[i-1][j+1] === "X"){
                        count++
                    }
                }

                if(newArr[i][j-1]){
                    if(newArr[i][j-1] === "X"){
                        count++
                    }
                }

                if(newArr[i][j+1]){
                    if(newArr[i][j+1] === "X"){
                        count++
                    }
                }



                if(newArr[i+1] && newArr[i+1][j-1]){
                    if(newArr[i+1][j-1] === "X"){
                        count++
                    }
                }

                if(newArr[i+1] && newArr[i+1][j]){
                    if(newArr[i+1][j] === "X"){
                        count++
                    }
                }

                if(newArr[i+1] && newArr[i+1][j+1]){
                    if(newArr[i+1][j+1] === "X"){
                        count++
                    }
                }

                newArr[i][j] = count
            }
        }


        setGrid(newArr)
        // console.log(newArr)
    }


    function handleStart(){
        gridInit()
    }

    function handleSquareClick(){
        console.log("woot")
    }

    return (<>

        {grid.map((ele, int) =>
            <div className="msRow" key={`rowKey-${int}`}>
                {ele.map((el, i) =>
                <div
                className="msSquare"
                key={`squareKey-${i}`}
                onClick={(e)=>handleSquareClick(e)}
                >{el}
                </div>)}
            </div>
        )}

        <input type="number" value={level} onChange={(e)=> setLevel(e.target.value)}></input>
        <button onClick={handleStart}>Start</button>
    </>)
}

export default MineSweeper
