class LivingCreature {
    constructor(x, y, index){
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.index = index;
        this.directions = [
           [this.x - 1, this.y - 1],
           [this.x, this.y - 1],
           [this.x + 1, this.y - 1],
           [this.x - 1, this.y],
           [this.x + 1, this.y],
           [this.x - 1, this.y + 1],
           [this.x, this.y + 1],
           [this.x + 1, this.y + 1]
       ];
 
    }
    chooseCell(ch) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }   
        }
        return found;
    }
}


class Grass extends LivingCreature
{
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if(this.multiply >= 8 && newCell) {
            var newGrass = new Grass(newCell[0],newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.multiply = 0;
        }
    }
}

class GrassEater extends LivingCreature {
    constructor(x, y, index){
        super(x, y, index);
        this.energy = 8;
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
           [this.x + 1, this.y + 1]
       ];
   }
   chooseCell(character) {
       this.getNewCoordinates();
       return super.chooseCell(character);
   }
   mul()
   {
        let found = this.chooseCell(0);
        let exact = random(found);
        if(exact && this.energy > 25)
        {
            let x = exact[0];
            let y = exact[1];
            matrix[y][x] = 2;
            let newGrassEater = new GrassEater(x,y)
            grassEaterArr.push(newGrassEater);
            this.energy = 2;
        }
    } 
   // eat, mul, move, die
}



class Predator 
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
        this.energy = 2;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    
    }
    getNewCoordinates(){
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
     }
    chooseCell(num1, num2) 
    {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length)
            {
                if (matrix[y][x] == num1 || matrix[y][x] == num2) 
                {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
     }
     mul()
     {
        let found = this.chooseCell(0, 0);
        let exact = random(found);
        if(exact && this.energy > 20)
        {
            let x = exact[0];
            let y = exact[1];
            matrix[y][x] = 3;
            let newPredator = new Predator(x,y)
            PredatorArr.push(newPredator);
            this.energy = 2;
        }
    } 
    eat(){
        let found = this.chooseCell(1, 2);
        let exact = random(found);
        console.log(found);
        if(exact)
        {
            this.energy += 2;
            let x = exact[0];
            let y = exact[1];
            for(let i = 0; i < grassArr.length; i++)
            {
                if(grassArr[i].x == x && grassArr[i].y == y)
                {
                    grassArr.splice(i, 1);
                }
            }
            for(let i = 0; i < grassEaterArr.length; i++)
            {
                if(grassEaterArr[i].x == x && grassEaterArr[i].y == y)
                {
                    grassEaterArr.splice(i, 1);
                }
            }
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            if(this.energy > 25)
            {
                this.mul();
            }
        }
        else 
        {
            console.log("bag1");
            this.move();
        }

     }
     move()
     {
        let found = this.chooseCell(0,0);
        let exact = random(found);
        if(exact)
        {
            this.energy -= 5;
            let x = exact[0];
            let y = exact[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            if(this.energy < 0)
            {
                this.die();
            }   
        }
        else{
            this.energy-= 2;
            if(this.energy < 0)
            {
                this.die();
            } 
        }
    }
    die()
    {
        for(let i = 0; i < PredatorArr.length; i++)
            {
                if(PredatorArr[i].x == this.x && PredatorArr[i].y == this.y)
                {
                    PredatorArr.splice(i, 1);
                    
                }
            }
            matrix[this.y][this.x] = 0;
    }    
}

class Fire{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
        this.power = 4;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        
        ];
    
    }
    getNewCoordinates(){
        this.directions = [
            [this.x - 1, this.y - 1],
    [this.x    , this.y - 1],
    [this.x + 1, this.y - 1],
    [this.x - 1, this.y    ],
    [this.x + 1, this.y    ],
    [this.x - 1, this.y + 1],
    [this.x    , this.y + 1],
    [this.x + 1, this.y + 1]


        ];
     }
    chooseCell(num1, num2, num3, num4) 
    {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length)
            {
                if (matrix[y][x] == num1 || matrix[y][x] == num2 || matrix[y][x] == num3 || matrix[y][x] == num4) 
                {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
     }
     mul()
     {
        this.power += 3;
        let found = this.chooseCell(0,0,0);
        let exact = random(found);
        if(exact)
        {
            let x = exact[0];
            let y = exact[1];
            matrix[y][x] = 4;
            let newFire = new Fire(x,y)
            FireArr.push(newFire);
            this.power = 20;
        }
    } 
    eat(){
        let found = this.chooseCell(1,2,3);
        let exact = random(found);
        console.log(found);
        if(exact && this.power > 20)
        {
            this.power += 2;
            let x = exact[0];
            let y = exact[1];
            for(let i = 0; i < grassArr.length; i++)
            {
                if(grassArr[i].x == x && grassArr[i].y == y)
                {
                    grassArr.splice(i, 1);
                }
            }
            for(let i = 0; i < grassEaterArr.length; i++)
            {
                if(grassEaterArr[i].x == x && grassEaterArr[i].y == y)
                {
                    grassEaterArr.splice(i, 1);
                }
            }
            for(let i = 0; i < PredatorArr.length; i++)
            {
                if(PredatorArr[i].x == x && PredatorArr[i].y == y)
                {
                    PredatorArr.splice(i, 1);
                }
            }
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 4;
            this.x = x;
            this.y = y;
            if(this.power > 30)
            {
                this.mul();
            }
        }
        else 
        {
            console.log("bag1");
            this.move();
        }

     }
     move()
     {
        let found = this.chooseCell(0,1,2,3);
        let exact = random(found);
        if(exact)
        {
            // this.power -= 3;
            let x = exact[0];
            let y = exact[1];
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 4;
            this.x = x;
            this.y = y;
            // if(this.power < 0)
            // {
            //     this.die();
            // }   
        }
    }   
}

class Booster{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
    }
    isPickedUp(){
        for(var y = 0; y < matrix.length; y++){
            for(var x = 0; x < matrix[y].length; x++){
                matrix[y][x] = 1;
                matrix[this.y][this.x] = 1;
            }
        }
        for(let i = 0; i < grassEaterArr.length; i++)
        {
               grassEaterArr.splice(i, 0);

        }
        for(let i = 0; i < PredatorArr.length; i++)
        {
                PredatorArr.splice(i, PredatorArr.length - 1);
        }
        for(let i = 0; i < FireArr.length; i++)
        {
                FireArr.splice(i, FireArr.length);
        }
    }
}

