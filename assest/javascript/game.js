$(document).ready(function () {
    // Global Variables
    var round = 0;
    var wins = 0;
    var loses = 0;
    var selQ; //selected question
    var countdownRunning;
    var intervalId;
    var time;
    var prevQ = {}; //empty obvect for previous rounds
    var questions = {
        0: {
            q: 'q1', //question being asked
            a: ['0a1', '0a2', '0a3'], //options
            c: '0a4' //correct answer
        },
        1: {
            q: 'q2', //question being asked
            a: ['1a1', '1a2', '1a3'], //options
            c: '1a4' //correct answer
        },
        2: {
            q: 'q2', //question being asked
            a: ['a1', 'a2', 'a3'], //options
            c: 'a4' //correct answer
        },
        3: {
            q: 'q3', //question being asked
            a: ['a1', 'a2', 'a3'], //options
            c: 'a4' //correct answer
        },
        4: {
            q: 'q4', //question being asked
            a: ['a1', 'a2', 'a3'], //options
            c: 'a4' //correct answer
        },
        5: {
            q: 'q5', //question being asked
            a: ['a1', 'a2', 'a3'], //options
            c: 'a4' //correct answer
        },
        6: {
            q: 'q6', //question being asked
            a: ['a1', 'a2', 'a3'], //options
            c: 'a4' //correct answer
        },
    };

    shuffle(questions);
    // make array/object of questions
    //shuffle?
    // create answers? ======= & images?
    //shuffle?

    function timer() {
        if (time > 0){
            display();
            time--;
            intervalId = setTimeout(timer, 1000);
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
        console.log("newRound()");
        do{
            time = 30;
            countdownRunning = true;
            timer();
            // compare();
            // display();
            console.log(round);
        }while(round < questions.length)
        
    }

    function endRound(){
        clearInterval(intervalId);
        if (round > 0){
            $("#timer").html("<p> Round Over <br> Click Anywhere For Next Question </p>");
        }
        countdownRunning = false;
    }

    function compare() {

    }

    function display() {
        if (countdownRunning) {
            console.log(time);
            $("#timer").text(time);
        }
        
        

    }

    // select question to display
    // determine correct vs incorrect
    // display question options

    // incriment/decrease time

    // if time runs out display correct answer and move on to newRound
    //loses++

    // onClick compare answer to correct vs incorrect
    //losses or wins ++

    //display image?
    //round++
    //reset timer

    // next question

    $("#start").on('click', function(){
        countdownRunning = false;
        newRound();
        round++;
    });

    $("#answers").on('click', function(){
        console.log("answer / end round");
        endRound();
    });

    $(document).on('click', function(){
        if (!countdownRunning){
            newRound();
        }
    });


});