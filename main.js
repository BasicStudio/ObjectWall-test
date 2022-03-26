var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var listOBJX = [];
var listOBJY = [];

function addToList(x, y){
    listOBJX.push(x)
    listOBJY.push(y)
}

//x and y for character
var charX = 10;
var charY = 10;
var xvel = 10;
var yvel = 10;
var radius = 38 
var Rhitbox = (charX + 20);
var Bhitbox = (charY + 20);

//makes a circle
function circle(linewidth, strokeColor, x, y, size){
    context.beginPath();
    context.lineWidth = linewidth;
    context.strokeStyle = strokeColor;
    context.arc(x, y, size, 0, 2 * Math.PI, false);
    context.stroke();
}

//clear canvas
function clearCanvas(){
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function renderOBJ(){
    //player
    circle(5, "blue", charX, charY, 20)

    //Object
    circle(5, "red", canvas.width/2-5, canvas.height/2-5, 20)
    circle(5, "red", 200, 200, 20)
    //console.log(getDistance(charX, charY, canvas.width/2-5, canvas.height/2-5))
}

//list of objects and there cordnet values
addToList(canvas.width/2-5, canvas.height/2-5)
addToList(200, 200)

renderOBJ();

//get distance between squares
function getDistance(x1, y1, x2, y2){
    let xDistance = x2 - x1
    let yDistance = y2 - y1

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
}

//Boundaries
function checkPos(direction){
    for (let i = 0; i < listOBJX.length; i++) {
        distance = getDistance(charX, charY, listOBJX[i], listOBJY[i])
        console.log(distance)
        if(direction == "left"){
            if(charX == 0){
                charX += xvel
            }
            if(distance <= radius){
                charX += xvel
            }
        }
        if(direction == "right"){
            if(Rhitbox == canvas.width){
                charX -= xvel
            }
            if(distance <= radius){
                charX -= xvel
            }
        }
        if(direction == "up"){
            if(charY == 0){
                charY += yvel
            }
            if(distance <= radius){
                charY += yvel
            }
        }
        if(direction == "down"){
            if(Bhitbox == canvas.height){
                charY -= yvel
            }
            if(distance <= radius){
                charY -= yvel
            }
        }
    }
}

//Keys to move
addEventListener('keydown', function(e){
    //up
    if(e.keyCode == 87){
        charY -= yvel;
        checkPos("up")
    }
    //down
    else if(e.keyCode == 83){
        charY += yvel;
        checkPos("down")
    }
    //left
    else if(e.keyCode == 65){
        charX -= xvel;
        checkPos("left")
    }
    //right
    else if(e.keyCode == 68){
        charX += xvel;
        checkPos("right")
    }
})

//every 16 milsecs updates 1 frame aka 60 fps
var fps = setInterval(updateFrame, 16)

updateFrame();

function updateFrame(){
  clearCanvas();
  //bottom right hitbox
  Rhitbox = (charX + 20)
  Bhitbox = (charY + 20)
  renderOBJ();
}