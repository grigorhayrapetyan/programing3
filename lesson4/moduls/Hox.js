class Hox extends All {
    constructor(x, y, multiply, directions) {
        super(x, y, multiply, directions);
        this.energy = 1;

    }
    //հետազոտում է շրջապատը, որոնում է հետաքրքրող կերպարներին
    //կերպարը որոշվում է character արգումենտով
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    //mul() բազմացում
    mul() {
        this.multiply++;
        if (this.multiply >= 8) {
            //հետազոտում է շրջապատը, որոնում դատարկ տարածքներ
            var emptyCells = this.chooseCell(0);
            var coord = random(emptyCells);
            if (coord) {
                var x = coord[0];
                var y = coord[1];

                //ավելացնում է նոր խոտ խոտերի զանգվածում
                var newHox = new Hox(x, y);
                hoxArr.push(newHox);

                //ավելացնում է նոր խոտ մատրիցում
                matrix[y][x] = 4;


            }
            this.multiply = 0;
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }

        }
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (var i in hoxArr) {
            if (this.x == hoxArr[i].x && this.y == hoxArr[i].y) {
                hoxArr.splice(i, 1);
            }
        }
    }
}




class Bomb extends All {
    constructor(x, y, multiply, directions) {
        super(x, y, multiply, directions);
        this.energy = 15;
    }
    //հետազոտում է շրջապատը, որոնում է հետաքրքրող կերպարներին
    //կերպարը որոշվում է character արգումենտով
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }


    bomb() {
        this.energy--;
        var Cells = this.chooseCell(4);
        var coord = random(Cells);
        if (coord) {
            var x = coord[0];
            var y = coord[1];


            var newbomb = new Bomb(x, y);
            bombArr.push(newbomb);


            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            for (var i in hoxArr) {
                if (x == hoxArr[i].x && y == hoxArr[i].y) {
                    hoxArr.splice(i, 1);
                }
            }
        }
        this.energy--;
        if (this.energy <= 0) { //մահանում է, եթե էներգիան 0֊ից ցածր է
            this.die();
        }
    }

    die() {
        //Հիմնական մատրիցում իր դիրքում դնում է դատարկություն
        matrix[this.y][this.x] = 0;

        //ջնջում է ինքն իրեն խոտակերների զանգվածից
        for (var i in bombArr) {
            if (this.x == bombArr[i].x && this.y == bombArr[i].y) {
                bombArr.splice(i, 1);
            }
        }
    }


}