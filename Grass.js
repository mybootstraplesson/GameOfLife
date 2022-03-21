let LivingCreature = require("./LivingCreature");

module.exports = class Grass extends LivingCreature {
  mul() {
    this.multiply++;
    let chooseCells = this.chooseCell(0);
    var newCell = chooseCells[Math.floor(Math.random() * chooseCells.length)];
    let exact = random(search);
    if (exact && this.multiply > 1) {
      let x = exact[0];
      let y = exact[1];
      matrix[y][x] = 1;
      let grass1 = new Grass(x, y);
      grassArr.push(grass1);
      this.multiply = 0;
    }
  }
};
