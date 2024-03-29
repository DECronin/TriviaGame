$(document).ready(function () {
    var userChoice;
    var newGame = false;
    var listWord = [];
    var round = 0;
    var wins = 0;
    var loses = 0;
    var betweenRounds = true;
    var optionsLayout = false;
    var intervalId;
    var correct;
    var tempDiv = $("<div>");
    var time;
    var gif;
    var questions = {
        0: {
            q: 'What mythical creature with a rack and feathers is often described synonymously with the Wendigo?',
            a: ['Chupacabra', 'Gryffin', 'Harpie'],
            c: 'Ravenstag',
            gif: "<img src='./assets/images/ravenstag.gif'>"
        },
        1: {
            q: 'What title did the Halloween Classic: Hocus Pocus almost go by?',
            a: ['Skeleton Race', 'Witching Hour', 'Devils Three'],
            c: 'Halloween House',
            gif: "<img src='./assets/images/pocus-sisters.gif'>"
        },
        2: {
            q: 'In New England, what is the night before Halloween refered to as?',
            a: ['Hallows-Eve', 'Black Thursday', 'Pumpkin Moon'],
            c: 'Cabbage Night',
            gif: "<img src='./assets/images/cabbages.gif'>"
        },
        3: {
            q: 'What was the original celtic pronunciation of the day Halloween hails from?',
            a: ['Sam + Hain', 'Hal + W`hein', 'Hoal`oh + Eyne'],
            c: 'Saw + When' ,
            gif: "<img src='./assets/images/witches.gif'>"
        },
        4: {
            q: 'Which famous magician died on October 31?',
            a: ['David Copperfield', 'Madame DeLinsky', 'Ralf Bialla'],
            c: 'Harry Houdini' ,
            gif: "<img src='./assets/images/harry.gif'>"
        },
        5: {
            q: 'Who was the Irish myth inspired by that today we carve Jack`O`Lanterns?',
            a: ['Jack The Ripper', 'Unseelie Jack', 'Jack of the Hunt'],
            c: 'Stingy Jack',
            gif: "<img src='./assets/images/spoopy-pumpkin.gif'>"
        },
        6:{
            q: 'Which of the following is NOT a term for a scarecrow?',
            a: ['Hodmedod', 'Bwbach', 'Tattie Bogal'],
            c: 'Doodle Sack',
            gif: "<img src='./assets/images/scarecrow.gif'>"
        },
        7:{
            q: 'Where does the tradition of Bobbing For Apples originate?',
            a: ['Egypt', 'Southern Asia', 'American West'],
            c: 'Ancient Rome',
            gif: "<img src='./assets/images/apple-bob.gif'>"
        },
        8:{
            q: 'If you want to keep spirits out of your home on Halloween, what should you sprinkle on your doorstep?',
            a: ['Sage', 'Cinnamon', 'Garlic'],
            c: 'Salt',
            gif: "<img src='./assets/images/salt.gif'>"
        },
        9: {
            q: 'What was the first individually wrapped penny candy in America?',
            a: ['Smarties', 'Laffy Taffy', 'Caramel Creams'],
            c: 'Tootsie Rolls',
            gif: "<img src='./assets/images/candy.gif'>"
        },
    };

    display();
    $("#new-game").hide();
    var propOwn = Object.getOwnPropertyNames(questions);//creates simple array of objects first children
    shuffle(questions, propOwn.length);

    function timer() {
        if (!newGame){
            if (time > -1) {
                display();
                time--;
                intervalId = setTimeout(timer, 1000);
            }
            if (time == -1 && betweenRounds){
                newRound();
            } else if (time == -1 && !betweenRounds){
                loses++;
                endRound();
            }
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
            correct = questions[round].c;
            gif = questions[round].gif;
        }
        optionsLayout = true;
        $("#image").empty();
        $("#answers").empty();
        clearInterval(intervalId);
        betweenRounds = false;
        time = 15;
        countdownRunning = true;
        do {
            timer();
            gamePlay();
        } while (round < questions.length)
    }
    function endRound() {
        $("#answers").html(correct);
        $("#image").append(gif);
        round++;
        betweenRounds = true;
        clearInterval(intervalId);
        time = 5;
        timer();
        $(tempDiv).remove();
        if (round == propOwn.length){
            setTimeout(endGame, 5000);
        }
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
            $("#round").html("Round:<br><br>" + (1 + round));
        } else{
            if (round > 0) {
                $("#timer").html("<p> Round Over <br> Next Question in " + time + " Seconds </p>");
            }
        }
        if (optionsLayout) {
            $("#question").html(questions[round].q);
            shuffle(listWord, listWord.length);
            $(tempDiv).empty();
            for (i = 0; i < listWord.length; i++) {
                listWord[i].addClass("a");
                $(tempDiv).append(listWord[i]);
            }
            $("#answers").append(tempDiv);
        }
        $("#wins").html("Wins:<br>" + wins);
        $("#loses").html("Losses:<br>" + loses);   
    }
    function endGame(){
        newGame = true;
        shuffle(questions, propOwn.length);
        $("#new-game").hide();
        $("#start").show();
        listWord = [];
        betweenRounds = true;
        optionsLayout = false;
        round = 0;
        wins = 0;
        loses = 0;
        display();
        $("#question").empty();
        $("#round").empty();
        $("#answers").empty();
        $("#timer").empty(); 
        $("#image").empty();
    }
    $("#start").on('click', function () {
        newGame = false;
        $("#new-game").show();
        $("#start").hide();
        newRound();
    });
    $("#answers").on('click', function () {
        if (!betweenRounds) {
            userChoice = event.target.id;
            compare();
            endRound();
        }
    });
    $("#new-game").on('click', function(){ 
        endGame();
    });
});