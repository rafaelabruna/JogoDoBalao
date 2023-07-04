var bg, bgImage;
var balloon, balloonImg;
var bottomGround, topGround;
var bird, birdImage;
var gameOver, restart,  gameOverImg, restartImg;
var obstaclesGroup;
var PLAY= 1;
var END= 0;
var gameState = PLAY;

function preload(){
    bgImage= loadImage("assets/cityImage.png");
    balloonImg= loadImage("assets/balloon2.png");
    birdImage= loadImage("assets/obsTop2.png");
    gameOverImg= loadImage("assets/fimdejogo.png");
    restartImg= loadImage("assets/restart.png");
}

function setup(){
    createCanvas(700,560);

    //criando o fundo
    bg= createSprite(350,280);
    bg.addImage(bgImage);
    bg.scale=0.4;

    //criando o personagem
    balloon= createSprite(100,200,20,50);
    balloon.addImage(balloonImg);
    balloon.scale=0.25;
    balloon.debug= false;

    //criando as bordas
    bottomGround= createSprite(350,550,800,20);
    bottomGround.visible= false;

    topGround= createSprite(350,10,800,20);
    topGround.visible= false;
    
    //criando o grupo
    obstaclesGroup= new Group();

    gameOver= createSprite(350,280);
    gameOver.addImage(gameOverImg);
    gameOver.scale= 0.5;

    restart= createSprite(350,320);
    restart.addImage(restartImg);
    restart.scale= 0.5;
}

function draw() {
    background("black");

    if (gameState== PLAY){
        gameOver.visible= false;
        restart.visible= false;

        //adicionando rolagem infinita
        bg.velocityX=-2  ;

        if (bg.x < 200){
            bg.x=bg.width/2-750;
        }

        //fazendo o balao pular
        if (keyDown("space")){
            balloon.velocityY=-4;
        }

        //gravidade
        balloon.velocityY +=0.1; 

        //chamando os obstaculos
        obstacles();

        if (obstaclesGroup.isTouching(balloon)){
            gameState= END;
        }
    }
    if (gameState== END){
        gameOver.visible = true;
        restart.visible = true;
        
        balloon.velocityY= 0;
        bg.velocityX= 0;

        obstaclesGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);


        if (mousePressedOver(restart)){
            reset();
        }
    }
    
    drawSprites();
}
    
//criando os passarinhos
function obstacles(){
    if (frameCount%60==0){
        var obstacle= createSprite(650,50,40,50);
        obstacle.addImage(birdImage);
        obstacle.scale=0.08;
        obstacle.velocityX= -4;
        obstacle.y= Math.round(random(20,550));
        obstacle.lifetime=250;
        obstaclesGroup.add(obstacle);
    }
}

function reset(){
    gameState= PLAY;
    gameOver.visible= false;
    restart.visible= false;
    bg.velocityX= -2;
    obstaclesGroup.destroyEach();
}