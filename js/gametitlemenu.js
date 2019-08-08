var gameTitleMenu = function(game){}

gameTitleMenu.prototype = {
	/*----------MENU SELECTION------------------*/
		menuSelection: function(direction) {
			if (direction === 0 && menuItemSelected > 0) { //UP
				menuItemSelected = menuItemSelected - 1;
			} else if (direction === 1 && menuItemSelected < menuItems.length - 1) { //DOWN
				menuItemSelected = menuItemSelected + 1;
			}
			this.menuHighlight(menuItemSelected,direction)
		},
	/*----------MENU HIGHLIGHT------------------*/
		menuHighlight: function(menuItem,dir) {
			for (i = 0; i < menuItems.length; i++) {
				if (menuGrp.children[i].z == menuItem) {
					menuGrp.children[i].tint = 0xf23da4;
					this.game.tweens.removeAll();
					this.game.add.tween(menuGrp.children[i]).to( { alpha: 0.5 }, 250, Phaser.Easing.Linear.None, true, 0, 1000, true);	
				} else {
					menuGrp.children[i].alpha = 1.0;
					menuGrp.children[i].tint = 0xffffff;
					//this.game.remove.tween(menuGrp.children[i]);	
				}
			}
		},
	/*----------CREATE------------------*/
  	create: function(){
					
			menuItems = [
			{
				text: "Start Game",
				txtLoc: 150
			},{
				text: "Settings",
				txtLoc: 200
			},{
				text: "Achievements",
				txtLoc: 250
			},{
				text: "Secrets",
				txtLoc: 300
			},{
				text: "Credits",
				txtLoc: 350
			}]
			menuItemSelected = 0; //set initial selected menu item as "start game"
    	background = this.game.add.tileSprite(0,0,800,this.game.cache.getImage('titleBG').height,'titleBG');
			background.tint = 0xd9038;
			
			//create all menu items with a loop
			menuGrp = this.game.add.group();
			
			for (m = 0; m < menuItems.length; m++) {
				setMI = this.game.add.retroFont('retroFont',20,20,Phaser.RetroFont.TEXT_SET2, 15, 0, 0);
				setMI.setText (menuItems[m].text,false,0,8,Phaser.RetroFont.ALIGN_CENTER);
				dispMI = this.game.add.image(this.game.world.centerX-(setMI.width/2),menuItems[m].txtLoc,setMI);
				dispMI.alpha = 1;
				menuGrp.add(dispMI);
			}
			
			//stop key propogation to the browser
			this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP]);
			this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.DOWN]);
			this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
			//enable menu keys
			upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
			downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
			spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			
			//upKey.onDown.add(this.menuSelection(0), this);
			//downKey.onDown.add(this.menuSelection(1), this);
		},
/*----------UPDATE------------------*/
		update: function(){
			background.tilePosition.x -= 1;
			
			
			if (upKey.isDown) {
					this.menuSelection(0);
			}
			
			if (downKey.isDown) {	
					this.menuSelection(1);
			}
			
			if (spaceKey.isDown) {
				switch (menuItemSelected) {
					case 0:
						console.log("Player selected START GAME");
						this.game.state.start("TheGame");
						break;
					case 1:
						console.log("Player selected SETTINGS");
						//this.game.state.start("TheGame");
						break;
					case 2:
						console.log("Player selected ACHIEVEMENTS");
						//this.game.state.start("TheGame");
						break;
					case 3:
						console.log("Player selected SECRETS");
						//this.game.state.start("TheGame");
						break;
					case 4:
						console.log("Player selected CREDITS");
						//this.game.state.start("TheGame");
						break;						
				}
			}
			
        
		}
}
