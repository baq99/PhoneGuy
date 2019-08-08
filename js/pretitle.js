var preTitle = function(game){}

preTitle.prototype = {
	fadePicture: function() {
    		this.game.add.tween(logo).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
    		this.game.state.start("GameTitle");
	},
  	create: function(){
  		logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'falsehand');
    		logo.anchor.setTo(0.5, 0.5);
  		
  		//RetroFont(game, key, characterWidth, characterHeight, chars, charsPerRow, xSpacing, ySpacing, xOffset, yOffset)
		font1 = this.game.add.retroFont('retroFont', 20, 20, Phaser.RetroFont.TEXT_SET2, 15, 0, 0);
		
		font1.setText ("Thrown together by Falsehand Games",false,0,8,Phaser.RetroFont.ALIGN_CENTER);
		byFalsehand = this.game.add.image(this.game.world.centerX-(font1.width/2),500,font1);
		
		this.game.time.events.add(Phaser.Timer.SECOND * 4, this.fadePicture, this);
	}
	
}
