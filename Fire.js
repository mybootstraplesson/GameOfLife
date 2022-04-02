const e = require("express");
let LivingCreature = require("./LivingCreature");

module.exports = class Fire extends LivingCreature {
  constructor(x, y) {
    super(x, y);
    this.power = 15;
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
    if(weath != "winter"){
      if(weath == "spring"){
        this.power -= 4;
      }
      else if(weath == "summer"){
        this.power -= 3;
      }
      else if(weath == "autumn"){
        this.power -= 5;
      }
      let chooseCells = this.chooseCell(0);
      var newCell = chooseCells[Math.floor(Math.random() * chooseCells.length)];
      if (newCell) {
        let x = newCell[0];
        let y = newCell[1];
        matrix[y][x] = 4;
        let newFire = new Fire(x, y);
        FireArr.push(newFire);
        if(weath == "spring"){
          this.power == 10;
        }
        else if(weath == "summer"){
          this.power == 12;
        }
        else if(weath == "autumn"){
          this.power == 8;
        }
      }
    }
  }
  eat() {
    let chooseCells = this.chooseCell(1, 2, 3);
    var newCell = chooseCells[Math.floor(Math.random() * chooseCells.length)];
    if (newCell && weath != "winter") {
        if(weath == "spring" && this.power > 10){
          this.power += 5;
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
        }
        else if(weath == "summer" && this.power > 15){
          this.power += 10;
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
        }
        else if(weath == "autumn" && this.power > 20){
          this.power += 5;
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
        }
      if (this.power > 10) {
        this.mul();
      }
    } else {
      this.move();
    }
  }
  move() {
    if(weath != "winter"){
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

  }
}
