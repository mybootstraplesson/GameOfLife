var socket = io();
weath = "winter";

side = 30;

function setup() {
  createCanvas(29 * side, 18 * side);
  background("#acacac");
}

socket.on("weath", function (data) {
  weath = data;
});

function nkarel(matrix) {
  console.log(matrix);
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      var obj = matrix[y][x];
      if (obj == 1) {
        if (weath == "spring") {
          fill("#32CD32");
        } else if (weath == "summer") {
          fill("green");
        } else if (weath == "autumn") {
          fill("gold");
        } else if (weath == "winter") {
          fill("#90EE90");
        }
      } else if (obj == 0) {
        fill("#acacac");
      } else if (obj == 2) {
        fill("yellow");
      } else if (obj == 3) {
        fill("red");
      } else if (obj == 4) {
        fill("orange");
      } else if (obj == 5) {
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

function Spring() {
  socket.emit("Spring", "spring");
}

function Summer() {
  socket.emit("Summer", "summer");
}

function Autumn() {
  socket.emit("Autumn", "autumn");
}

function Winter() {
  socket.emit("Winter", "winter");
}

setInterval(function () {
  socket.on("send matrix", nkarel);
}, 600);
