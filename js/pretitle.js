class scnPreTitle extends Phaser.Scene {
	
	constructor () {
		super({ key: 'scenePreTitle' });
	}

	preload () { 
	}
  	
  	create () {
		font1 = this.add.retroFont('retroFont', 20, 20, Phaser.RetroFont.TEXT_SET2, 15, 0, 0);
		font1.setText ("Mechanically Separated Software",false,0,8,Phaser.RetroFont.ALIGN_CENTER);
		byMSS = this.add.image(this.game.world.centerX-(font1.width/2),500,font1);
		
		this.scene.start("sceneGameTitle");
	}
}
