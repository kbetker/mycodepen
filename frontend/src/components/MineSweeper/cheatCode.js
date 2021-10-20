let allSquares = document.querySelectorAll(".msSquare")

for (let i = 0; i < allSquares.length; i++) {
    if (allSquares[i].childNodes[0].classList.value.includes("bomb")) {
        allSquares[i].style.pointerEvents = "none"
    } else {
        allSquares[i].style.backgroundColor = "white"
        console.log(allSquares[i])
    }
}



let allSquares = document.querySelectorAll(".msSquare")

for (let i = 0; i < allSquares.length; i++) {
    if (allSquares[i].childNodes[0].classList.value.includes("bomb")) {
        allSquares[i].style.pointerEvents = "none"
    } else {
        allSquares[i].style.backgroundColor = "white"
        allSquares[i].click(0)

        // console.log(allSquares[i])
    }
}
