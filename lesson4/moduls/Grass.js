class Grass extends All {
    constructor(x, y, multiply, directions) {

        super(x, y, multiply, directions)

    }
    // super(x,y);
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
        if (this.multiply >= 5) {
            //հետազոտում է շրջապատը, որոնում դատարկ տարածքներ
            var emptyCells = this.chooseCell(0);
            var coord = random(emptyCells);
            if (coord) {
                var x = coord[0];
                var y = coord[1];

                //ավելացնում է նոր խոտ խոտերի զանգվածում
                var newGrass = new Grass(x, y);
                grassArr.push(newGrass);

                //ավելացնում է նոր խոտ մատրիցում
                matrix[y][x] = 1;
                this.multiply = 0;
            }
        }
    }
}