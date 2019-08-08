class scnGameTitle extends Phaser.Scene {
	
	constructor () {
		super({ key: 'sceneGameTitle' });
	}
	
  	create (){
  		//RetroFont(game, key, characterWidth, characterHeight, chars, charsPerRow, xSpacing, ySpacing, xOffset, yOffset)
		font1 = this.add.retroFont('retroFont',20,20,Phaser.RetroFont.TEXT_SET1, 15, 0, 0);
		font2 = this.add.retroFont('retroFont',20,20,Phaser.RetroFont.TEXT_SET1, 15, 0, 0);
		
		background = this.add.tileSprite(0,0,800,this.cache.getImage('titleBG').height,'titleBG');
		
		
		var gameTitle = this.add.sprite(400,200,"gametitle");
		gameTitle.anchor.setTo(0.5,0.5);
		console.log("Game Title Screen has been displayed...")
		
		//setText(content, multiLine, characterSpacing, lineSpacing, lineAlignment, allowLowerCase)
		font1.setText ("Press SPACE to begin!",false,0,8,Phaser.RetroFont.ALIGN_CENTER);
		pressStart = this.add.image(this.game.world.centerX-(font1.width/2),400,font1);
		
		font2.setText ("© 2019 Falsehand Games\nAll Rights Reserved",true,0,8,Phaser.RetroFont.ALIGN_CENTER);
		copyright = this.add.image(this.world.centerX-(font2.width/2),500,font2);
			
		pressStart.alpha = 0;

    this.add.tween(pressStart).to( { alpha: 1 }, 750, Phaser.Easing.Linear.None, true, 0, 1000, true);	
		
		spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	}
	
	update (){
		background.tilePosition.x -= 1;
		
		if (spaceKey.isDown) {
			this.scene.start("scnGameTitleMenu");
		}
	}
}
