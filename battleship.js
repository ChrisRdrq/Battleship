var rows = 7;
var cols = 7;
var squareSize = 50;
var t = 1;


var gameBoardContainer = document.getElementById("gameboard");

function myFunction() {
    document.getElementById("gameboard").reset();
}
function buildBoard() {

  for (i = 0; i < cols; i++) {
    for (j = 0; j < rows; j++) {

        var square = document.createElement("div");
        gameBoardContainer.appendChild(square);

        square.id = 's' + j + i;

        var topPosition = j * squareSize;
        var leftPosition = i * squareSize;


        square.style.top = topPosition + 'px';
        square.style.left = leftPosition + 'px';
    };
  };
};

buildBoard();

var hitCount = 0;

var gameBoards = [ [
    [0, 0, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0],
],[
    [0, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 1, 1, 0],
    [1, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0],
],[
    [0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0],
],[
    [0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 1, 1, 0, 1],
    [0, 1, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0],
],[
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 1],
    [0, 0, 0, 1, 0, 0, 1],
    [0, 0, 1, 1, 0, 0, 1],
    [0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1],
  ]
]

var currentBoard = 0;
var gameBoard = gameBoards[currentBoard];
var splash= new Audio("betterMiss.wav");
var hit= new Audio("hitSound.wav");
gameBoardContainer.addEventListener("click", fireTorpedo, false);


function fireTorpedo(e) {

    if (e.target !== e.currentTarget) {

        var row = e.target.id.substring(1, 2);
        var col = e.target.id.substring(2, 3);


        //miss is blue
        if (gameBoard[row][col] == 0) {
            e.target.style.background = '#429bf4';
            splash.play();
            gameBoard[row][col] = 3;
            //hit is red
        } else if (gameBoard[row][col] == 1) {
            e.target.style.background = 'red';
            gameBoard[row][col] = 2;
            hit.play();
            hitCount++;
            $(".player h2").text(hitCount);
            if (hitCount/12 === t) {
                alert("You win!");
                currentBoard++;
                t++;
                console.log(currentBoard);
                gameBoard = gameBoards[currentBoard];
                console.log(gameBoard);
                buildBoard();
            }

        } else if (gameBoard[row][col] > 1) {
            alert("You already fired at this location.");
        }
    }
    e.stopPropagation();
}
