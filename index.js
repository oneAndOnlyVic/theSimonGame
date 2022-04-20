var allBoxes = document.querySelectorAll(".box");
var random = Math.floor(Math.random() * allBoxes.length);
var boxesToBeClicked = [];
var gameState = "start";
var gameStage = 1;
var num = 0;

var preStart = new Audio("audio/start.wav");

var newStage = new Audio("audio/arcade-bleep-sound-6071.mp3");
var gameOver = new Audio("audio/game-over-arcade-6435.mp3");

preStart.play();




document.addEventListener("keypress",function (){

    if(gameState === "restart" || gameState === "start" )
    {
        
        addToArray(allBoxes[random]); //added an item to array
        animateArray(boxesToBeClicked); //animate array
        gameState = "game"
        document.querySelector("h1").classList.remove("blink");
        document.querySelector("h1").textContent = "stage " + gameStage;

        
        newStage.play();
    }

    
})

keepBlinking();




allBoxes.forEach(element => {
    element.addEventListener("click", function(){
        
        var obj = this;
        var newRandom = Math.floor(Math.random() * allBoxes.length);

       

      
      if(gameState === "game")
      {
       
        playSoundOnClick(obj);


        animateOnClick(obj);

        if(obj === boxesToBeClicked[num])
        {
            console.log("correct")
            

            if(num == boxesToBeClicked.length - 1)
            {
                addToArray(allBoxes[newRandom]);
                num = 0

                gameStage++;
                document.querySelector("h1").textContent = "stage " + gameStage;
                
                //play sound when enter into a new stage
                var audio = new Audio("audio/arcade-bleep-sound-6071.mp3");
                audio.play();
                //show all the boxes to be clicked in the new stage
                animateArray(boxesToBeClicked);

            }
            else{
                num++;
            }
        }
        else
        {
            boxesToBeClicked = [];
            // boxesToBeClicked.push(allBoxes[newRandom]);
            num = 0;
            gameStage = 1;
            quickred(document.querySelector("body"));
            document.querySelector("h1").textContent = "Wrong!!! press any key to restart";
            gameOver.play();
            gameState = "restart";

            

            
        }

       
      }
        
    })
});



function playSoundOnClick(obj) {
    if (obj === allBoxes[0]) {
        var greenSound = new Audio("audio/green.wav");
        greenSound.play();
    }
    else if (obj === allBoxes[1]) {
        var redSound = new Audio("audio/red.wav");
        redSound.play();
    }
    else if (obj === allBoxes[2]) {
        var yellowSound = new Audio("audio/yellow.wav");
        yellowSound.play();
    }
    else if (obj === allBoxes[3]) {
        var purpleSound = new Audio("audio/purple.mp3");
        purpleSound.play();
    }
}

function animateOnClick(obj) {
    obj.classList.add("blink");

    setTimeout(function () {
        obj.classList.remove("blink");
    }, 100);
}

function addToArray(arr) {
    boxesToBeClicked.push(arr);
}

function animateArray(arr) {

  for (let i = 0; i < arr.length; i++) {

    setTimeout(function(){
        arr[i].classList.add("blink"); 
    },300 * i + 1000 );
    
    setTimeout(function(){
        arr[i].classList.remove("blink"); 
    },300 * i + 1200);
  }

    
}

function keepBlinking()
{
   
        setInterval(function(){
            if(gameState === "start" || gameState === "restart")
            {
            document.querySelector("h1").classList.toggle("blink");
            
        }
        },100);
   
}

function quickred(a){
  
      a.classList.toggle("wrong");
  
  setTimeout(function () {
    a.classList.toggle("wrong");
}, 200);
}

