//initialize Phaser
var game = new Phaser.Game(800,600,Phaser.CANVAS,'gameWindow',{preload:preload,create:create});

//set global variables
var map;
var player;
var cursors;
var groundLayer, coinLayer;
var text;
var score = 0;

function preload() {
    // map made with Tiled in JSON format
    game.load.tilemap('map', 'assets/map.json',null,Phaser.Tilemap.TILED_JSON);
    // tiles in spritesheet 
    game.load.spritesheet('tiles', 'assets/tiles.png', {frameWidth:70,frameHeight:70});
    // simple coin image
    game.load.image('coin', 'assets/coinGold.png');
    // cord image
    game.load.image('cord', 'assets/cord.png');
    // player animations
    game.load.spritesheet('player', 'assets/PhoneGuyAllAnims.png', {frameWidth: 64, frameHeight: 64});
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

    // player idle animation
    game.anims.create({
        key: 'idle',
        frames: game.anims.generateFrameNumbers('player',{start:0,end:8,first:8}),
        frameRate: 10,
    });
    // player walk animation
    game.anims.create({
        key: 'walk',
        frames: game.anims.generateFrameNumbers('player',{start:9,end:12,first:12}),
        frameRate: 10,
    });
    // player jump animation
    game.anims.create({
        key: 'jump',
        frames: game.anims.generateFrameNumbers('player',{start:20,end:27,first:27}),
        frameRate: 10,
    });
    // player attack animation
    game.anims.create({
        key: 'attack',
        frames: game.anims.generateFrameNumbers('player',{start:28,end:40,first:28}),
        frameRate: 10,
    });

    kbCursors = game.input.keyboard.createCursorKeys();
    kbSpace = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

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
    text.setScrollFactor(0);
}

// this function will be called when the player touches a coin
function collectCoin(sprite, tile) {
    coinLayer.removeTileAt(tile.x, tile.y); // remove the tile/coin
    score++; // add 10 points to the score
    text.setText(score); // set the text to show the current score
    return false;
}

function update(time, delta) {
    if (kbCursors.up.isDown && player.body.onFloor())  {
        player.body.setVelocityY(-50);        
        player.anims.play('jump', true);
    }
    else if (kbSpace.isDown && player.body.onFloor()) {   
        player.anims.play('attack', true);
    }    
    else if (kbCursors.left.isDown) {
        player.body.setVelocityX(-20);
        player.anims.play('walk', true); // walk left
        player.flipX = true; // flip the sprite to the left
    }
    else if (kbCursors.right.isDown) {
        player.body.setVelocityX(20);
        player.anims.play('walk', true);
        player.flipX = false; // use the original sprite looking to the right
    } else {
        player.body.setVelocityX(0);
        player.anims.play('idle', true);
    }
}
