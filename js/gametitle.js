var gameTitle = function(game){}

gameTitle.prototype = {
  	create: function(){
  		//RetroFont(game, key, characterWidth, characterHeight, chars, charsPerRow, xSpacing, ySpacing, xOffset, yOffset)
		font1 = this.game.add.retroFont('retroFont',20,20,Phaser.RetroFont.TEXT_SET1, 15, 0, 0);
		font2 = this.game.add.retroFont('retroFont',20,20,Phaser.RetroFont.TEXT_SET1, 15, 0, 0);
		
		background = this.game.add.tileSprite(0,0,800,this.game.cache.getImage('titleBG').height,'titleBG');
		
		
		var gameTitle = this.game.add.sprite(400,200,"gametitle");
		gameTitle.anchor.setTo(0.5,0.5);
		console.log("Game Title Screen has been displayed...")
		
		//setText(content, multiLine, characterSpacing, lineSpacing, lineAlignment, allowLowerCase)
		font1.setText ("Press SPACE to begin!",false,0,8,Phaser.RetroFont.ALIGN_CENTER);
		pressStart = this.game.add.image(this.game.world.centerX-(font1.width/2),400,font1);
		
		font2.setText ("© 2019 Falsehand Games\nAll Rights Reserved",true,0,8,Phaser.RetroFont.ALIGN_CENTER);
		copyright = this.game.add.image(this.game.world.centerX-(font2.width/2),500,font2);
			
		pressStart.alpha = 0;

    this.game.add.tween(pressStart).to( { alpha: 1 }, 750, Phaser.Easing.Linear.None, true, 0, 1000, true);	
		
		spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},
	update: function(){
		background.tilePosition.x -= 1;
		
		if (spaceKey.isDown) {
			this.game.state.start("GameTitleMenu");
		}
	}
}
