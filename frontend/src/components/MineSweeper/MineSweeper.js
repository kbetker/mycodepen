import React, { useEffect, useRef, useState } from "react"
import "./MineSweeper.css"
import svg003 from "./svg003.svg"
import svg002 from "./svg002.svg"
import svg001 from "./svg001.svg"
import kaboom from "./asplode5.gif"
import kaboomSound from "./explosion.mp3"
import hole from "./hole4.png"
import interfaceSound01 from "./interface01.mp3"
import interfaceSound02 from "./interface02.mp3"
import interfaceSound03 from "./interface03.mp3"
import flagSound from "./interface04.mp3"
import qMarkSound from "./interface05.mp3"
import interfaceSound06 from "./interface06.mp3"
import successSound from "./success.mp3"
import revealedSound from "./revealed.mp3"
// import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import screenshot from './screenshot.png'

// import {conf}
// import pop from "./pop.svg"

let breakLoop = false

function MineSweeper() {


    // const [level, setLevel] = useState(4)
    const [rows, setRows] = useState(20)
    const [columns, setColumns] = useState(30)
    const [grid, setGrid] = useState([[]])
    const [mineCount, setMineCount] = useState(0)
    const [emptyCount, setEmptyCount] = useState(0)
    const [squaresLeft, setSquaresLeft] = useState(0)
    const [gameOver, setGameOver] = useState(false)
    const [gameStart, setGameStart] = useState(false)
    const [sqrDimensions, setSqrDimensions] = useState(30)
    const [shakeLeft, setShakeLeft] = useState(30)
    const [shakeTop, setShakeTop] = useState(30)
    const [confettiPieces, setConfettiPieces] = useState(0)
    const [confettiX, setConfettiX] = useState(100)
    const [confettiY, setConfettiY] = useState(100)
    const [activeLevel, setActiveLevel] = useState("")
    const [hint, setHint] = useState([])
    const [giveHint, setGiveHint] = useState(false)
    const [instructions, setInstructions] = useState(false)

    const noContextMenu = useRef()
    const flashEffect = useRef()
    const gameWrapper = useRef()
    // let breakLoop = useRef(false)

    // sound effects/players
    const kaboomPlayer = useRef()
    const flagPlayer = useRef()
    const qMarkPlayer = useRef()
    const interface01 = useRef()
    const interface02 = useRef()
    const interface03 = useRef()
    const interface06 = useRef()
    const successPlayer = useRef()
    const revealedPlayer = useRef()

    const getRandomNum = (max) => Math.floor(Math.random() * max);
    // const { width, height } = useWindowSize()

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



    async function handleWin() {
        setGameOver(true)
        successPlayer.current.play()

        //====== randomly reveals all other bombs ===========
        let allBombs = document.querySelectorAll(".bomb")
        let arrayCount = []
        for (let i = 0; i < allBombs.length; i++) { arrayCount.push(i) }


        const remove = (i) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    revealedPlayer.current.currentTime = 0
                    allBombs[i].innerHTML = ""
                    allBombs[i].classList.remove("bomb")
                    allBombs[i].nextSibling.classList.remove("clockwise")
                    // allBombs[i].nextSibling.src = hole
                    allBombs[i].classList.add("white")
                    allBombs[i].parentElement.classList.add("whiteOuter")
                    allBombs[i].nextSibling.src = svg001
                    // revealedPlayer.current.playbackRate = 2
                    // revealedPlayer.current.volume = 0.5
                    let newAudio = revealedPlayer.current.cloneNode()
                    newAudio.play()
                    setTimeout(() => { allBombs[i].nextSibling.nextSibling.src = svg001 }, 500)
                    // shakeIt()
                    resolve();
                }, randomMinMax(100, 700));
            });
        }
        while (arrayCount.length > 0) {
            if(breakLoop)break;
            let int = getRandomNum(arrayCount.length)
            let num = arrayCount.splice(int, 1)
            await remove(num)
        }
    }

    // ======================= Initializes the grid
    function gridInit() {
        let countingEmptys = 0

        const newArr = []
        const newArrForX = []
        let hintArray = []
        let lowestCount = Infinity
        breakLoop = false

        //initiates array
        for (let i = 0; i < rows; i++) {
            let row = []
            for (let j = 0; j < columns; j++) {
                row.push("-")
                newArrForX.push([i, j])
            }
            newArr.push(row)
        }

        //randomly places an 'X'
        for (let i = 0; i < mineCount; i++) {
            let randNum = randomMinMax(0, newArrForX.length - 1)
            let index = newArrForX.splice(randNum, 1)
            newArr[index[0][0]][index[0][1]] = "X"
        }

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

                if(count < lowestCount){
                    hintArray=[]
                    lowestCount = count
                }
                if(count <= lowestCount){
                    hintArray.push([i,j, `Count:${count}`])
                }

                countingEmptys++
            }
        }
        setGrid(newArr)
        setEmptyCount(countingEmptys)
        setHint(hintArray)
    }

    useEffect(()=>{
        let hintId = hint[randomMinMax(0, hint.length - 1)]
            if(hintId && giveHint){
                let hintDiv = document.getElementById(`${hintId[0]}-${hintId[1]}`)
                hintDiv.childNodes[0].classList.remove("msHidden")
                hintDiv.childNodes[0].classList.add("hint")
                hintDiv.classList.add("hint")
                // hintDiv.childNodes[0].style.color = "#FFFFFF"
                // hintDiv.childNodes[0].style.textShadow
            }
    },[hint])


    function handleStart() {
        gridInit()
        setGameStart(true)
    }


    //================ Counts number of non-mine squares have been checked ===============
    function countChecked() {
        let countThis = document.querySelectorAll(".checked")
        setSquaresLeft(countThis.length)
    }


    //================ Shakes the screen - unfortunately it did not perform well with confetti. ===============
    // async function shakeIt() {
    //     let min = -5
    //     let max = 5

    //     const shake = () => {
    //         return new Promise((resolve) => {
    //             setTimeout(() => {
    //                 let leftRand = randomMinMax(min, max)
    //                 let topRand = randomMinMax(min, max)
    //                 setShakeLeft(30 + leftRand)
    //                 setShakeTop(30 + topRand)
    //                 resolve();
    //             }, 20);
    //         });
    //     }
    //     for (let i = 0; i < 5; i++) {
    //         await shake()
    //         min += 1
    //         max -= 1
    //     }
    //     setShakeLeft(30)
    //     setShakeTop(30)
    // }


    //============================   KABOOM!!!!!!  ===========================
    async function handleBoom(e) {
        setGameOver(true)
        e.target.childNodes[0].style.opacity = "1"
        interface01.current.play()

        setTimeout(() => {
            asplodeAllBombs()
        }, 1000);
    }




    //====== randomly explodes all other bombs ===========
    async function asplodeAllBombs() {
        let allBombs = document.querySelectorAll(".bomb")
        let arrayCount = []
        for (let i = 0; i < allBombs.length; i++) { arrayCount.push(i) }


        const remove = (i) => {
            return new Promise((resolve) => {
               let wat = setTimeout(async () => {
                    let coordinates = allBombs[i].getBoundingClientRect();
                    setConfettiX(coordinates.left)
                    setConfettiY(coordinates.top)
                    kaboomPlayer.current.currentTime = 0
                    allBombs[i].innerHTML = ""

                    allBombs[i].parentElement.classList.remove("msSquare")

                    allBombs[i].parentElement.classList.add("bombed")
                    flashEffect.current.classList.add("flash")
                    allBombs[i].classList.remove("bomb")
                    allBombs[i].nextSibling.classList.remove("clockwise")
                    allBombs[i].nextSibling.src = svg001
                    allBombs[i].nextSibling.nextSibling.src = hole
                    kaboomPlayer.current.playbackRate = 2
                    kaboomPlayer.current.volume = 0.5
                    kaboomPlayer.current.play()
                    setConfettiPieces(140)
                    allBombs[i].nextSibling.nextSibling.classList.add("bombFlash")
                    // if(!gameOver) clearTimeout(wat);
                    setTimeout(() => {
                        //    setConfettiPieces(0)
                        allBombs[i].nextSibling.nextSibling.classList.remove("bombFlash")
                        allBombs[i].nextSibling.nextSibling.classList.add("holeSized")
                        flashEffect.current.classList.remove("flash")
                    }, 50)
                    //    shakeIt()
                    resolve();
                }, randomMinMax(20, 400));
            });
        }
        while (arrayCount.length > 0) {
            if(breakLoop)break
            let int = getRandomNum(arrayCount.length)
            let num = arrayCount.splice(int, 1)
            await remove(num)
        }
        if(!breakLoop){ gameWrapper.current.classList.add("endGame")
        }
        setConfettiPieces(0)
    }


    //================ handles the click ===============
    async function handleSquareClick(e) {
        e.preventDefault()
        if (gameOver) return;
        if (!e.target.className.includes("msSquare")) return
        const img = e.target.childNodes[1]
        let split = e.target.id.split("-")



        // handles left click
        if (e.button === 0) {
            // ingores if flagged
            if(img.src.includes("svg002") || img.src.includes("svg003")) return;

            if (e.target.childNodes[0].innerHTML === "X") {
                await setConfettiX(e.clientX)
                await setConfettiY(e.clientY)
                await handleBoom(e)
            } else if (e.target.childNodes[0].innerHTML === "0") {
                e.target.childNodes[0].classList.remove("hint")
                e.target.classList.remove("hint")
                interface02.current.currentTime = 0
                interface02.current.play()
                clearEmpties(split[0], split[1])
                countChecked()
            } else {
                flagPlayer.current.currentTime = 0
                flagPlayer.current.play()
                e.target.childNodes[0].classList.remove("msHidden")
                e.target.childNodes[0].classList.remove("hint")
                e.target.classList.remove("hint")

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
            if (e.target.classList.value.includes("checked")) return
            qMarkPlayer.current.currentTime = 0
            qMarkPlayer.current.play()

            if (img.src.includes("svg001")) {
                if (mineCount > 0) {
                    img.src = svg002
                    setMineCount(old => old - 1)
                } else {
                    img.src = svg003
                }
            } else if (img.src.includes("svg002")) {
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

        let clearFlag = (el) => {
            if (el.childNodes[1].src.includes("svg002")) {
                el.childNodes[1].src = svg001
                setMineCount(old => old + 1)
            } else {
                el.childNodes[1].src = svg001
            }
        }
        clearFlag(squareDiv)

        let N = document.getElementById(`${row - 1}-${column}`)
        let W = document.getElementById(`${row}-${column - 1}`)
        let E = document.getElementById(`${row}-${column + 1}`)
        let S = document.getElementById(`${row + 1}-${column}`)
        let NW = document.getElementById(`${row - 1}-${column - 1}`)
        let NE = document.getElementById(`${row - 1}-${column + 1}`)
        let SW = document.getElementById(`${row + 1}-${column - 1}`)
        let SE = document.getElementById(`${row + 1}-${column + 1}`)
        let surroundingArray = [NW, N, NE, W, E, SW, S, SE]
        // let surroundingArray = [N, W, E, S]

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

    // creates a random background color
    function randomColor(e) {
        let theClassName = e.target.parentElement.className
        if (theClassName.includes("checked") || theClassName.includes("bombed")) {
            e.target.parentElement.style.backgroundColor = `rgb(0, 0, ${randomMinMax(50, 100)})`
        } else {
            e.target.parentElement.style.backgroundColor = `rgb(0, 0, ${randomMinMax(180, 255)})`
        }
    }


    // when clicking in between the squares - this prevents its default behavior
    const prevent_default = (e) => e.preventDefault();

    // resets a bunch of stuff to start a new game
    function handleNewGame(){
        setMineCount(0)
        setRows(0)
        setColumns(0)
        setSqrDimensions(30)
        setConfettiPieces(0)
        setGameOver(false)
        setGameStart(false)
        setActiveLevel("")
        setGrid([[]])
        setGiveHint(false)
        breakLoop = true
        gameWrapper.current.classList.remove("endGame")
    }

    // gives an initial hint





    // disables default of right clicking
    useEffect(() => {
        noContextMenu.current.addEventListener("contextmenu", e => e.preventDefault())
    }, [])

    return (
        <div ref={flashEffect} className="flashEffect">
            <div ref={gameWrapper} className="gameWrapper">
                <Confetti
                    numberOfPieces={confettiPieces}
                    confettiSource={{ x: confettiX, y: confettiY, w: 30, h: 30 }}
                    colors={["#9999FF"]}
                    initialVelocityX={{ min: -10, max: 10 }}
                    initialVelocityY={{ min: -10, max: 10 }}
                    drawShape={ctx => {
                        ctx.beginPath()
                        ctx.lineTo(0, 0);
                        ctx.moveTo(0, 0)
                        ctx.lineTo(0, 3);
                        ctx.moveTo(0, 3)
                        ctx.lineTo(3, 3);
                        ctx.moveTo(3, 3)
                        ctx.lineTo(3, 0);
                        ctx.moveTo(3, 0);
                        ctx.lineTo(0, 0);
                        ctx.lineWidth = 3;
                        ctx.stroke();
                        ctx.closePath()
                    }}
                    className="changeColor"
                />


                <div id="noContext" className="changeColor" ref={noContextMenu} style={{ left: `${shakeLeft}px`, top: `${shakeTop}px` }}>
                    <div className="stats">
                        <div className="mineCount"><img src={svg002} className="mineCountImg"></img> <span className="statNums">{mineCount}</span></div>
                        {/* <div>Empty Squares  <span className="statNums">{emptyCount}</span></div>
        <div>Squares Left  <span className="statNums">{squaresLeft}</span></div> */}
                    </div>

                    {(!gameStart && !gameOver) &&
                        <div className="instructions">
                            <div className="gameTitle">Minesweeper</div>

                            {!instructions && <div className="instructionsTitle" onClick={()=>setInstructions(true)}>+ Instructions</div>}
                            {instructions &&
                            <>
                            <div className="instructionsTitle" onClick={()=>setInstructions(false)}>- Instructions</div>




                            <p>To win the game, you must click on all the squares that do not contain mines. Each number represents the number of mines that are directly adjacent to that number.</p>
                            <img src={screenshot} className="screenshot"></img>

                            <p>Right clicking a square will place a marker designating it as a square you beleive to house a mine. You must still click all non-mine squares to win even when all markers have been placed. Right click again to change it to a question mark and once more to change back to unmarked.</p>

                            <div></div>
                            </>}
                            <div style={{textAlign: "center"}}><span className="warning">EPILEPSY WARNING!</span><div>This game uses bright flashing lights</div></div>
                            </div>

                    }
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
                                        // backgroundColor: `rgb(0, 0, ${randomColor()})`
                                    }}
                                    onLoad={(e) => randomColor(e)}
                                >
                                    {el === 0 ? <span className="msSquareValue msHidden">{el}</span>
                                        : el === "X" ? <span className="msSquareValue bomb">{el}</span>
                                            : <span className="msSquareValue msHidden" style={{
                                                color: `${el === 1 ? "#888800"
                                                    : el === 2 ? "#AA66AA"
                                                        : el === 3 ? "#008888"
                                                            : el === 4 ? "#888888"
                                                                : el === 5 ? "#FF00FF"
                                                                    : el === 6 ? "#00FFFF"
                                                                        : el === 7 ? "#FFFF00"
                                                                            : el === 8 ? "#FFFFFF"
                                                                                : ""
                                                    }`
                                            }}>{el}</span>
                                    }
                                    <img src={svg001} className="msFlag clockwise" style={{ width: `${sqrDimensions - 5}px` }}></img>
                                    <img src={svg001} className="kaboom"></img>
                                </div>)}
                        </div>
                    )}


                    {!gameStart &&
                    <div className="levelSelect">
                        Select a level =&gt;
                        <button className={`lvlSelect ${activeLevel === "level1" && "lvlSelectActive"}`} id="level1" onClick={(e) =>
                            [
                                setMineCount(10),
                                setRows(10),
                                setColumns(15),
                                setSqrDimensions(60),
                                setActiveLevel(e.target.id)
                            ]
                        }>level 1
                        </button>

                        <button className={`lvlSelect ${activeLevel === "level2" && "lvlSelectActive"}`} id="level2" onClick={(e) =>
                            [
                                setMineCount(20),
                                setRows(15),
                                setColumns(20),
                                setSqrDimensions(45),
                                setActiveLevel(e.target.id)
                            ]
                        }>level 2
                        </button>

                        <button className={`lvlSelect ${activeLevel === "level3" && "lvlSelectActive"}`} id="level3" onClick={(e) =>
                            [
                                setMineCount(30),
                                setRows(20),
                                setColumns(25),
                                setSqrDimensions(36),
                                setActiveLevel(e.target.id)
                            ]
                        }>level 3
                        </button>

                        <button className={`lvlSelect ${activeLevel === "level4" && "lvlSelectActive"}`} id="level4" onClick={(e) =>
                            [
                                setMineCount(40),
                                setRows(20),
                                setColumns(30),
                                setSqrDimensions(30),
                                setActiveLevel(e.target.id)
                            ]
                        }>level 4
                        </button>

                        <button className={`lvlSelect ${activeLevel === "level5" && "lvlSelectActive"}`} id="level5" onClick={(e) =>
                            [
                                setMineCount(60),
                                setRows(20),
                                setColumns(30),
                                setSqrDimensions(30),
                                setActiveLevel(e.target.id)
                            ]
                        }>level 5
                        </button>

                        <button className={`lvlSelect ${activeLevel === "level6" && "lvlSelectActive"}`} id="level6" onClick={(e) =>
                            [
                                setMineCount(100),
                                setRows(20),
                                setColumns(30),
                                setSqrDimensions(30),
                                setActiveLevel(e.target.id)
                            ]
                        }>level 6
                        </button>


                        <button className={`lvlSelect ${activeLevel === "level7" && "lvlSelectActive"}`} id="level7" onClick={(e) =>
                            [
                                setMineCount(150),
                                setRows(20),
                                setColumns(30),
                                setSqrDimensions(30),
                                setActiveLevel(e.target.id)
                            ]
                        }>level 7
                        </button>

                        <button className={`lvlSelect ${activeLevel === "level8" && "lvlSelectActive"}`} id="level8" onClick={(e) =>
                            [
                                setMineCount(250),
                                setRows(20),
                                setColumns(30),
                                setSqrDimensions(30),
                                setActiveLevel(e.target.id)
                            ]
                        }>level 8
                        </button>

                        <button className={`lvlSelect ${activeLevel === "level9" && "lvlSelectActive"}`} id="level9" onClick={(e) =>
                            [
                                setMineCount(400),
                                setRows(20),
                                setColumns(30),
                                setSqrDimensions(30),
                                setActiveLevel(e.target.id)
                            ]
                        }>level 9
                        </button>
                        { (mineCount > 0 && !gameStart) && <>
                        <button className="startGame" onClick={handleStart}>Start Game</button>
                        <input type="checkbox" value={giveHint} onChange={(e) => setGiveHint(e.target.checked)}></input>Starting Hint?
                        </>
                        }
                    </div>}

                    { gameOver && <button className="newGame" onClick={handleNewGame}>New Game</button>}

                    <audio ref={kaboomPlayer} src={kaboomSound} type="audio/mpeg"></audio>
                    <audio ref={flagPlayer} src={flagSound} type="audio/mpeg"></audio>
                    <audio ref={qMarkPlayer} src={qMarkSound} type="audio/mpeg"></audio>
                    <audio ref={interface01} src={interfaceSound01} type="audio/mpeg"></audio>
                    <audio ref={interface02} src={interfaceSound02} type="audio/mpeg"></audio>
                    <audio ref={interface03} src={interfaceSound03} type="audio/mpeg"></audio>
                    <audio ref={interface06} src={interfaceSound06} type="audio/mpeg"></audio>
                    <audio ref={successPlayer} src={successSound} type="audio/mpeg"></audio>
                    <audio ref={revealedPlayer} src={revealedSound} type="audio/mpeg"></audio>
                </div>
            </div>
        </div>
    )
}

export default MineSweeper
