var gameState=1
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;


function preload(){
  
  bgi = loadImage("jungle.jpg")
 monkey_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("stone.png");
  
}



function setup() {

  createCanvas(800,400)
  bg = createSprite(400,200,800,400);
  bg.addImage(bgi)
  bg.scale=1.5;
 
  bg.x = bg.width /2;
  
  monkey=createSprite(80,315,20,20); 
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;

  ground= createSprite(400,350,900,10);
  //ground.velocityX=-4; 
  

  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
}


function draw() {
  
background(0);

if(gameState===1){
  bg.velocityX=-3
if (bg.x<0){
  bg.x=bg.width/2;
}
  
if(keyDown("space")) {
   monkey.velocityY = -12;
}
   monkey.velocityY = monkey.velocityY + 0.8

spawnFood();
    spawnObstacles();
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
      score=score+1;
      monkey.scale+=0.01

    }

 if(obstaclesGroup.isTouching(monkey)){
        gameState=0;
    }
}


else if(gameState===0){
ground.velocityX = 0;
        monkey.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
        obstaclesGroup.destroyEach();
        FoodGroup.destroyEach();
        bg.setVelocity(0,0)
        monkey.destroy();
        reset();
}
   monkey.collide(ground);
   
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
}



function spawnFood() {

  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
     
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(600,320,10,40);
    obstacle.velocityX = -6;
    
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
       
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }
}

function reset() {
  
  
}