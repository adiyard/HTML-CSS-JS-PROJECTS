score=0;
cross=true;

audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play()
}, 1000);


$(document).keydown(function(event){

    // console.log(event.keyCode);

    if(event.keyCode === 38)
    {
        $(".dino").addClass("moveDino");
        setTimeout(() => {
            $(".dino").removeClass("moveDino");
        }, 700);
    }
    
    

    if(event.keyCode === 39)
    {
        var position = $(".dino").position();
        $(".dino").css('left',position.left+150+"px");
    }

    if(event.keyCode === 37)
    {
        var position = $(".dino").position();
        $(".dino").css('left',position.left-150+"px");
    }
});

setInterval(() => {
    var dinoPos =  $(".dino").position();
    var obsPos = $(".obstracle").position();

    var offsetX = Math.abs(parseInt(dinoPos.left) - parseInt(obsPos.left));
    var offsetY = Math.abs(parseInt(dinoPos.top) - parseInt(obsPos.top));

    // console.log(offsetY);

    if(offsetX <73 && offsetY<52)
    {
        $(".gameOver").text("Game Over, Reload the page to play again");
        $(".obstracle").removeClass("obstracleAni");
        score=score-1;
        updateScore(score);
        // audio.pause();
    }
    else if(offsetX < 150 && cross)
    {
        score=score+1;
        cross=false;
        updateScore(score);

        setTimeout(() => {
            cross=true;
        }, 1000);

        setTimeout(() => {
            var aniDur = $(".obstracleAni").css('animation-duration');
        console.log(parseFloat(aniDur));
        aniDur=parseFloat(aniDur)-0.1;
        aniDur=aniDur+"s";
        $(".obstracleAni").css('animation-duration',aniDur);
        }, 300);
    }


}, 10);

function updateScore(score){
    $(".Score").text("Score:"+score);
}