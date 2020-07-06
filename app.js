document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid")
  let squares = Array.from(document.querySelectorAll(".grid div"))
  const ScoreDisplay = document.querySelector("#score")
  const StartBtn = document.querySelector("#start-button")
  const width = 10

  console.log(squares)



  //THE TETROMINOES

  const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2],
  ]

  const zTetromino = [
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1],
]

  const tTetromino = [
    [1, width, width+1, width+2],
    [1, width+1, width+2, width*2+1],
    [width, width+1, width+2, width*2+1],
    [1, width, width+1, width*2+1]
  ]

  const oTetromino = [
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1],
  ]

  const iTetromino = [
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
  ]

const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

let currentPosition = 4
let currentRotation = 0


//RANDOMLY SELECT A TETROMINO AND ITS FIRST ROTATION

let random = Math.floor(Math.random()*theTetrominoes.length)
let current = theTetrominoes[random] [currentRotation]



//DRAW THE TETROMINO

function draw() {
  current.forEach(index => {
    squares[currentPosition + index].classList.add("tetromino")
  })
}



//UNDRAW THE TETROMINO

function undraw() {
  current.forEach(index => {
    squares[currentPosition + index].classList.remove("tetromino")
  })
}






















})
