class scnBoot extends Phaser.Scene {

	constructor () {
		super({ key: 'sceneBoot' });
	}
	
	preload () {
        	this.load.image("loading","assets/loading[1].png"); 
	}
  
  	create() {
		console.log("%cStarting PhoneGuy (C) Mechanically Separated Software 2019", "color:white; background:red");
		this.loading = this.add.image(200,200,'loading');
		this.input.manager.enabled = true;
		this.input.once('pointerdown', function () {
			this.scene.start("scenePreload");
		}, this);
	}
}
