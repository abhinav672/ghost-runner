var PLAY=1;
var END=0;
var gameState=PLAY;
var tower,towerImage;
var door,doorImage,doorsGroup;
var climber,climberImage,climbersGroup;
var ghost,ghostImage;
var invisibleClimber,invisibleClimbersGroup;
var sound;

function preload(){
  towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  ghostImage=loadImage("ghost-standing.png")
  sound=loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  sound.loop();
  
  tower=createSprite(300,300,5,5);
  tower.addImage("tower",towerImage);
  tower.velocityY=1;
  
  ghost=createSprite(300,300,5,5);
  ghost.addImage("ghost",ghostImage);
  ghost.scale=0.5;
  
  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleClimbersGroup=new Group();
}

function draw(){
  background(0);
 if(gameState===PLAY){
   
  
  if(tower.y>600){
    tower.y=300;
  }
  
  if(keyDown("space")){
  ghost.velocityY=-5;    
  }
  
  ghost.velocityY=ghost.velocityY+0.5;
  
  if(keyDown("left")){
    ghost.x=ghost.x-3;
  }
  
  if(keyDown("right")){
    ghost.x=ghost.x+3;
  }
  
  if(ghost.isTouching(climbersGroup)){
    ghost.velocityY=0;
  }
  
  if(invisibleClimbersGroup.isTouching(ghost)|| ghost.y>600){
    ghost.destroy();
  }
  spawnDoors();
  
  drawSprites();
 }
  
  if(gameState===END){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over",230,250);
  }
}

function spawnDoors(){
  if(frameCount%250===0){
    door=createSprite(200,-50,5,5);
    door.addImage("door",doorImage);
    climber=createSprite(200,10,5,5);
    climber.addImage("climber",climberImage);
    invisibleClimber=createSprite(200,10,5,2);
    invisibleClimber.width=climber.width;
    
    door.x=Math.round(random(100,400));
    door.velocityY=1;
    
    climber.x=door.x
    climber.velocityY=1;
    
    invisibleClimber.x=door.x;
    invisibleClimber.velocityY=1;
    
    door.lifetime=800;
    climber.lifetime=800;
    
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    
    invisibleClimber.debug=true;
    
    
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleClimbersGroup.add(invisibleClimber);
  }
}