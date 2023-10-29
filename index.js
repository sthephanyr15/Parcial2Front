var size = 4;
var fieldCells = cellFields();
var values = numberFields();
var moves = [
  { x: -1, y: 0 }, // Left
  { x: 1, y: 0 },  // Right
  { x: 0, y: -1 }, // Up
  { x: 0, y: 1 }   // Down
];

var gameStarted = false;
function initializeGame() {
  values = numberFields();
  draw(); 
}

function numberFields() {
  var v = [];
  var i = 1;
  for (var y = 0; y < size; y++) {
    var row = [];
    v.push(row);
    for (var x = 0; x < size; x++) {
      row.push(i);
      i++;
    }
  }
  v[size - 1][size - 1] = 0;
  return v;
}

function cellFields() {
  var cells = [];
  var table = document.getElementById("field");
  for (var y = 0; y < size; y++) {
    var tr = document.createElement("tr");
    table.appendChild(tr);
    var rowCells = [];
    cells.push(rowCells);
    for (var x = 0; x < size; x++) {
      var td = document.createElement("td");
      td.setAttribute('class', 'cell');
      tr.appendChild(td);
      rowCells.push(td);
    }
  }
  return cells;
}

function draw() {
  for (var y = 0; y < size; y++) {
    for (var x = 0; x < size; x++) {
      var cellValue = values[y][x];
      var td = fieldCells[y][x];
      td.innerHTML = cellValue === 0 ? "" : String(cellValue);
    }
  }
}

function makeMove(move) {
  if(!gameStarted)return;
  var newx = x + move.x;
  var newy = y + move.y;
  if (newx >= 0 && newx < size && newy >= 0 && newy < size) {
    var c = values[newy][newx];
    values[newy][newx] = 0;
    values[y][x] = c;
    x = newx;
    y = newy;
    draw();
  }
}

function shuffleBoard() {
  if(!gameStarted)return;
  for (var i = 0; i < 100; i++) {
    var randomMove = moves[Math.floor(Math.random() * moves.length)];
    makeMove(randomMove);
  }
}

document.addEventListener('keydown', function (event) {
  switch (event.keyCode) {
    case 37: // Left
      makeMove(moves[0]);
      break;
    case 38: // Up
      makeMove(moves[2]);
      break;
    case 39: // Right
      makeMove(moves[1]);
      break;
    case 40: // Down
      makeMove(moves[3]);
      break;
  }
  draw();
  if(gameOver()){
    setTimeout(function(){
      alert("You won,congrats!");
    }, 1000);
  }
});

function gameOver(){
  var expected = 1;
  for (var y = 0; y < size; y++){
    for (var x = 0; x < size; x++){
      if (values[y][x] == expected){
        expected++;
      }else{
        if(x == size - 1 && y == size - 1 && values[y][x] == 0){
          return true;
      }
      return false;
      }
    }
  }
  return true;
}

var x = size - 1;
var y = size - 1;

initializeGame();

document.getElementById("start").addEventListener("click", function() {
  gameStarted = true;
  shuffleBoard();
});