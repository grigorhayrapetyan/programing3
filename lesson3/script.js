var grassArr = []; //խոտերի զանգված
var eatersArr = []; //խոտակերների զանգված
var gishatichArr = [];
var hoxArr = [];
var bombArr = [];
var side = 20;
var matrix = [
    [2, 0, 2, 4, 1, 2, 1, 0, 5, 0, 2, 5, 2, 1, 0, 2, 2, 0, 4, 1, 2, 4, 1, 2, 1, 0, 5],
    [0, 0, 2, 5, 3, 2, 1, 2, 2, 0, 2, 2, 0, 2, 0, 4, 3, 5, 0, 1, 2, 1, 2, 5, 1, 2, 2],
    [0, 1, 0, 2, 1, 5, 1, 4, 0, 0, 2, 2, 4, 2, 4, 2, 0, 2, 4, 1, 2, 0, 1, 1, 2, 3, 0],
    [0, 0, 2, 0, 1, 1, 5, 4, 3, 0, 1, 0, 2, 1, 3, 0, 0, 3, 4, 1, 2, 4, 2, 3, 2, 5, 4],
    [0, 2, 0, 0, 0, 3, 4, 0, 0, 2, 0, 2, 3, 2, 5, 1, 5, 3, 2, 1, 2, 5, 4, 2, 2, 0, 0],
    [1, 0, 2, 3, 1, 2, 2, 4, 0, 0, 1, 2, 1, 0, 5, 0, 0, 4, 1, 1, 0, 4, 2, 4, 2, 4, 5],
    [0, 1, 5, 4, 2, 1, 0, 4, 2, 2, 1, 0, 5, 1, 5, 1, 2, 1, 0, 0, 2, 4, 0, 3, 2, 5, 2],
    [4, 2, 1, 3, 5, 5, 0, 0, 5, 0, 2, 2, 5, 1, 4, 1, 0, 3, 2, 1, 4, 2, 2, 0, 0, 1, 0],
    [0, 1, 2, 5, 4, 2, 1, 3, 0, 5, 0, 5, 2, 5, 4, 1, 0, 5, 2, 1, 2, 2, 1, 5, 1, 0, 1],
    [5, 2, 2, 3, 2, 5, 1, 2, 4, 2, 5, 2, 4, 0, 1, 4, 3, 2, 0, 5, 3, 2, 5, 3, 1, 1, 0],
    [4, 1, 5, 5, 2, 4, 3, 2, 5, 3, 1, 0, 4, 1, 0, 1, 5, 4, 1, 5, 0, 4, 1, 4, 4, 2, 0],
    [0, 1, 2, 4, 2, 5, 1, 0, 0, 2, 1, 3, 4, 2, 4, 1, 0, 2, 5, 1, 2, 1, 5, 2, 3, 1, 4],
    [4, 1, 5, 0, 1, 5, 2, 0, 3, 4, 1, 2, 5, 4, 2, 3, 5, 0, 5, 1, 2, 4, 1, 0, 2, 0, 2]
]

function setup() {
    noStroke();
    frameRate(20);
    createCanvas(matrix[0].length * side, matrix.length * side); //կանվասի չափերը դնել մատրիցի չափերին համապատասխան
    background('#acacac');

    //մատրիցի վրա կրկնակի ցիկլը լցնում է խոտերի, խոտակերների զանգվածները օբյեկտներով 
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
            }

            else if (matrix[y][x] == 2) {
                var eater = new GrassEater(x,y);
                eatersArr.push(eater);
            }
            else if (matrix[y][x] == 3) {
                var gishatich = new Gishatich(x, y);
                gishatichArr.push(gishatich);
            }
            else if (matrix[y][x] == 4) {
                var hox = new Hox(x, y);
                hoxArr.push(hox);
            }
            else if (matrix[y][x] == 5) {
                var bomb = new Bomb(x, y);
                bombArr.push(bomb);
            }
        }
    }
}

function draw() {
    //գծում է աշխարհը
    background('#acacac');
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                fill("green");
                rect(j * side, i * side, side, side);
            }

            else if (matrix[i][j] == 2) {
                fill("yellow");
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 3) {
                fill("red");
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 4) {
                fill("black");
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 5) {
                fill("brown")
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 0) {
                fill('#acacac');
                rect(j * side, i * side, side, side);
            }
        }
    }
    //խոտը բազմանում է
    for (var i in grassArr) {
        grassArr[i].mul();
    }

    //խոտակերը ուտում է խոտ
    for (var i in eatersArr) {
        eatersArr[i].eat();
    }
    for (var i in gishatichArr) {
        gishatichArr[i].eat();
    }
    for (var i in hoxArr) {
        hoxArr[i].mul();
    }
    for (var i in bombArr) {
        bombArr[i].bomb();
    }
}

// var os = require("os");
// var message = "The platform is ";

// function main(){
//    console.log(message + os.platform());
// }
// main();
