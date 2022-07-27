let index = 0;
let attempt=0;
let score=0;
let wrong=0;
let correctAns=0;
let questions=quiz.sort(function(){
    return 0.5-Math.random();
});




$(function(){
    //timer code start here....
    let totalTime= 300;
    let min=0;
    let sec=0;
    let counter=0;

    let timer=setInterval(function(){
        
        counter++;
        min=Math.floor((totalTime-counter)/60);  //calculating minute...
        sec= totalTime-(min*60)-counter;

        $(".timerbox span").text(min+":"+sec);

        if(counter==totalTime){

            alert("Time's up . Press ok to show the result.");
            result();
            clearInterval(timer);
        }

    },1000);    //timer set for 1 sec interval

    //timer code end here


    //print Question

    printQuestion(index);

});

//function to print question start...

function printQuestion(i){
    $(".questionbox").text(questions[i].question);
    $(".optionbox span").eq(0).text(questions[i].option[0]);
    $(".optionbox span").eq(1).text(questions[i].option[1]);
    $(".optionbox span").eq(2).text(questions[i].option[2]);
    $(".optionbox span").eq(3).text(questions[i].option[3]);
}

//functon to print question end...

//function to check answer start....

function checkAnswer(option){
    attempt++;

    let optionClicked= $(option).data("opt");


    if(optionClicked== questions[index].answer){
        $(option).addClass("right");
        score++;
        correctAns++;
    }else{
        $(option).addClass("wrong");
            score--;
            wrong++;
    }

    $(".scorebox span").text(score);


    $(".optionbox span").attr("onclick","");
}


//function for the next question.....

function showNext(){

    if(index >=(questions.length-1)){
        showResult(0);
        return;
    }
    index++;

    $(".optionbox span").removeClass();

    $(".optionbox span").attr("onclick","checkAnswer(this)");

    printQuestion(index);
}


//function for showResult.....

function showResult(j){
    
    if(j==1 && index<questions.length-1 && ! confirm("Quiz has not finished yet. Press ok to skip quiz and get your final result."))
    {
        return;
    }

    result();
}


//function result...
function result(){
    $("#questionScreen").hide();
    $("#resultScreen").show();

    $("#totalquestion").text(questions.length);
    $("#attemptquestion").text(attempt);
    $("#correctanswers").text(correctAns);
    $("#wronganswers").text(wrong);
    $("#totalscore").text(score);
}