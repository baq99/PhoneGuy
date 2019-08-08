<!DOCTYPE html>
<html>
    <head>
        <title>Phreaker</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
        <link href="style.css" rel="stylesheet"/>
        <script src="//cdn.jsdelivr.net/npm/phaser@3.18.1/dist/phaser.min.js"></script>
        <script src="js/boot.js"></script>
        <script src="js/preload.js"></script>
        <script src="js/pretitle.js"></script>
        <script src="js/gametitle.js"></script>
        <script src="js/gametitlemenu.js"></script>
        <script src="js/thegame.js"></script>
        <script src="js/gameover.js"></script>
      
        <script>
          (function() {
            var gameScene = new Phaser.Scene('Game');
            
            var config = {
              type: Phaser.CANVAS,
              width: 800,
              height: 600,
              parent: 'gameWindow',
              scene: boot
            };
            
            var game = new Phaser.Game(config);
            
            /* Legacy Phaser 2 stuff
            game.state.add("Boot",boot);
            game.state.add("Preload",preload);
            game.state.add("PreTitle",preTitle);
            game.state.add("GameTitle",gameTitle);
            game.state.add("GameTitleMenu",gameTitleMenu);
            game.state.add("TheGame",theGame);
            game.state.add("GameOver",gameOver);
            game.state.start("Boot");
            */
          })();    
        </script>
        <style>
           
        </style>
    </head>
    <body> 
      <div class="header">
        <h1>Phreaker!</h1>
        <h3>Help Tel eliminate his cordless foes!</h3>  
      </div>
      
      <div id="gameWindow"></div>
    </body>
</html>