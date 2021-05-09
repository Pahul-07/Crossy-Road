var grid = 50;
var width = 1366;
var carGroup1,logGroup1;
var grassHeight = 100;
var gameState = PLAY;
var carAnimation, logAnimation, playerAnimation;
var school;
var city;
var PLAY=0;
var WIN =1;
var LOSE=2;

function preload(){

  carAnimation1 = loadAnimation("images/car1.png");
  carAnimation2 = loadAnimation("images/car2.png");
  playerAnimation=loadAnimation("images/Player-03.png");
  logAnimation1 = loadAnimation("images/log1.png");
  logAnimation2 = loadAnimation("images/log2.png");
  cityAnimation = loadAnimation("images/city2.png");
}

function setup() {
  createCanvas(1366,2400);
  carGroup1 = new Group();
  logGroup1 = new Group();

  //grasses where players can rest
  for (var i=0; i<6; i++){
    var bottomGrass1 = createSprite(683,height-50-(i*400),width,grassHeight);
    if (i%2===0){
      var road = createSprite(683,height-150-(i*400)-grassHeight,width,300,);
      road.shapeColor = "black";
    }
    bottomGrass1.shapeColor = "green";
  }

  //to create rows of car
  for(var i= 0; i<25; i++){
    car = new Car(2);
    carGroup1.add(car.spt);
  }

  //to create rows of log
  for(var i=0; i<25; i++){
    log = new Log(-2);
    logGroup1.add(log.spt);
  }

  //create player
  player = new Player(width/2, height-75);
  player.spt.addAnimation("player",playerAnimation);
  player.spt.scale=0.13;

  //create city  
  city=createSprite(width/2,0);
  city.addAnimation("city", cityAnimation);
  city.scale=3;

  player.spt.depth=city.depth;
  player.spt.depth=player.spt.depth+1
}



function draw() {
  background("skyblue");

  //move the screen to location of player.
  translate(0,-player.spt.y+height-150);

  //making the logs reappear 
  for(var i=1; i<carGroup1.length; i++){
    if(carGroup1[i].x>width){
      carGroup1[i].x=0;
    }
    if(carGroup1[i].x<0){
      carGroup1[i].x=width;
    }
  } 
   
  //making the logs reappear 
  for(var i=1; i<logGroup1.length; i++){
    if(logGroup1[i].x>width){
      logGroup1[i].x=0;
    }
    
    if(logGroup1[i].x<0){
      logGroup1[i].x=width;
    }
  }

  if(carGroup1.isTouching (player.spt)){
    player.spt.x = width/2; 
    player.spt.y = height-75;
  }

  if(logGroup1.isTouching (player.spt)){
    player.spt.x= player.spt.x-3;
  }
    
  else if((player.spt.y > height-1550 && player.spt.y < height-1300) ||(player.spt.y <height-500 && player.spt.y > height-850)||(player.spt.y>height)||(player.spt.x<0)||(player.spt.x>width)){
    player.spt.x = width/2;
    player.spt.y = height-75;
  }

  if(player.spt.isTouching(city)){
    gameState=WIN;
  }

  if(gameState === WIN) {
    stroke ("Red");
    fill("Green");
    textSize(80);
    text("YAY!! You did it.🥳🥳",width/2-400,-800);
    carGroup1.destroyEach();
    logGroup1.destroyEach();  
  }

  drawSprites();
}

function keyPressed(){
  if(keyCode == UP_ARROW){
    player.move(0,-2);
  }

  else if(keyCode == DOWN_ARROW){
    player.move(0,2);
  }

  else if(keyCode == LEFT_ARROW){
    player.move(-2,0);
  }

  else if(keyCode == RIGHT_ARROW){
    player.move(2,0);
  }
}
