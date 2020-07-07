document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid")
  let squares = Array.from(document.querySelectorAll(".grid div"))
  const ScoreDisplay = document.querySelector("#score")
  const StartBtn = document.querySelector("#start-button")
  const width = 10
  let nextRandom = 0
  let timerID
  let score = 0
  const colors = [
    "orange",
    "red",
    "purple",
    "green",
    "blue"
  ]

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

console.log(theTetrominoes[0][0])

//RANDOMLY SELECT A TETROMINO AND ITS FIRST ROTATION
let random = Math.floor(Math.random()*theTetrominoes.length)
let current = theTetrominoes[random][currentRotation]

//DRAW THE TETROMINO
function draw() {
  current.forEach(index => {
    squares[currentPosition + index].classList.add("tetromino")
    squares[currentPosition + index].style.backgroundColor = colors[random]
  })
}

//UNDRAW THE TETROMINO
function undraw() {
  current.forEach(index => {
    squares[currentPosition + index].classList.remove("tetromino")
    squares[currentPosition + index].style.backgroundColor = ""
  })
}

// ASSIGN FUNCTIONS TO KEYCODES
function control(e) {
  if(e.keyCode === 37) {
    moveLeft()
  } else if (e.keyCode === 38) {
    rotate()
  } else if (e.keyCode === 39) {
    moveRight()
  } else if (e.keyCode === 40) {
    moveDown()
  }
}
document.addEventListener("keyup", control)

// MOVE DOWN FUNCTION
function moveDown() {
  undraw()
  currentPosition += width
  draw()
  freeze()
}

// FREEZE FUNCTION
function freeze() {
  if(current.some(index => squares[currentPosition + index + width].classList.contains("taken"))) {
    current.forEach(index => squares[currentPosition + index].classList.add("taken"))
    // START A NEW TETROMINO FALLING
    random = nextRandom
    nextRandom = Math.floor(Math.random() * theTetrominoes.length)
    current = theTetrominoes[random][currentRotation]
    currentPosition = 4
    draw()
    displayShape()
    addScore()
    gameOver()
  }
}

// MOVE THE TETROMINO LEFT, UNLESS IS AT THE EDGE OR THERE IS A BLOCKAGE
function moveLeft() {
  undraw()
  const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
  if(!isAtLeftEdge) currentPosition -=1
  if(current.some(index => squares[currentPosition + index].classList.contains("taken"))) {
    currentPosition +=1
  }
  draw()
}

//MOVE THE TETROMINO RIGHT, UNLESS IS AT THE EDGE OR THERE IS A BLOCKAGE
function moveRight() {
  undraw()
  const isAtRightEdge = current.some(index => (currentPosition + index) % width === -1)
  if(!isAtRightEdge) currentPosition +=1
  if(current.some(index => squares[currentPosition + index].classList.contains("taken"))) {
    currentPosition -=1
  }
  draw()
}

//FIX ROTATION OF TETROMINOS AT THE EDGE
function isAtRight() {
  return current.some(index=> (currentPosition + index + 1) % width === 0)
}

function isAtLeft() {
  return current.some(index=> (currentPosition + index) % width === 0)
}

function checkRotatedPosition(P){
  P = P || currentPosition    //GET CURRENT POSITION. THEN, CHECK IF THE PIECE IS NEAR THE LEFT SIDE.
  if ((P+1) % width < 4) {   //ADD 1 BECAUSE THE POSITION INDEX CAN BE 1 LESS THAN WHERE THE PIECE IS(WITH HOW THEY ARE INDEXED)
    if (isAtRight()){        //USE ACTUAL POSITION TO CHECK IF IT'S FLIPPED OVER TO THE RIGHT SIDE.
      currentPosition +=1    //IF SO, ADD ONE TO WRAP IT BACK AROUND
      checkRotatedPosition(P) //CHECK AGAIN. PASS POSITION FROM START, SINCE LONG BLOCK MIGHT NEED TO MOVE MORE.
    }
  }
  else if (P % width > 5) {
    if (isAtLeft()){
      currentPosition -=1
      checkRotatedPosition(P)
    }
  }
}

//ROTATE THE TETROMINO
function rotate() {
  undraw()
  currentRotation ++
  if(currentRotation === current.length) {     //IF THE CURRENT ROTATION GETS TO 4, MAKE IT GO BACK TO 0
    currentRotation = 0
  }
  current = theTetrominoes[random][currentRotation]
  checkRotatedPosition()
  draw()
}

//SHOW UP-NEXT TETROMINO IN MINI-GRID DISPLAY
const displaySquares = document.querySelectorAll(".mini-grid div")
const displayWidth = 4
const displayIndex = 0

//THE TETROMINOS WITHOUT ROTATIONS
const upNextTetrominoes = [
  [1, displayWith+1, displayWidth*2+1, 2], //lTetromino
  [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetromino
  [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
  [0, 1, displayWidth, displayWidth+1], //oTetromino
  [1, display+1, displayWidth*2+1, displayWidth*3+1], //iTetromino
]



})
