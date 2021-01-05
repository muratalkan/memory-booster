 //tested on Chrome (version 79) and on Firefox (version 71.0) 

 function gamePlay(diffLevel) {

    var numArray =[], orderArr = [];
    var done = false;

    $("*.circle").off("click");

    for (var i = 0; i < 25; i++) { // 5*5
        $('.gameArea').append("<div class='circle' id="+i+"></div>").clone();
        numArray[i]= i ;
    }
    $("*.circle").css("visibility","hidden");

    for(var i = 0; i < diffLevel; i++) {
            var rnd = Math.floor(Math.random() * numArray.length);
           
            $("[id="+numArray[rnd]+"]").css("visibility","visible");
            
            orderArr[i] = numArray[rnd];
            numArray.splice(rnd,1);
    }   

    for(var i = 0; i < orderArr.length; i++){
        (function(i){
            setTimeout(function() {

               $("[id="+orderArr[i]+"]").append("<span>"+(i+1)+"</span>");
               $("[id="+orderArr[i]+"] > span").delay(1000).animate({opacity: 1.0},1000); 
               $("[id="+orderArr[i]+"] > span").fadeOut( 1000, function() {
                if (i == orderArr.length-1) {
                    done = true;
                    $("*.circle").css('cursor', 'pointer');
                } 

            });
          }, 2000 * i)
         })(i);
    }
 
    var i=0;

       $(".circle").click(function() {
            
            if(done) {
                $("[id="+orderArr[i]+"]").off("click");
                $("[id="+orderArr[i]+"]").css('cursor', 'default');

                var order = this.id;
                
                if(order == orderArr[i]) {
                    $(this).css('background-color', 'green');
                     if(i == orderArr.length-1) {
                        gameOver(diffLevel, "CONGRATULATIONS", "green", "You completed Level ");
                        resetGame(diffLevel);
                     }
                }
                else {
                    $(this).css('background-color', 'red');
                        gameOver(diffLevel, "FAILED", "red", "You failed in Level ");
                        resetGame(diffLevel);
                }
                  
                    i++;
            }
           
          });

    window.onblur = function() {// if the user changes current tab(inactive tab) then comes back, he/she can see all numbers on the boxes for a while. So, reloading the page only in animation part is a simple solution for that bug. 
        if(!done){ // if the all numbers are shown up, it will not reload the page. (also coverPage, gameOver will not be reloaded)
            location.reload();
         }
    };
    
}

function gameOver(diffLevel, msg, clr, msg2) {
    $("*.circle").off("click");
    $("*.circle").css('cursor', 'not-allowed');
    $(".gameOver > div:nth-of-type(1)").append("<h1>" + msg + "</h1>");
    $(".gameOver > div:nth-of-type(1)").css('color', '' + clr + '');
    $(".gameOver > div:nth-of-type(2)").append("<h3>" + msg2 + "(" + diffLevel + ")</h3>");
    $(".gameOver").css('visibility','visible').fadeIn(1000);     
}

function resetGame(diffLevel) { 
    $(window).keydown(function(e) {
        if(e.keyCode == 116) { // F5 will restart the game instead of refreshing page -> gameArea/gameOver fades out suddenly, and coverPage fades in 0.5 second.
            $('.gameArea .circle').remove();
            $(".gameOver").hide();
            $(".gameArea").css('visibility','hidden');
            $(".gameOver > div > h1").remove();  $(".gameOver > div > h3").remove();
            $(".coverPage").fadeIn(500);
            $( "#LevelBox option:selected" ).val(diffLevel); // sets the previous Difficulty Level
            e.preventDefault();
            $(this).unbind(e); //prevents spamming
        }
    });
   
}

$(function() { 

        $(".gameArea").css('visibility','hidden');
        $(".gameOver").hide();

        $(".coverPage").animate({
            left: '39%',
            height: '+=100px'
        }, 1000);

        $(".button").css('visibility','visible');

        $(".button img").click(function() {
            
            $(".coverPage").fadeOut(1000);
            $(".gameArea").css('visibility','visible').hide().fadeIn(1000)
            var diffLevel =  $( "#LevelBox option:selected" ).text();

            gamePlay(diffLevel);
            
        });

});