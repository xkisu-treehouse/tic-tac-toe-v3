function TicTacToe() {
    this.state = 'start';
    this.turn = 0;
    /*  0 = o
        1 = x*/
    this.player = 1;


    // reset the board
    $('.box').removeClass('box-filled-1');
    $('.box').removeClass('box-filled-2');

    // reset box backgrounds
    $('.box').css({
        'background-image': 'none'
    })

    // set the state
    this.changeState('start');
}

// called to chnge the game state and shown page
TicTacToe.prototype.changeState = function(_state) {
    this.state = _state;

    // hide all the pages
    $('#start').hide();
    $('#finish').hide();
    $('#board').hide();

    // show the correct one
    if (this.state == 'start') {
        $('#start').show();
    } else if (this.state == 'game') {
        $('#board').show();
    } else if (this.state == 'end') {
        $('#finish').show();
    }
}

// checks the board for a win or tie
TicTacToe.prototype.checkBoard = function() {
    var win = false;
    var tie = false;

    // convert the boxes to an array for easy processing
    var boxes = [];
    $('.box').each(function() {
        if ($(this).hasClass('box-filled-1'))
            boxes.push(0); // O
        else if ($(this).hasClass('box-filled-2'))
            boxes.push(1); // X
        else
            boxes.push(-1); // nothing
    })

    // check vertical matches
    for (var x = 0; x < 3; ++x) {
        var column = [
                boxes[x],
                boxes[x + 3],
                boxes[x + 6]
            ]
            // first check that the column doesn't have empty spaces
        if (column[0] == -1 || column[1] == -1 || column[2] == -1)
            continue;
        // then check if all the column items match
        if (column[0] == column[1] && column[1] == column[2] && column[0] == column[2]) {
            win = true;
            console.log('winc');
        }
    }

    // check horizontal matches
    for (var y = 0; y < 3; ++y) {
        var row = [
                boxes[(3 * y)],
                boxes[(3 * y) + 1],
                boxes[(3 * y) + 2]
            ]
            // first check that the row doesn't have empty spaces
        if (row[0] == -1 || row[1] == -1 || row[2] == -1)
            continue;
        // then check if all the row items match
        if (row[0] == row[1] && row[1] == row[2] && row[0] == row[2]) {
            win = true;
            console.log('winr');
        }
    }

    // check the diagonals
    // - \
    var diagonal1 = [
        boxes[0],
        boxes[4],
        boxes[8]
    ]

    if (diagonal1[0] != -1 || diagonal1[1] != -1 || diagonal1[2] != -1) {
        // check if all the items match
        if (diagonal1[0] == diagonal1[1] && diagonal1[1] == diagonal1[2] && diagonal1[0] == diagonal1[2]) {
            win = true;
            console.log('win\\');
        }
    }

    // - /
    var diagonal2 = [
        boxes[2],
        boxes[4],
        boxes[6]
    ]

    if (diagonal2[0] != -1 || diagonal2[1] != -1 || diagonal2[2] != -1) {
        // check if all the items match
        if (diagonal2[0] == diagonal2[1] && diagonal2[1] == diagonal2[2] && diagonal2[0] == diagonal2[2]) {
            win = true;
            console.log('win /');
        }
    }

    // check tie
    if (!win) {
        // tie is valid if there is no win and the board is filled
        if (boxes[0] != -1 && boxes[1] != -1 && boxes[2] != -1 &&
            boxes[3] != -1 && boxes[4] != -1 && boxes[5] != -1 &&
            boxes[6] != -1 && boxes[7] != -1 && boxes[8] != -1) {
            tie = true;
        }
    }

    if (win || tie) {
        if (win) {
            if (this.player == 1) {
                $('#finish').removeClass('screen-win-one');
                $('#finish').addClass('screen-win-two');
            } else if (this.player == 0) {
                $('#finish').removeClass('screen-win-two');
                $('#finish').addClass('screen-win-one');
            }

            $('.message').html("Winner!");
        } else if (tie) {
            $('#finish').removeClass('screen-win-two');
            $('#finish').removeClass('screen-win-one');
            $('#finish').addClass('screen-win-tie');
            $('.message').html("It's a tie!");
        }
        this.changeState('end');
    }
}

// called to go to the next turn
TicTacToe.prototype.nextTurn = function() {
    this.checkBoard();

    // increment the turn variable 
    ++this.turn;
    // if the player is 1 change it to 0, and if it's 0 change it to 1
    this.player = this.player == 0 ? 1 : 0;

    // true for 1
    if (this.player) {
        // highlight the correct player indicator
        $('#player2').addClass('active');
        $('#player1').removeClass('active');
    } else { // true for 0
        $('#player2').removeClass('active');
        $('#player1').addClass('active');
    }
}

var game = new TicTacToe();
// show the start page
game.changeState('start');

$('#start-game').click(function() {
    // show the board
    game.changeState('game');
    // call to start the first turn
    game.nextTurn();
});

// when a box is moused over 
$('.box').mouseenter(function() {
    // if the box isn't an already selected box
    if (!$(this).hasClass('box-filled-1') && !$(this).hasClass('box-filled-2')) {
        // add the hover background image
        if (game.player) {
            $(this).css({
                'background-image': 'url("img/x.svg")'
            })
        } else {
            $(this).css({
                'background-image': 'url("img/o.svg")'
            })
        }
    }
})

// when you click on one of the boxes
$('.box').click(function() {
    // if it hasn't been selected already
    if (!$(this).hasClass('box-filled-1') && !$(this).hasClass('box-filled-2')) {
        // select it
        if (game.player) {
            $(this).addClass('box-filled-2');
        } else {
            $(this).addClass('box-filled-1');
        }
        // and progress to the next turn
        game.nextTurn();
    }
})

// when the mouse leaves the box...
$('.box').mouseout(function() {
    // if it hasn't been selected...
    if (!$(this).hasClass('box-filled-1') && !$(this).hasClass('box-filled-2')) {
        // set the background image to nothing
        $(this).css({
            'background-image': 'none'
        })
    }
})

$('.screen-win .button').click(function() {
    // create a next game instance
    game = new TicTacToe();
})