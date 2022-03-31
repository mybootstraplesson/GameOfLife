var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var fs = require("fs");
weath = "winter";
app.use(express.static("."));

app.get("/", function (req, res) {
  res.redirect("index.html");
});
server.listen(3000, function () {
  console.log("connected");
});

matrix = [
  [
    1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 1, 1,
    1, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
    0, 0, 0, 0,
  ],
  [
    1, 2, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
    0, 0, 0, 0,
  ],
  [
    1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
    1, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0,
  ],
  [
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 0, 0, 0,
  ],
  [
    0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0,
  ],
  [
    0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
    1, 0, 0, 0,
  ],
  [
    0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0,
  ],
  [
    1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0,
    4, 0, 0, 0,
  ],
  [
    1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
    1, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0,
    0, 0, 0, 0,
  ],
  [
    1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 3, 0, 0,
    0, 0, 0, 0,
  ],
  [
    1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0,
    0, 0, 0, 0,
  ],
  [
    1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0,
    0, 0, 0, 0,
  ],
  [
    1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
    0, 0, 0, 0,
  ],
  [
    1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
    0, 0, 0, 0, 0,
  ],
];

io.sockets.emit("send matrix", matrix);

grassArr = [];
grassEaterArr = [];
PredatorArr = [];
FireArr = [];

Grass = require("./Grass");
GrassEater = require("./GrassEater");
Predator = require("./Predator");
Fire = require("./Fire");

function createObject(matrix) {
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
        var gr = new Grass(x, y);
        grassArr.push(gr);
      } else if (matrix[y][x] == 2) {
        var grEater = new GrassEater(x, y);
        grassEaterArr.push(grEater);
      } else if (matrix[y][x] == 3) {
        var predator = new Predator(x, y);
        PredatorArr.push(predator);
      } else if (matrix[y][x] == 4) {
        var fire = new Fire(x, y);
        FireArr.push(fire);
      }
    }
  }

  io.sockets.emit("send matrix", matrix);
}

function Game() {
  for (let i in grassArr) {
    grassArr[i].mul();
  }
  for (let i in grassEaterArr) {
    grassEaterArr[i].eat();
  }
  for (let i in PredatorArr) {
    PredatorArr[i].eat();
  }
  for (let i in FireArr) {
    FireArr[i].eat();
  }

  io.sockets.emit("send matrix", matrix);
}

function addGrass() {
  for (i = 0; i < 100; i++) {
    var x = Math.floor(Math.random() * matrix[0].length);
    var y = Math.floor(Math.random() * matrix.length);
    console.log(x, y);
    if (matrix[y][x] == 0) {
      let grass = new Grass(x, y);
      grassArr.push(grass);
      matrix[y][x] = 1;
    }
  }
}

function addGrassEater() {
  for (i = 0; i < 10; i++) {
    var x = Math.floor(Math.random() * matrix[0].length);
    var y = Math.floor(Math.random() * matrix.length);
    console.log(x, y);
    if (matrix[y][x] == 0) {
      let newGrassEater = new GrassEater(x, y);
      grassEaterArr.push(newGrassEater);
      matrix[y][x] = 2;
    }
  }
}

function flood() {
  for (var y = 0; y < matrix[0].length; y++) {
    matrix[0][y] = 5;
  }
  setTimeout(() => {
    for (var x = 0; x < matrix[0].length; x++) {
      matrix[1][x] = 5;
    }
  }, 100);
  setTimeout(() => {
    for (var x = 0; x < matrix[0].length; x++) {
      matrix[2][x] = 5;
    }
  }, 200);
  setTimeout(() => {
    for (var x = 0; x < matrix[0].length; x++) {
      matrix[3][x] = 5;
    }
  }, 300);
  setTimeout(() => {
    for (var x = 0; x < matrix[0].length; x++) {
      matrix[4][x] = 5;
    }
  }, 400);
  setTimeout(() => {
    for (var x = 0; x < matrix[0].length; x++) {
      matrix[5][x] = 5;
    }
  }, 500);
  setTimeout(() => {
    for (var x = 0; x < matrix[0].length; x++) {
      matrix[6][x] = 5;
    }
  }, 600);
  setTimeout(() => {
    for (var x = 0; x < matrix[0].length; x++) {
      matrix[7][x] = 5;
    }
  }, 700);
  setTimeout(() => {
    for (var x = 0; x < matrix[0].length; x++) {
      matrix[8][x] = 5;
    }
  }, 800);
  setTimeout(() => {
    for (var x = 0; x < matrix[0].length; x++) {
      matrix[9][x] = 5;
    }
  }, 900);
  setTimeout(() => {
    for (var x = 0; x < matrix[0].length; x++) {
      matrix[10][x] = 5;
    }
  }, 1000);
  setTimeout(() => {
    for (var x = 0; x < matrix[0].length; x++) {
      matrix[11][x] = 5;
    }
  }, 1100);
  setTimeout(() => {
    for (var x = 0; x < matrix[0].length; x++) {
      matrix[12][x] = 5;
    }
  }, 1200);
  setTimeout(() => {
    for (var x = 0; x < matrix[0].length; x++) {
      matrix[13][x] = 5;
    }
  }, 1300);
  setTimeout(() => {
    for (var x = 0; x < matrix[0].length; x++) {
      matrix[14][x] = 5;
    }
  }, 1400);
  setTimeout(() => {
    for (var x = 0; x < matrix[0].length; x++) {
      matrix[15][x] = 5;
    }
  }, 1500);
  setTimeout(() => {
    for (var x = 0; x < matrix[0].length; x++) {
      matrix[16][x] = 5;
    }
  }, 1600);
  setTimeout(() => {
    for (var x = 0; x < matrix[0].length; x++) {
      matrix[17][x] = 5;
    }
  }, 1700);
  setTimeout(() => {
    for (var y = 0; y < matrix.length; y++) {
      for (var x = 0; x < matrix[y].length; x++) {
        matrix[y][x] = 0;
      }
    }
  }, 2500);
}

function spring(data) {
  weath = data;
  io.sockets.emit("weath", weath);
}

function summer(data) {
  io.sockets.emit("weath", weath);
  weath = data;
}

function autumn(data) {
  io.sockets.emit("weath", weath);
  weath = data;
}

function winter(data) {
  io.sockets.emit("weath", weath);
  weath = data;
}

setInterval(Game, 600);

io.on("connection", function (socket) {
  createObject(matrix);
  socket.on("AddGrass", addGrass);
  socket.on("AddGrassEater", addGrassEater);
  socket.on("Flood", flood);
  socket.on("Spring", spring);
  socket.on("Summer", summer);
  socket.on("Autumn", autumn);
  socket.on("Winter", winter);
});
