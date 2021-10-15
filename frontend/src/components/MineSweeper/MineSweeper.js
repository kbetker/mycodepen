import React, { useEffect, useRef, useState } from "react"
import "./MineSweeper.css"
import svg003 from "./svg003.svg"
import svg002 from "./svg002.svg"
import svg001 from "./svg001.svg"
import kaboom from "./asplode5.gif"
import kaboomSound from "./explosion.mp3"
import hole from "./hole3.png"
import interfaceSound01 from "./interface01.mp3"
import interfaceSound02 from "./interface02.mp3"
import interfaceSound03 from "./interface03.mp3"
import flagSound from "./interface04.mp3"
import qMarkSound from "./interface05.mp3"
import interfaceSound06 from "./interface06.mp3"
import successSound from "./success.mp3"
import revealedSound from "./revealed.mp3"


function MineSweeper() {
    const [level, setLevel] = useState(4)
    const [rows, setRows] = useState(20)
    const [columns, setColumns] = useState(40)
    const [grid, setGrid] = useState([[]])
    const [mineCount, setMineCount] = useState(0)
    const [emptyCount, setEmptyCount] = useState(0)
    const [squaresLeft, setSquaresLeft] = useState(0)
    const [gameOver, setGameOver] = useState(false)
    const [sqrDimensions, setSqrDimensions] = useState(30)
    const getRandomNum = (max) => Math.floor(Math.random() * max);
    const noContextMenu = useRef()
    const [shakeLeft, setShakeLeft] = useState(30)
    const [shakeTop, setShakeTop] = useState(30)
    const kaboomPlayer = useRef()
    const flagPlayer = useRef()
    const qMarkPlayer = useRef()
    // const error = useRef()
    const interface01 = useRef()
    const interface02 = useRef()
    const interface03 = useRef()
    const interface06 = useRef()
    const successPlayer = useRef()
    const revealedPlayer = useRef()

    // const [flags, setFlags] = useState(svg001)

    useEffect(() => {
        if (squaresLeft > 0 && (squaresLeft === emptyCount)) {
            setGameOver(true)
            handleWin()
        }
    }, [squaresLeft])

    // thank you MDN for this one
    function randomMinMax(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }



    async function handleWin(){
        setGameOver(true)
        // successPlayer.current.playbackRate = 2
        // kaboomPlayer.current.volume = 0.5
        successPlayer.current.play()

         //====== randomly reveals all other bombs ===========
        let allBombs = document.querySelectorAll(".bomb")
        let arrayCount = []
        for(let i = 0; i < allBombs.length; i++){arrayCount.push(i)}


        const remove = (i) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    revealedPlayer.current.currentTime = 0
                    allBombs[i].innerHTML = ""
                    allBombs[i].classList.remove("bomb")
                    allBombs[i].nextSibling.classList.remove("clockwise")
                    // allBombs[i].nextSibling.src = hole
                    allBombs[i].classList.add("white")
                    allBombs[i].nextSibling.src = svg001
                    // revealedPlayer.current.playbackRate = 2
                    // revealedPlayer.current.volume = 0.5
                    revealedPlayer.current.play()
                    setTimeout(()=>{ allBombs[i].nextSibling.nextSibling.src = svg001 }, 500)
                    // shakeIt()
                    resolve();
                }, randomMinMax(500, 700));
            });
        }
          while(arrayCount.length > 0){
              let int = getRandomNum(arrayCount.length)
              let num = arrayCount.splice(int, 1)
              await remove(num)
          }
    }

    // ======================= Initializes the grid
    function gridInit() {
        let countingEmptys = 0
        //creates new array and sets the "mines"
        let countingMines = 0
        const newArr = []
        for (let i = 0; i < rows; i++) {
            let row = []
            for (let j = 0; j < columns; j++) {
                let random = getRandomNum(100);
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


    async function shakeIt(){
        let min = -5
        let max = 5

        const shake = () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    let leftRand = randomMinMax(min, max)
                    let topRand = randomMinMax(min, max)
                    setShakeLeft(30 + leftRand)
                    setShakeTop(30 + topRand)
                    resolve();
                }, 20);
            });
        }
        for(let i = 0; i < 5; i++){
            await shake()
            min += 1
            max -= 1
        }
        setShakeLeft(30)
        setShakeTop(30)
    }


    //============================   KABOOM!!!!!!  ===========================
    async function handleBoom(e){
       setGameOver(true)
        //====== explode the first bomb clicked ===========
        // console.log( e.target.childNodes[1].classList)
        e.target.childNodes[0].innerHTML = ""
        e.target.childNodes[0].classList.remove("bomb")
        e.target.childNodes[1].classList.remove("clockwise")
        e.target.childNodes[2].src = kaboom
        kaboomPlayer.current.playbackRate = 2
        kaboomPlayer.current.volume = 0.5
        kaboomPlayer.current.play()

        setTimeout(()=>{  e.target.childNodes[2].src = svg001;  e.target.childNodes[1].src = hole }, 450)
        shakeIt()


         //====== randomly explodes all other bombs ===========
        let allBombs = document.querySelectorAll(".bomb")
        let arrayCount = []
        for(let i = 0; i < allBombs.length; i++){arrayCount.push(i)}


        const remove = (i) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    kaboomPlayer.current.currentTime = 0
                    allBombs[i].innerHTML = ""
                    allBombs[i].classList.remove("bomb")
                    allBombs[i].nextSibling.classList.remove("clockwise")
                    allBombs[i].nextSibling.src = hole
                    allBombs[i].nextSibling.nextSibling.src = kaboom
                    kaboomPlayer.current.playbackRate = 2
                    kaboomPlayer.current.volume = 0.5
                    kaboomPlayer.current.play()
                    setTimeout(()=>{ allBombs[i].nextSibling.nextSibling.src = svg001 }, 700)
                    shakeIt()
                    resolve();
                }, randomMinMax(700, 900));
            });
        }
          while(arrayCount.length > 0){
              let int = getRandomNum(arrayCount.length)
              let num = arrayCount.splice(int, 1)
              await remove(num)
          }
    }


    //================ handles the click ===============
    function handleSquareClick(e) {
        e.preventDefault()
        if(gameOver)return;
        if(!e.target.className.includes("msSquare"))return
        const img = e.target.childNodes[1]

        let split = e.target.id.split("-")

        // handles left click
        if (e.button === 0) {
        if (e.target.childNodes[0].innerHTML === "X") {
               handleBoom(e)
            } else if (e.target.childNodes[0].innerHTML === "0") {
                interface02.current.currentTime = 0
                interface02.current.play()
                clearEmpties(split[0], split[1])
                countChecked()
            } else {
                flagPlayer.current.currentTime = 0
                flagPlayer.current.play()
                e.target.childNodes[0].classList.remove("msHidden")
                e.target.classList.add("checked")
                e.target.classList.add("msEmptySquare")
                if (img.src.includes("svg002")) {
                        img.src = svg001
                        setMineCount(old => old + 1)
                } else {
                    img.src = svg001
                }

                countChecked()
            }
        // handles right click
        } else if (e.button === 2) {
            if(e.target.classList.value.includes("checked"))return
            interface03.current.volume = 0.3
            interface03.current.currentTime = 0
            interface03.current.play()

            if (img.src.includes("svg001")) {
                if(mineCount > 0){
                    img.src = svg002
                    setMineCount(old => old -1)
                } else {
                    img.src = svg003
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

        // img.src.includes("svg002)"
        squareDiv.classList.add("msEmptySquare")
        squareDiv.classList.add("checked")
        // squareDiv.style.backgroundColor = "#000000"

        let clearFlag = (el) =>{
            if(el.childNodes[1].src.includes("svg002")){
                el.childNodes[1].src = svg001
                setMineCount(old => old + 1)
            } else {
                el.childNodes[1].src = svg001
            }
        }
        clearFlag(squareDiv)
        // console.log(squareDiv.childNodes[1].src.includes("svg002"))

        let N = document.getElementById(`${row - 1}-${column}`)
        let W = document.getElementById(`${row}-${column - 1}`)
        let E = document.getElementById(`${row}-${column + 1}`)
        let S = document.getElementById(`${row + 1}-${column}`)
        // let NW = document.getElementById(`${row - 1}-${column - 1}`)
        // let NE = document.getElementById(`${row - 1}-${column + 1}`)
        // let SW = document.getElementById(`${row + 1}-${column - 1}`)
        // let SE = document.getElementById(`${row + 1}-${column + 1}`)
        // let surroundingArray = [NW, N, NE, W, E, SW, S, SE]
        let surroundingArray = [N, W, E, S]


        surroundingArray.forEach(el =>
            (el && el.childNodes[0].innerHTML !== "0") && [
                el.childNodes[0].classList.remove("msHidden"),
                el.classList.add("msEmptySquare"),
                el.classList.add("checked"),
                clearFlag(el)
            ])

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

    function randoColor(e){
        // console.log( e.target.parentElement.style.backgroundColor)
        // console.log(e.target.parentElement.className)
       if(e.target.parentElement.className.includes("checked")){
        e.target.parentElement.style.backgroundColor = `rgb(0, 0, ${randomMinMax(50, 100)})`
       } else {
        e.target.parentElement.style.backgroundColor = `rgb(0, 0, ${randomMinMax(180, 255)})`
       }
        // return randomMinMax(100, 255)
    }

    useEffect(() => {
        noContextMenu.current.addEventListener("contextmenu", e => e.preventDefault())
    }, [])

    const prevent_default = (e) => e.preventDefault();

    return (<div id="noContext" ref={noContextMenu} style={{left: `${shakeLeft}px`, top: `${shakeTop}px`}}>
        <div className="stats">
        <div>MineCount <span className="statNums">{mineCount}</span></div>
        {/* <div>Empty Squares  <span className="statNums">{emptyCount}</span></div>
        <div>Squares Left  <span className="statNums">{squaresLeft}</span></div> */}
        </div>
        {grid.map((ele, int) =>
            <div className="msRow" key={`rowKey-${int}`} onMouseDown={(e) => prevent_default(e)}>
                {ele.map((el, i) =>
                    <div
                        className="msSquare"
                        key={`squareKey-${i}`}
                        onMouseDown={(e) => handleSquareClick(e)}
                        id={`${int}-${i}`}
                        wat="true"
                        style={{
                            width: `${sqrDimensions}px`,
                            height: `${sqrDimensions}px`,
                            // backgroundColor: `rgb(0, 0, ${randoColor()})`
                        }}
                        onLoad={(e)=>randoColor(e)}
                    >
                        {   el === 0 ? <span className="msSquareValue msHidden">{el}</span>
                            : el === "X" ? <span className="msSquareValue bomb">{el}</span>
                            : <span className="msSquareValue msHidden" style={{color: `${
                                  el === 1 ? "#888800"
                                : el === 2 ? "#AA66AA"
                                : el === 3 ? "#008888"
                                : el === 4 ? "#888888"
                                : el === 5 ? "#FF00FF"
                                : el === 6 ? "#00FFFF"
                                : el === 7 ? "#FFFF00"
                                : el === 8 ? "#FFFFFF"
                                : ""
                            }`}}>{el}</span>
                        }
                        <img src={svg001} className="msFlag clockwise"></img>
                        <img src={svg001} className="kaboom"></img>
                    </div>)}
            </div>
        )}

        <input type="number" value={level} onChange={(e) => setLevel(e.target.value)}></input>
        <button onClick={handleStart}>Start</button>
        <audio ref={kaboomPlayer} src={kaboomSound} type="audio/mpeg"></audio>
        <audio ref={flagPlayer} src={flagSound} type="audio/mpeg"></audio>
        <audio ref={qMarkPlayer} src={qMarkSound} type="audio/mpeg"></audio>
        <audio ref={interface01} src={interfaceSound01} type="audio/mpeg"></audio>
        <audio ref={interface02} src={interfaceSound02} type="audio/mpeg"></audio>
        <audio ref={interface03} src={interfaceSound03} type="audio/mpeg"></audio>
        <audio ref={interface06} src={interfaceSound06} type="audio/mpeg"></audio>
        <audio ref={successPlayer} src={successSound} type="audio/mpeg"></audio>
        <audio ref={revealedPlayer} src={revealedSound} type="audio/mpeg"></audio>
    </div>)
}

export default MineSweeper
