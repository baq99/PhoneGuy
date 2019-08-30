//initialize Phaser
var game = new Phaser.Game(800,600,Phaser.CANVAS,'gameWindow',{preload:preload,create:create});

//set global variables
var map;
var player;
var spriteFPS = 10;
var cursors;
var layer;
var text;
var score = 0;

function preload() {
    // map made with Tiled in JSON format
    game.load.tilemap('map', 'assets/map.json',null,Phaser.Tilemap.TILED_JSON);
    // tiles in spritesheet 
    game.load.spritesheet('tiles', 'assets/tiles.png',70,70);
    // simple coin image
    game.load.image('coin', 'assets/coinGold.png');
    // cord image
    game.load.image('cord', 'assets/cord.png');
    // player animations
    game.load.spritesheet('player', 'assets/PhoneGuyAllAnims.png',64,64);
}

function create() {
    //initialise the physics engine
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#ccccff';
    // load the map 
    map = game.add.tilemap('map');
    // tiles for the ground layer
    map.addTilesetImage('tiles','tiles');
    // the player will collide with this layer  
    map.setCollisionBetween(0,12);
    // create the ground layer
    layer = map.createLayer('World');    
    layer.resizeWorld();
    
    // create the player sprite    
    player = game.add.sprite(200,200,'player');
    game.physics.enable(player);
    game.physics.arcade.gravity.y = 250;
    player.body.bounce.y = 0.2; // our player will bounce from items
    player.body.linearDamping = 1;
    player.body.collideWorldBounds = true; // don't go out of the map    

    game.camera.follow(player);
    
    //player animations
    player.animations.add('idle',[0,1,2,3,4,5,6,7,8], spriteFPS, true); //idle
    player.animations.add('walk',[9,10,11,12], spriteFPS, true); //walking
    player.animations.add('jump',[20,21,22,23,24,25,26,27], spriteFPS, true); //jumping
    player.animations.add('liftRec',[28,29,30,31,32,33,34,35,36,37,38,39,40], spriteFPS, true); //lifting the reciever

    kbCursors = game.input.keyboard.createCursorKeys();
    kbSpace = game.input.keyboard.addKey(Phaser.Keyboard.SPACE);

    // set bounds so the camera won't go outside the game world
    //game.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // make the camera follow the player
    //game.cameras.main.startFollow(player);

    // this text will show the score
    text = game.add.text(20, 570, '0', {
        fontSize: '20px',
        fill: '#ffffff'
    });
    // fix the text to the camera
    //text.setScrollFactor(0);
}

// this function will be called when the player touches a coin
function collectCoin(sprite, tile) {
    coinLayer.removeTileAt(tile.x, tile.y); // remove the tile/coin
    score++; // add 10 points to the score
    text.setText(score); // set the text to show the current score
    return false;
}

function update() {
    game.physics.arcade.collide(plater,layer);
    
    player.body.velocity.x = 0;
    
    if (kbCursors.up.isDown && player.body.onFloor())  {
        player.body.setVelocityY(-200);        
        player.play('jump');
    }
    else if (kbSpace.isDown && player.body.onFloor()) {   
        player.play('liftRec', true);
    }    
    else if (kbCursors.left.isDown) {
        player.body.setVelocityX(-150);
        player.play('walk'); // walk left
        player.flipX = true; // flip the sprite to the left
    }
    else if (kbCursors.right.isDown) {
        player.body.setVelocityX(150);
        player.play('walk');
        player.flipX = false; // use the original sprite looking to the right
    } else {
        player.body.setVelocityX(0);
        player.play('idle');
    }
}
