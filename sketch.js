var monkey , monkey_running;
var banana ,bananaImage, obstacle, STONE;
var FoodGroup, obstacleGroup;
var score;
var ground;

var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_end = loadAnimation("sprite_0.png");
  
  FOOD = loadImage("banana.png");
  STONE = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,300);
  
  monkey=createSprite(60,221,1,1);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("END",monkey_end);
  monkey.scale=0.15;
  
  ground = createSprite(300,270,1200,10);
  ground.x = ground.width /2;

  
  obstaclesGroup = createGroup();
  foodGroup = createGroup();
 
  score=0;
  
}


function draw() {
  
  background("white");
  textSize(20);
  text("Survial Time: "+ score, 400,40);
  
  monkey.collide(ground);
  
  if(gameState === PLAY){

    ground.velocityX = -4 
    
    score = Math.ceil(frameCount/getFrameRate());
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
  
    if(keyDown("space")&& monkey.y >= 218) {
        monkey.velocityY = -14;
    }
    
    monkey.velocityY = monkey.velocityY + 0.6
    
     obstacles();
     food();
    
    if (foodGroup.isTouching(monkey)){
     
      foodGroup.destroyEach();
    }
  
    
    if(obstaclesGroup.isTouching(monkey)){
        
        gameState = END;
     }  
  }
    else if (gameState === END) {
      
     
    ground.velocityX = 0;
    monkey.velocityY = 0;
      
    monkey.changeAnimation("END",monkey_end)
      
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
  
    obstaclesGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);    
 
  }
  
  
 

  drawSprites();
}

function obstacles(){
  
  if (frameCount % 300 === 0){
    
    obstacle = createSprite(600,240,10,40);
    obstacle.addImage("obstacle",STONE)
    obstacle.velocityX = -6 
              
    obstacle.scale = 0.17;
    obstacle.lifetime = 300;
   
    obstaclesGroup.add(obstacle);
 }
}

function food(){
 
  if (frameCount % 80 === 0){
  
    banana = createSprite(600,Math.round(random(120,200)),1,1);
    banana.addImage("food",FOOD);
    banana.velocityX = -6;
    
    banana.scale = 0.1;
    banana.lifetime = 100;
    
    foodGroup.add(banana);
  }
}