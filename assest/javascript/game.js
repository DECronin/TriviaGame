$(document).ready(function () {
    var userChoice;
    var listWord = [];;
    var round = 0;
    var wins = 0;
    var loses = 0;
    var countdownRunning;
    var betweenRounds = true;
    var optionsLayout = false;
    var intervalId;
    var tempDiv = $("<div>");
    var time;
    var questions = {
        0: {
            q: 'What mythical creature with a rack and feathers is often described synonymously with the Wendigo?',
            a: ['Chupacabra', 'Gryffin', 'Harpie'],
            c: 'Ravenstag' 
        },
        1: {
            q: 'What title did the Halloween Classic: Hocus Pocus almost go by?',
            a: ['Skeleton Race', 'Witching Hour', 'Devils Three'],
            c: 'Halloween House' 
        },
        2: {
            q: 'q3',
            a: ['a1', 'a2', 'a3'],
            c: 'a4' 
        },
        3: {
            q: 'q4',
            a: ['a1', 'a2', 'a3'],
            c: 'a4' 
        },
        4: {
            q: 'q5',
            a: ['a1', 'a2', 'a3'],
            c: 'a4' 
        },
        5: {
            q: 'q6',
            a: ['a1', 'a2', 'a3'],
            c: 'a4' 
        },
    };

    display();
    shuffle(questions);

    function timer() {
        if (time > 0 && countdownRunning) {
            display();
            time--;
            intervalId = setTimeout(timer, 1000);
        } else {
            loses++;
        }
    }

    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    function newRound() {
        clearInterval(intervalId);
        setTimeout(endRound, 30000);
        betweenRounds = false;
        time = 30;
        countdownRunning = true;
        do {
            timer();
            gamePlay();
        } while (round < questions.length)
    }

    function endRound() {
        round++;
        betweenRounds = true;
        countdownRunning = false;
        clearInterval(intervalId);
        if (round > 0) {
            $("#timer").html("<p> Round Over <br> Click Start Again For Next Question </p>");
        }
        $(tempDiv).remove();
    }

    function gamePlay() {
        for (i = 0; i < questions[round].a.length; i++) {
            listWord[i] = $(`<li>`);
            $(listWord[i]).html(questions[round].a[i]);
            $(listWord[i]).attr('id', questions[round].a[i]);
        }
        listWord[3] = $(`<li>`);
        $(listWord[3]).html(questions[round].c);
        $(listWord[3]).attr('id', questions[round].c);
        display();
        optionsLayout = false;
    }

    function compare() {
        if (userChoice == questions[round].c) {
            wins++;
        } else {
            loses++;
        }
        display();
    }

    function display() {
        if (!betweenRounds) {
            $("#timer").html(time);
        }
        if (optionsLayout) {
            $("#question").html(questions[round].q);
            shuffle(listWord);
            $(tempDiv).empty();
            for (i = 0; i < listWord.length; i++) {
                $(tempDiv).append(listWord[i]);
            }
            $("#answers").append(tempDiv);
        }
        $("#wins").html("Wins: " + wins);
        $("#loses").html("Losses: " + loses);
        $("#round").html("Round: " + (1 + round));
    }

    $("#start").on('click', function () {
        if (betweenRounds) {
            optionsLayout = true;
            newRound();
        }
    });

    $("#answers").on('click', function () {
        if (!betweenRounds) {
            userChoice = event.target.id;
            compare();
            endRound();
        }
    });
});