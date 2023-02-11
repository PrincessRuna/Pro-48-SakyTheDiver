var PLAY = 1;
var END = 0;
var gameState = PLAY;

var diver , bg , obstacleGrp , restartImg , gameOverImg , restart , gameOver, diesound;
var diverimg , bgImg, fish1img , fish2img , fish3img , bgmusic;
var score;
var showtext = true;


function preload()
{
	diverimg = loadImage("assets/diver.png")
	bgImg = loadImage("assets/underwaterbg.webp")
	fish1img = loadImage("assets/fish1.webp")
	fish2img = loadImage("assets/fish2.png")
	fish3img = loadImage("assets/fish3.png")
	restartImg = loadImage("assets/restart.png")
  	gameOverImg = loadImage("assets/gameOver.png")
	diesound = loadSound("assets/die.mp3")
	bgmusic = loadSound("assets/sound.wav")
	}

function setup() {
	createCanvas(windowWidth, windowHeight);

	//Create the Bodies Here.
	bg = createSprite(windowWidth/2-20,windowHeight/2-40,20,20)
	bg.addImage(bgImg)
	bg.scale = 1.1
	  
	diver = createSprite(windowWidth-1500, windowHeight-300, 50, 50);
	diver.addImage(diverimg)
	  diver.scale = 0.3

	    
	gameOver = createSprite(800,300);
	gameOver.addImage(gameOverImg);
	  
	restart = createSprite(800,500);
	restart.addImage(restartImg);
	  
	gameOver.scale = 0.5;
	restart.scale = 0.5;
	  

	  obstacleGrp = createGroup();

	  score = 0
	  diver.debug = false;
	  diver.setCollider("rectangle",0,-50 , 1000 , 500)
  
}


function draw() {
  background(0);
  drawSprites();
  if(showtext){
  textSize(60)
  fill('white')
  text("🅢🅒🅞🅡🅔: "+ score, 1250,50);
  textSize(15)
  fill('white')
  text("1.*υѕє тнє αяяσω кєуѕ тσ мσνє тнє ∂ινєя*" , 35 , 70)
  textSize(15)
  fill('white')
  text("тιρѕ тσ ρℓαу:" , 35 , 50)
  textSize(15)
  fill('white')
  text("2.ανσι∂ тнє ƒιѕн" , 35 , 90)
}
  
 
  if(gameState === PLAY){
	gameOver.visible = false
    restart.visible = false
		//move the background
		bg.velocityX=-4+80/43		
		//scoring
		score = score + Math.round(getFrameRate()/60);
	if(keyDown("UP_ARROW")){
		diver.y = diver.y-30
		bgmusic.play()

	}
	
	if(keyDown("DOWN_ARROW")){
	diver.y = diver.y+30
	bgmusic.play()

	}
	
	if(keyDown("LEFT_ARROW")){
		diver.x = diver.x-30
		bgmusic.play()

	}
	
	if(keyDown("RIGHT_ARROW")){
	diver.x = diver.x+30
	bgmusic.play()

	}


	if (bg.x < 600){
	bg.x = bg.width/2
	}
	if(obstacleGrp.isTouching(diver)){
		gameState = END;
		diesound.play()

	}
}
else if (gameState === END) {
	showtext = true;
	gameOver.visible = true;
	restart.visible = true;
    bg.velocityX = 0;
    diver.velocityX = 0
    obstacleGrp.destroyEach()
	textSize(60);
    fill('white')
    text("𝑩𝒆𝒕𝒕𝒆𝒓 𝑳𝒖𝒄𝒌 𝑵𝒆𝒙𝒕 𝒕𝒊𝒎𝒆" , width/3.5,150);
	textSize(60);
    fill('white')
	text("𝙲𝚕𝚒𝚌𝚔 𝚝𝚑𝚎 𝚛𝚎𝚜𝚎𝚝 𝚋𝚞𝚝𝚝𝚘𝚗 𝚝𝚘 𝚙𝚕𝚊𝚢 𝚊𝚐𝚊𝚒𝚗", 480 , 700)
   
}
if(mousePressedOver(restart)){
    reset()
  }

  spawnObstacles() 
}
function reset(){
	gameState = PLAY
	obstacleGrp.destroyEach();
	score=0
	showtext = true;
	diver.position.x = windowWidth-1500
	diver.position.y = windowHeight-300
  }
  function spawnObstacles(){
	if (frameCount % 70 === 0){
	  var obstacle = createSprite(random(1400,1500),random(200 , 600),10,40);
	  obstacle.velocityX = -6 - score/100;
	  
	   //generate random obstacles
	   var rand = Math.round(random(1,6));
	   switch(rand) {
		 case 1: obstacle.addImage(fish1img);
				 break;
		 case 2: obstacle.addImage(fish2img);
				 break;
		 case 3: obstacle.addImage(fish3img);
				 break;
		 default: break;
	   }
	  
	   //assign scale and lifetime to the obstacle           
	   obstacle.scale = 0.10;
	   obstacle.lifetime = 300;
	  
	  //add each obstacle to the group
	   obstacleGrp.add(obstacle);
	}
   }

