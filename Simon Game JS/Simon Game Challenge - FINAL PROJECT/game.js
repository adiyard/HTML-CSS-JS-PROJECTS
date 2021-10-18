var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


$(document).keypress(function(){
    
    if(!started){
        $("#level-title").text("Level " + level);
        nextsequence();
        started=true;
    }
});

$(".btn").click(function(){

    var userChosenColour=$(this).attr("id");

    userClickedPattern.push(userChosenColour);

    //Check answer should be called

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});



function nextsequence()
{
    userClickedPattern = [];
    level++;

    $("#level-title").text("Level "+ level);

    var randomNumber=Math.floor(Math.random()*4);
    var randomColorChosen=buttonColors[randomNumber];

    gamePattern.push(randomColorChosen);
    
    $("#"+randomColorChosen).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomColorChosen);

    
}

function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour)
{
  $("#"+currentColour).addClass("pressed");

  setTimeout(function() {
    $("#"+currentColour).removeClass("pressed");
}, 100);
}

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        console.log("success");

        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function(){
                nextsequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press Any key to Restart");
         
        startOver();
    }
}

function startOver(){
    level = 0;
    started = false;
    gamePattern=[];
    userClickedPattern=[];
}