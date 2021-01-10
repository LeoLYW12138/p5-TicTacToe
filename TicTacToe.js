let PlayerXWin;
let PlayerOWin;
let who;
let count;

var s1 = function(main) {
    let grid = [];
    let bubbles = [];
    let PADDING = 20;
    let winIndex;
    let win_combination = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    main.setup = function() {
        main.createCanvas(500, 500);
        main.initialize();
        main.rectMode(main.CENTER);
        PADDING = main.width * 0.03;
        // var button = main.createButton("Play again");
        // button.position(8, main.height + 8);
        // button.mousePressed(main.initialize;
    };

    main.draw = function() {
        main.background(0);
        main.strokeWeight(2);
        main.stroke(255);
        main.line(main.width/3, 0, main.width/3, main.height);
        main.line(main.width/3 *2, 0, main.width/3 *2, main.height);
        main.line(0, main.height/3, main.width, main.height/3);
        main.line(0, main.height/3 *2, main.width, main.height/3 *2);
        main.printGrid();
        main.checkWin();
        if (PlayerXWin || PlayerOWin) {
            switch(winIndex) {
                case 0 : case 1 : case 2 : main.drawLine('h', winIndex); break;
                case 3 : case 4 : case 5 : main.drawLine('v', winIndex -3); break;
                case 6 : case 7 : main.drawLine('d', winIndex -6); break;
                default : break;
            }
        }
    };

    main.printGrid = function() {
        for (let i = 0; i < bubbles.length; i++) {
            bubbles[i].show();
            if (grid[i] == 'X') {
                main.fill(255, 10, 10);
                main.push();
                main.translate(bubbles[i].x, bubbles[i].y);
                main.push();
                main.rotate(main.PI / 4);
                main.rect(0, 0, 10, main.height/3 - PADDING * 4);
                main.pop();
                main.rotate(-main.PI /4);
                main.rect(0, 0, 10, main.height/3 - PADDING * 4);
                main.pop();
            }
            if (grid[i] == 'O') {
                main.fill(10, 10, 255);
                main.ellipse(bubbles[i].x, bubbles[i].y, main.width/3 - PADDING * 4, main.height/3 - PADDING * 4);
                main.fill(0);
                main.ellipse(bubbles[i].x, bubbles[i].y, main.width/3 - PADDING * 5, main.height/3 - PADDING * 5);
            }
        }
    };

    main.mousePressed = function() {
        for (let i = 0; i < bubbles.length; i++){
            bubbles[i].click(main.mouseX, main.mouseY);
            if (bubbles[i].clicked && grid[i] === null && !(PlayerXWin || PlayerOWin)) {
                grid[i] = main.mark(who);
                main.update();
            }
        }
    };


    main.mark = function(who) {
        if (who =='Player 1') {
            return 'X'
        } else {
            return 'O'
        }
    };

    main.initialize = function() {
        for (var i = bubbles.length - 1; i >= 0; i--) {
            bubbles.splice(i, 1);
        }
        winIndex = null;
        count = 0;
        PlayerXWin = false;
        PlayerOWin = false;
        who = 'Player 1';
        let x = main.width/6;
        let y = main.height/6;
        for (let i = 0; i < 9; i++) {
            grid[i] = null;
            if (i % 3 === 0 && i !== 0) {
                x = main.width/6;
                y += main.height / 3;
            } else if (i !== 0) {
                x += main.width / 3;
            }
            bubbles.push(new bubble(x, y, main.width/3 - PADDING *2));
        }
    };

    main.update = function() {
        if (who == 'Player 1') {
            who = 'Player 2'
        } else {
            who = 'Player 1'
        }
        count += 1;
    };

    main.drawLine = function(choice, n) {
        main.stroke(255, 255, 0);
        main.strokeWeight(4);
        if (choice == 'v') {
            main.line(main.width / 6 + n * main.width / 3, 5, main.width / 6 + n * main.width / 3, main.height - 5);
        }else if (choice == 'h') {
            main.line(5, main.height / 6 + n * main.height / 3, main.width - 5, main.height / 6 + n * main.height / 3);
        }else if (choice == 'd') {
            main.line(main.abs(n * main.width - PADDING), PADDING, main.abs((1 - n) * main.width - PADDING), main.height - PADDING);
        }
    };

    main.checkWin = function() {
        for (let j = 0; j < win_combination.length; j++) {
            if (grid[win_combination[j][0]] == grid[win_combination[j][1]] && grid[win_combination[j][1]] == grid[win_combination[j][2]]) {
                switch(grid[win_combination[j][0]]) {
                    case 'X' : PlayerXWin = true; break;
                    case 'O' : PlayerOWin = true; break;
                    default : break;
                }
                if (grid[win_combination[j][0]] !== null) {
                    winIndex = j;
                }
            }
        }
    };

};

var s2 = function(output) {

    output.setup = function() {
        output.createCanvas(300, 50);
        output.textSize(20);
        output.textAlign(output.LEFT);
        var button = output.createButton("Play again");
        button.position(output.width + 10, myp5.canvas.clientHeight + 40);
        button.mousePressed(myp5.initialize);
    };

    output.draw = function() {
        output.background(0);
        output.fill(70, 242, 222);
        let sentence = `This is the turn of ${who}.`;
        if (PlayerXWin) {
            output.fill(255, 10, 10);
            sentence = 'Player 1 has won the game!';
        } else if (PlayerOWin) {
            output.fill(10, 255, 255);
            sentence = 'Player 2 has won the game!';
        } else if (count > 8) {
            output.fill(226, 36, 38);
            sentence = 'Unfortunately, draw!';
        }
        output.text(sentence, 18, 30);
    };

};

var myp5 = new p5(s1, "main");
var display = new p5(s2, "output");
