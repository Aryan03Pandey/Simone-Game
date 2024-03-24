const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

$(document).keypress(()=>{
    if(!started){
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$("div.btn").click((event) => {
    if(started){
        let userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);

    let audio = new Audio("sounds/" + userChosenColor + ".mp3");
    animatePress(userChosenColor);
    audio.play();
    checkAnswer(userClickedPattern.length-1);
    }
})

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");

    setTimeout(() => {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function checkAnswer(currentLevel){
    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {  
        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){
  
          //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
      } else {
        (new Audio("sounds/wrong.mp3")).play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over. Press any key to Restart");
        startOver();
      }
}




//generate a random number between 0 and 3
function nextSequence(){
    userClickedPattern = [];

    level++;
    $("h1").text("Level "+level);

    const randomNumber = Math.floor(Math.random()*4);

    //select a color based on the random number
    const randomChosenColor = buttonColors[randomNumber];
    //add color to the game pattern
    gamePattern.push(randomChosenColor);

    //Select the button with id as randomChosenColor
    $("#"+randomChosenColor).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
    let audio = new Audio("sounds/" + randomChosenColor + ".mp3");
    audio.play();
}