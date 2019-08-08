class scnPreload extends Phaser.Scene {
	
	constructor () {
		super({ key: 'scenePreload' });
	}

	preload () { 
		loadingBar = this.add.sprite(this.game.world.centerX,this.game.world.centerY,"loading");
		loadingBar.anchor.setTo(0.5,0.5);

		this.load.setPreloadSprite(loadingBar);

		// MAP JSON
		this.load.tilemapTiledJSON('map', 'assets/map.json');

		// TILES
		this.load.spritesheet('tiles', 'assets/tiles.png', {frameWidth: 70, frameHeight: 70});

		//BITMAP TEXT
		this.load.image('retroFont', 'assets/new_font_sheet.png');

		//IMAGES
		this.load.image('coin', 'assets/coinGold.png'); //coin
		this.load.atlas('player', 'assets/player.png', 'assets/player.json'); //player anim

		this.load.image("falsehand","assets/falsehand.png",200,200);
		this.load.image('titleBG','assets/titleBG3.png',252,608);
		this.load.image("gametitle","assets/sep_ang_3d.png");
		this.load.image("gametitleSM","assets/title_logo_2.png",200,100);
		this.load.image("play","assets/play[1].png");
		this.load.image("higher","assets/higher[1].png");
		this.load.image("lower","assets/lower[1].png");
		this.load.image("gameover","assets/gameover[1].png");
	}
  	
  	create () {
		console.log("Preload complete");
		this.scene.start("scenePreTitle");
	}
}
