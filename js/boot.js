class scnBoot extends Phaser.Scene {

	constructor () {
		super({ key: 'sceneBoot' });
	}
	
	preload () {
        	this.load.image("loading","assets/loading[1].png"); 
	}
  
  	create() {
		console.log("%cStarting PhoneGuy (C) Mechanically Separated Software 2019", "color:white; background:red");
		var loadBar = this.add.sprite(400,200,"loading");
		this.scene.start("scnPreload");
	}
}
