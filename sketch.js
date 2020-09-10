var monkey , monkey_running , monkey_collided;
var ground , groundImage, invisibeground;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var PLAY = 1;
var END = 0;
var score = 0;
var gameover , over;

function preload() {  
 monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png"  ,"sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png"  ,"sprite_7.png", "sprite_8.png")
  
 bananaImage = loadImage("banana.png");
 obstacleImage = loadImage("obstacle.png");
 over = loadImage("gameOver.png");
 monkey_collided = loadImage("sprite_0.png");             

}

function setup() {
  createCanvas(600, 400);
  ground = createSprite(300,390,600,10);
  ground.velocityX = -2;
  
  //created invisible sprite
  invisibleground = createSprite(300,370,600,10);
  invisibleground.visible = false;
  
  
  monkey = createSprite(40,350,20,10);
  monkey.addAnimation("running",monkey_running);
  monkey.addImage("collided",monkey_collided)
  monkey.scale = 0.10;
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup(); 
  
  //set collider for the monkey
  monkey.setCollider("circle",0,0,50);
  monkey.debug = false
}


function draw() {  
  background("lightblue");
  
  text("Score: "+ score, 400,50);
  
   if(keyDown("space") && monkey.y>330) {
        monkey.velocityY = -10;
    }
    
  if(ground.x <400){
     ground.x = 300;
   }
  if(ground.velocityX === -2){
    food();
    obstacles();

  }
    monkey.velocityY = monkey.velocityY + 0.8
  
    monkey.collide(invisibleground);
 
   
  drawSprites();
  
  if(monkey.isTouching(FoodGroup)){
     FoodGroup.destroyEach();
     score = score+2;
  }
    if(obstacleGroup.isTouching(monkey)){
      gameover = createSprite(300,200,40,10);
      gameover.addImage("game",over);
      gameover.scale = 0.5;
      ground.velocityX = 0;
      monkey.changeAnimation("collided",monkey_collided);
      monkey.velocityY = 0;
      obstacleGroup.setLifetimeEach(-1);
      FoodGroup.setLifetimeEach(-1);

       obstacleGroup.setVelocityXEach(0);
       FoodGroup.setVelocityXEach(0);    

    }
}


function food(){    
    if (frameCount % 80 === 0){
     banana = createSprite(600,300,40,10);
    banana.y = Math.round(random(270,350));
    //banana.x = Math.round(random())
    banana.addImage(bananaImage)
    banana.scale = 0.10;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 120;
    
    //adding cloud to the group
   FoodGroup.add(banana);
    }
} 

function obstacles(){
  if (frameCount % 300 === 0){
   obstacle = createSprite(385,365,10,40);
   obstacle.addImage("stone",obstacleImage);
   obstacle.velocityX = -5;
   obstacle.scale = 0.12;
   obstacle.lifetime = 120;
   obstacleGroup.add(obstacle);
  }
}