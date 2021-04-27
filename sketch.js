var PLAY=1;
var END = 0;
var gameState=PLAY;
var score=0;
var score2=0;

function preload (){
   trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  ground_image=loadImage("ground2.png");
  cloud=loadImage("cloud.png");
  cactus1=loadImage("obstacle1.png");
  cactus2=loadImage("obstacle2.png");
  cactus3=loadImage("obstacle3.png");
  cactus4=loadImage("obstacle4.png");
  cactus5=loadImage("obstacle5.png");
  cactus6=loadImage("obstacle6.png");
  trex_collided=loadImage("trex_collided.png");
  gameOveri=loadImage("gameOver.png");
  restart_i=loadImage("restart.png");
}

function setup(){
  createCanvas(600,200)
  trex=createSprite(200,160);
  trex.addAnimation("running",trex_running);
  trex.addImage("collided",trex_collided);
  trex.scale = 0.5;
  ground=createSprite(300,180,600,20);
  ground.addImage("ground",ground_image)
  ground.x=ground.width/2
  ground2=createSprite(300,190,600,20);
  ground2.visible=false;
  obstacleGroup=new Group()
  cloudGroup=new Group()
  gameOver=createSprite(300,80);
  gameOver.addImage("over",gameOveri)
  gameOver.visible= false;
  restart=createSprite(300,120);
  restart.addImage(restart_i)
  restart.visible=false;
  restart.scale=0.7;
}

function draw(){
  background("BLACK");
  
  if (gameState===PLAY){
           if(keyDown("space")&&trex.y>=147.1){
           trex.velocityY=-12;
           }

        if(trex.isTouching(obstacleGroup)){
           gameState=END;
           }
        trex.velocityY=trex.velocityY+0.8;
        ground.velocityX=-2;


        if(ground.x<0){
           ground.x=ground.width/2;
           }

    score=score+0.2;
    score2=Math.round(score)
        console.log(trex.y)

        clouds()
        obstacle()
   }
  
  else if(gameState=== END){
    ground.velocityX=0;
   obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    trex.changeImage("collided",trex_collided);
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    gameOver.visible=true;
    restart.visible=true;
    trex.velocityY=0;
    if(mousePressedOver(restart)){
      reset()
    }
  }
 
  text("score:"+score2,500,50);
   trex.collide(ground2); 
  drawSprites()
}

function clouds(){
  if(frameCount%80===0){
    var clouds = createSprite(600,random(20,120),10,10);
clouds.velocityX=-5;
 clouds.addImage("cloud",cloud);
    clouds.scale=0.6;
  clouds.lifetime=610/5; 
  trex.depth=clouds.depth+1;
    cloudGroup.add(clouds);
}  
  
}

function obstacle(){
  if(frameCount%100===0){
    var obstacle = createSprite(600,160,10,10);
    obstacle.velocityX=-4;
    var rand=  Math.round(random(1,6))
    switch(rand){
      case 1 : obstacle.addImage(cactus1);
        break;
        case 2 : obstacle.addImage(cactus2);
        break;
        case 3 : obstacle.addImage(cactus3);
        break;
        case 4 : obstacle.addImage(cactus4);
        break;
        case 5 : obstacle.addImage(cactus5);
        break;
    case 6 : obstacle.addImage(cactus6);
        break;
    }
    obstacle.scale=0.6;
    obstacle.lifetime=610/4
    obstacleGroup.add(obstacle);
  }
}
function reset(){
  score=0;
  trex.changeAnimation("running",trex_running);
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  gameOver.visible=false;
  restart.visible=false;
  gameState=PLAY;
  
}
