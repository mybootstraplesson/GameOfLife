var socket = io();

side = 30

function setup() {
    createCanvas(29 * side, 18 * side);
    background("#acacac");
}

function nkarel(matrix) {
    console.log(matrix);
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            var obj = matrix[y][x];
            if (obj == 1) {
                fill("green");
            } 
            else if (obj == 0) {
                fill("#acacac");
            } 
            else if (obj == 2) {
                fill("yellow");
            } 
            else if (obj == 3) {
                fill("red");
            } 
            else if (obj == 4) {
                fill("orange");
            } 
            else if (obj == 5) {
                fill("blue");
            }
        
            rect(x * side, y * side, side, side);
        }
    }

}

function AddGrass() {
    socket.emit("AddGrass");
}
  
function AddGrassEater() {
    socket.emit("AddGrassEater");
}
  
function Flood() {
    socket.emit("Flood");
}

setInterval(
    function () {
        socket.on('send matrix', nkarel)
    },600
)
