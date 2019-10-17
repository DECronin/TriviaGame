$(document).ready(function () {
    var userChoice;
    var listWord = [];;
    var round = 0;
    var wins = 0;
    var loses = 0;
    var betweenRounds = true;
    var optionsLayout = false;
    var intervalId;
    var correct;
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
            q: 'In New England, what is the night before Halloween refered to as?',
            a: ['Hallows-Eve', 'Black Thursday', 'Pumpkin Moon'],
            c: 'Cabbage Night' 
        },
        3: {
            q: 'What was the original celtic pronunciation of the day Halloween hails from?',
            a: ['Sam + Hain', 'Hal + W`hein', 'Hoal`oh + Eyne'],
            c: 'Saw + When' 
        },
        4: {
            q: 'Which famous magician died on October 31?',
            a: ['David Copperfield', 'Madame DeLinsky', 'Ralf Bialla'],
            c: 'Harry Houdini' 
        },
        5: {
            q: 'Who was the Irish myth inspired by that today we carve Jack`O`Lanterns?',
            a: ['Jack The Ripper', 'Unseelie Jack', 'Jack of the Hunt'],
            c: 'Stingy Jack'
        },
    };

    display();
    var propOwn = Object.getOwnPropertyNames(questions);//creates simple array of obkects first children
    shuffle(questions, propOwn.length);

    function timer() {
        if (time > 0) {
            display();
            time--;
            intervalId = setTimeout(timer, 1000);
        } else {
            // loses++;
        }
    }

    function shuffle(a, i) {
        for (i > 0; i--;) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
    }

    function newRound() {
        if (!optionsLayout){
            $("#image").empty();
            $("#answers").empty();
        }
        optionsLayout = true;
        $("#image").empty();
        $("#answers").empty();
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
        time = 15;
        timer();
        setTimeout(newRound, 15000);
        clearInterval(intervalId);
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
        correct = questions[round].c;
        if (userChoice == correct) {
            wins++;
        } else {
            loses++;
        }
        display();
    }

    function display() {
        if (!betweenRounds) {
            $("#timer").html(time);
            $("#round").html("Round:<br>" + (1 + round));
        } else{
            $("#round").html("Round:");
            if (round > 0) {
                $("#timer").html("<p> Round Over <br> Next Question in " + time + " Seconds </p>");
            }
        }
        if (optionsLayout) {
            $("#question").html(questions[round].q);
            shuffle(listWord, listWord.length);
            $(tempDiv).empty();
            for (i = 0; i < listWord.length; i++) {
                $(tempDiv).append(listWord[i]);
            }
            $("#answers").append(tempDiv);
        }
        $("#wins").html("Wins:<br>" + wins);
        $("#loses").html("Losses:<br>" + loses);   
    }

    $("#start").on('click', function () {
        $("#start").hide();
        newRound();
    });

    $("#answers").on('click', function () {
        if (!betweenRounds) {
            userChoice = event.target.id;
            compare();
            endRound();
            // $("#image").src(questions[round].gif);
            $("#answers").html(correct);
        }
    });
});
// new game function instead of refreshing page