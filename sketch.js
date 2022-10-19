var rain,pipe,water,acid,restart,gameOver;
var rainImg,pipeImg,waterImg,acidImg,restartImg,gameOverImg;
var waterCollected = 0;
var waterGroup, acidGroup;

//Game States
var Play = 1;
var End = 0;
var gameState = Play;


function preload(){
rainImg = loadImage("rain background.png")
pipeImg = loadImage("Pipe.png");
waterImg = loadImage("blue_drop.png");
acidImg = loadImage("green_drop.png");
restartImg = loadImage("restart.png");
gameOverImg = loadImage("GameOver.png");
}

function setup() {
 createCanvas(windowWidth,windowHeight);
 rain = createSprite(width/2,200);
 rain.addImage(rainImg);
 rain.velocityY = 12;
 rain.scale = 2.5;

 restart = createSprite(width/2,height/2+35);
 restart.addImage(restartImg);
 restart.visible = false;

 gameOver = createSprite(width/2,height/2);
 gameOver.addImage(gameOverImg);
 gameOver.visible = false;

 pipe = createSprite(width/2, height-20,20,20);
 pipe.addImage(pipeImg);
 
 waterGroup = new Group();
 acidGroup = new Group();

}



function draw() {
 
 if(gameState === Play){

 background("white");
 pipe.x = World.mouseX;


 edges = createEdgeSprites();
 pipe.collide(edges);

 if (rain.y > 600){
    rain.y = windowHeight/2;
  }
  createAcid();
  createWater();
  restart.depth = rain.depth+1;
  gameOver.depth = restart.depth;

  if(waterGroup.isTouching(pipe)){
    waterGroup.destroyEach();
    waterCollected = waterCollected+1;
  }
  

  if(acidGroup.isTouching(pipe)){
    acidGroup.destroyEach();
    gameState = End;
 
  }

  if(gameState === End){
    waterGroup.destroyEach();
    acidGroup.destroyEach();

    restart.visible = true
    gameOver.visible = true;

    waterGroup.setVelocityEach(0);
    acidGroup.setVelocityEach(0);

    pipe.x = width/2;
    pipe.velocityX = 0;

    rain.velocityY = 0;

    if(mousePressedOver(restart)){
        gameState = Play;
        restart.visible = false;
        gameOver.visible = false;

    }
    
  }
 }
 
 drawSprites();

 textSize(20);
  fill(255);
  text("Water Collected: "+ waterCollected,width-185,30);
}

function createWater(){
    if(frameCount % 50 == 0){
        var water = createSprite(Math.round(random(50, windowWidth-50),40, 10, 10));
    water.addImage(waterImg);
  water.scale=0.1;
  water.velocityY = 5;
  water.lifetime = 200;
  waterGroup.add(water);
    }
}

function createAcid(){
    if(frameCount % 30 == 0){
        var acid = createSprite(Math.round(random(50, windowWidth-50),40, 10, 10));
    acid.addImage(acidImg);
  acid.scale=0.1;
  acid.velocityY = 5;
  acid.lifetime = 200;
  acidGroup.add(acid);
    }
}













