let LivingCreature = require("./LivingCreature");

module.exports = class Grass extends LivingCreature {
  mul() {
    this.multiply++;
    let chooseCells = this.chooseCell(0);
    var newCell = chooseCells[Math.floor(Math.random() * chooseCells.length)];
    if (newCell && this.multiply > 1) {
      let x = newCell[0];
      let y = newCell[1];
      matrix[y][x] = 1;
      let grass1 = new Grass(x, y);
      grassArr.push(grass1);
      this.multiply = 0;
    }
  }
};
