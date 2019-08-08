var preload = function(game){}

preload.prototype = {
	preload: function(){ 
  		loadingBar = this.add.sprite(this.game.world.centerX,this.game.world.centerY,"loading");
  		loadingBar.anchor.setTo(0.5,0.5);
  
  		this.load.setPreloadSprite(loadingBar);
  
      // MAP JSON
      this.game.load.tilemapTiledJSON('map', 'assets/map.json');
      
      // TILES
      this.game.load.spritesheet('tiles', 'assets/tiles.png', {frameWidth: 70, frameHeight: 70});
    	
  		//BITMAP TEXT
  		this.game.load.image('retroFont', 'assets/new_font_sheet.png');
    	
  		//IMAGES
      this.game.load.image('coin', 'assets/coinGold.png'); //coin
      this.game.load.atlas('player', 'assets/player.png', 'assets/player.json'); //player anim
    
  		this.game.load.image("falsehand","assets/falsehand.png",200,200);
  		this.game.load.image('titleBG','assets/titleBG3.png',252,608);
      this.game.load.image("gametitle","assets/sep_ang_3d.png");
      this.game.load.image("gametitleSM","assets/title_logo_2.png",200,100);
      this.game.load.image("play","assets/play[1].png");
      this.game.load.image("higher","assets/higher[1].png");
      this.game.load.image("lower","assets/lower[1].png");
      this.game.load.image("gameover","assets/gameover[1].png");
      
	},
  	
  	create: function(){
		this.game.state.start("PreTitle");
	}
}
