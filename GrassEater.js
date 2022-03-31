let LivingCreature = require("./LivingCreature");

module.exports = class GrassEater extends LivingCreature {
  constructor(x, y) {
    super(x, y);
    this.energy = 12;
  }
  getNewCoordinates() {
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x, this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y],
      [this.x + 1, this.y],
      [this.x - 1, this.y + 1],
      [this.x, this.y + 1],
      [this.x + 1, this.y + 1],
    ];
  }
  chooseCell(ch) {
    this.getNewCoordinates();
    return super.chooseCell(ch);
  }
  mul() {
    let chooseCells = this.chooseCell(0);
    var newCell = chooseCells[Math.floor(Math.random() * chooseCells.length)];
    if (newCell && weath == "spring" && this.energy > 25) {
      let x = newCell[0];
      let y = newCell[1];
      matrix[y][x] = 2;
      let newGrassEater = new GrassEater(x, y);
      grassEaterArr.push(newGrassEater);
      this.energy = 5;
    } else if (newCell && weath == "summer" && this.energy > 20) {
      let x = newCell[0];
      let y = newCell[1];
      matrix[y][x] = 2;
      let newGrassEater = new GrassEater(x, y);
      grassEaterArr.push(newGrassEater);
      this.energy = 8;
    } else if (newCell && weath == "autumn" && this.energy > 35) {
      let x = newCell[0];
      let y = newCell[1];
      matrix[y][x] = 2;
      let newGrassEater = new GrassEater(x, y);
      grassEaterArr.push(newGrassEater);
      this.energy = 3;
    } else if (newCell && weath == "winter" && this.energy > 40) {
      let x = newCell[0];
      let y = newCell[1];
      matrix[y][x] = 2;
      let newGrassEater = new GrassEater(x, y);
      grassEaterArr.push(newGrassEater);
      this.energy = 2;
    }
  }
  eat() {
    let chooseCells = this.chooseCell(1);
    var newCell = chooseCells[Math.floor(Math.random() * chooseCells.length)];
    if (newCell) {
      if (weath == "spring") {
        this.energy += 5;
      } else if (weath == "summer") {
        this.energy += 7;
      } else if (weath == "autumn") {
        this.energy += 3;
      } else if (weath == "winter") {
        this.energy += 2;
      }
      let x = newCell[0];
      let y = newCell[1];
      for (let i = 0; i < grassArr.length; i++) {
        if (grassArr[i].x == x && grassArr[i].y == y) {
          grassArr.splice(i, 1);
        }
      }
      matrix[y][x] = 2;
      matrix[this.y][this.x] = 0;
      this.x = x;
      this.y = y;
      if (this.energy > 20) {
        this.mul();
      }
    } else {
      this.move();
    }
  }
  move() {
    let chooseCells = this.chooseCell(0);
    var newCell = chooseCells[Math.floor(Math.random() * chooseCells.length)];
    if (newCell) {
      if (weath == "spring") {
        this.energy -= 4;
      } else if (weath == "summer") {
        this.energy -= 5;
      } else if (weath == "autumn") {
        this.energy -= 6;
      } else if (weath == "winter") {
        this.energy -= 7;
      }
      let x = newCell[0];
      let y = newCell[1];
      matrix[y][x] = 2;
      matrix[this.y][this.x] = 0;
      this.x = x;
      this.y = y;
      if (this.energy < 0) {
        this.die();
      }
    } else {
      this.energy--;
      if (this.energy < 0) {
        this.die();
      }
    }
  }
  die() {
    for (let i = 0; i < grassEaterArr.length; i++) {
      if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
        grassEaterArr.splice(i, 1);
      }
    }
    matrix[this.y][this.x] = 0;
  }
};
