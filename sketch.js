var dog;
var dogImg,happyDogImg;
var foodS,foodStock;
var lastFed;
var lastFed=0;
var database;
var fedTime;
var foodObj;
var feed,addFood;
var gameState = 0;
var changingGameState,readingGameState;
var bedroom_img,garden_img,washroom_img;
var sleeping_img,running_img;
var currentTime = 0;

function preload()
{
  dogImg = loadImage("dog.png");
  happyDogImg = loadImage("happy.png");
  bedroom_img = loadImage("bedroom.png");
  garden_img = loadImage("Garden.png");
  washroom_img = loadImage("washroom.png");
  sleeping_img = loadImage("Lazy.png");
  running_img = loadImage("running.png");

}

function setup() {

  database = firebase.database();

  createCanvas(1000,600);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
 
  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  })

  dog = createSprite(900,200,40,150);
  dog.scale = 0.3;
  dog.addImage("hungry",dogImg);
  dog.addImage("sleeping",sleeping_img);
  dog.addImage("running",running_img);

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
}


function draw() { 
  background(46,139,87);

  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  if(gameState!="hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{
    feed.show();
    addFood.show();
    dog.addImage()
  }

 
  fill(255,255,254);
  textSize(15);
  currentTime=hour();
  if(currentTime==(lastFed+1)){
    update("running");
    foodObj.garden();
  }else if(currentTime==(lastFed+2)){
    update("sleeping");
    foodObj.bedroom();
  }else if(currentTime>(lastFed+2)&& currentTime<=(lastFed+4)){
    update("bathing");
    foodObj.washroom();
  }else{
    update("hungry");
    foodObj.display();
  }

  drawSprites();

}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour(),
    gameState:"hungry"
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function update(){
  database.ref('/').update({
    gameState:gameState
  });
}



