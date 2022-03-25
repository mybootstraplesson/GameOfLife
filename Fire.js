let LivingCreature = require("./LivingCreature");

module.exports = class Fire extends LivingCreature {
  constructor(x, y) {
    super(x, y);
    this.power = 4;
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
    this.power += 3;
    let chooseCells = this.chooseCell(0);
    var newCell = chooseCells[Math.floor(Math.random() * chooseCells.length)];
    if (newCell) {
      let x = newCell[0];
      let y = newCell[1];
      matrix[y][x] = 4;
      let newFire = new Fire(x, y);
      FireArr.push(newFire);
      this.power = 20;
    }
  }
  eat() {
    let chooseCells = this.chooseCell(1, 2, 3);
    var newCell = chooseCells[Math.floor(Math.random() * chooseCells.length)];
    if (newCell && this.power > 20) {
      this.power += 2;
      let x = newCell[0];
      let y = newCell[1];
      for (let i = 0; i < grassArr.length; i++) {
        if (grassArr[i].x == x && grassArr[i].y == y) {
          grassArr.splice(i, 1);
        }
      }
      for (let i = 0; i < grassEaterArr.length; i++) {
        if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
          grassEaterArr.splice(i, 1);
        }
      }
      for (let i = 0; i < PredatorArr.length; i++) {
        if (PredatorArr[i].x == x && PredatorArr[i].y == y) {
          PredatorArr.splice(i, 1);
        }
      }
      matrix[y][x] = 4;
      matrix[this.y][this.x] = 4;
      this.x = x;
      this.y = y;
      if (this.power > 30) {
        this.mul();
      }
    } else {
      this.move();
    }
  }
  move() {
    let chooseCells = this.chooseCell(0, 1, 2, 3);
    var newCell = chooseCells[Math.floor(Math.random() * chooseCells.length)];
    if (newCell) {
      let x = newCell[0];
      let y = newCell[1];
      matrix[y][x] = 4;
      matrix[this.y][this.x] = 4;
      this.x = x;
      this.y = y;
    }
  }
};
