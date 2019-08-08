class scnBoot extends Phaser.Scene {

	constructor () {
		super({ key: 'sceneBoot' });
	}
	
	preload () {
        	this.load.image("loading","assets/loading[1].png"); 
	}
  
  	create() {
		console.log("%cStarting PhoneGuy (C) Mechanically Separated Software 2019", "color:white; background:red");
		this.scene.start("scenePreload");
	}
}
