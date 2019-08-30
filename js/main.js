var config = {
    type: Phaser.CANVAS,
    parent: 'gameWindow',
    width: 800,
    height: 600,
    physics: {
        default: 'matter',
//        arcade: {
//            gravity: {y: 500},
//            debug: false
//        }
    },
    scene: {
        key: 'main',
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var map;
var player;
var cursors;
var groundLayer, coinLayer;
var text;
var score = 0;

function preload() {
    // map made with Tiled in JSON format
    this.load.tilemapTiledJSON('map', 'assets/map.json');
    // tiles in spritesheet 
    this.load.spritesheet('tiles', 'assets/tiles.png', {frameWidth: 70, frameHeight: 70});
    // simple coin image
    this.load.image('coin', 'assets/coinGold.png');
    // cord image
    this.load.image('cord', 'assets/cord.png');
    // player animations
    //this.load.atlas('player', 'assets/player.png', 'assets/player.json');
    this.load.spritesheet('player', 'assets/PhoneGuyAllAnims.png', {frameWidth: 64, frameHeight: 64});
}

function create() {
    // load the map 
    map = this.make.tilemap({key: 'map'});

    // tiles for the ground layer
    var groundTiles = map.addTilesetImage('tiles');
    // create the ground layer
    groundLayer = map.createDynamicLayer('World', groundTiles, 0, 0);
    // the player will collide with this layer
    groundLayer.setCollisionByExclusion([-1]);

    // coin image used as tileset
    var coinTiles = map.addTilesetImage('coin');
    // add coins as tiles
    coinLayer = map.createDynamicLayer('Coins', coinTiles, 0, 0);

    // set the boundaries of our game world
    //this.physics.world.bounds.width = groundLayer.width;
    //this.physics.world.bounds.height = groundLayer.height;
    this.matter.world.setBounds(0,0,groundLayer.width,groundLayer.height);
    
    // create the player sprite    
    player = this.matter.add.sprite(200, 200, 'player');
    player.setBounce(0.2); // our player will bounce from items
    //player.setCollideWorldBounds(true); // don't go out of the map    
    player.setMass(500);
    
    // small fix to our player images, we resize the physics body object slightly
    //player.body.setSize(player.width, player.height-8);
    
    // player will collide with the level tiles 
    this.matter.add.collider(groundLayer, player);

    //add phone cord
    y = 150;
    for (var i=0; i<12; i++) {
        var cord = this.matter.add.image(400,y,'cord',null,{shape:'rectangle',mass:0.1});
        this.matter.add.joint(prev,cord,(i===0) ? 90 : 35, 0.4);
        prev = cord;
        y += 18;
    }
    
    coinLayer.setTileIndexCallback(17, collectCoin, this);
    // when the player overlaps with a tile with index 17, collectCoin 
    // will be called    
    this.matter.add.overlap(player, coinLayer);

    // player idle animation
    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('player',{start:0,end:8,first:8}),
        frameRate: 10,
    });
    // player walk animation
    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('player',{start:9,end:12,first:12}),
        frameRate: 10,
    });
    // player jump animation
    this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('player',{start:20,end:27,first:27}),
        frameRate: 10,
    });
    // player attack animation
    this.anims.create({
        key: 'attack',
        frames: this.anims.generateFrameNumbers('player',{start:28,end:40,first:28}),
        frameRate: 10,
    });

    kbCursors = this.input.keyboard.createCursorKeys();
    kbSpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    

    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // make the camera follow the player
    this.cameras.main.startFollow(player);

    // set background color, so the sky is not black    
    this.cameras.main.setBackgroundColor('#ccccff');

    // this text will show the score
    text = this.add.text(20, 570, '0', {
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
        player.body.setVelocityY(-500);        
        player.anims.play('jump', true);
    }
    else if (kbSpace.isDown && player.body.onFloor()) {   
        player.anims.play('attack', true);
    }    
    else if (kbCursors.left.isDown) {
        player.body.setVelocityX(-200);
        player.anims.play('walk', true); // walk left
        player.flipX = true; // flip the sprite to the left
    }
    else if (kbCursors.right.isDown) {
        player.body.setVelocityX(200);
        player.anims.play('walk', true);
        player.flipX = false; // use the original sprite looking to the right
    } else {
        player.body.setVelocityX(0);
        player.anims.play('idle', true);
    }
}
