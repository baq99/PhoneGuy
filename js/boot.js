var boot = {};

boot.Boot = function() {
  this.face = null;
};

console.log(boot);

boot.Boot.prototype.constructor = boot.Boot;

boot.Boot.prototype = {
	preload: function() {
          this.game.load.image("loading","assets/loading[1].png"); 
	},
  
  	create: function() {
    		console.log("%cStarting PhoneGuy (C) Mechanically Separated Software 2019", "color:white; background:red");
    
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		//this.scale.setScreenSize();
		this.game.scene.start("Preload");
	}
};
