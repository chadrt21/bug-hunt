kontra.init();

kontra.assetPaths.images = 'assets/images/';

kontra.loadAssets('background.png', 'enemy.png', 'player.png').then(
  function(){
    var background = kontra.sprite({
      x: 0,
      y: 0,
      // image: kontra.images.background
      width: 300,
      height: 300,
      color: 'grey'
    });

    // var text = kontra.text({
    //   text: 'Bug Count: ',
    //   font: '32px Arial',
    //   color: 'white',
    //   x: 300,
    //   y: 100,
    //   anchor: {x: 0.5, y: 0.5},
    //   textAlign: 'left'
    // });

    var player = kontra.sprite({
      x: 120,
      y: 240,
      width: 10,
      height: 20,
      color: 'red'
      // image: kontra.images.player
    });

    // var randomColors = [...Array(5)].map((i) => Math.floor(Math.random()*16777215).toString(16))
    var randomColors = ['white','green','yellow','cyan']
    var bugs = [
      kontra.sprite({
        x: 100,
        y: 180,
        width: 10,
        height: 10,
        color: randomColors[0],
        // image: kontra.images.enemy,
        timeToLive: 10,
        dx: 1
      }),
      kontra.sprite({
        x: 100,
        y: 130,
        width: 10,
        height: 10,
        color: randomColors[1],
        // image: kontra.images.enemy,
        timeToLive: 10,
        dx: 1.8
      }),
      kontra.sprite({
        x: 100,
        y: 80,
        width: 10,
        height: 10,
        color: randomColors[2],
        // image: kontra.images.enemy,
        timeToLive: 10,
        dx: 0.8
      }),
      kontra.sprite({
        x: 100,
        y: 200,
        width: 10,
        height: 10,
        color: randomColors[3],
        // image: kontra.images.enemy,
        timeToLive: 10,
        dx: 1.2
      })
    ];

    var bugCount = 0
    var totalBugs = bugs.length;
    var loop = kontra.gameLoop({
      update: function() {

        if(kontra.keys.pressed('up')) {
          player.y -= 1;
        }

        if(kontra.keys.pressed('down')) {
          player.y += 1;
        }

        if(kontra.keys.pressed('left')) {
          player.x -= 1;
        }

        if(kontra.keys.pressed('right')) {
          player.x += 1;
        }

        if(bugCount >= 4) {
          //pause game
          loop.stop();
          alert('You Won!');
          window.location = '';
        }
        player.update();

        //enemy bouncing
        // bugs = bugs.filter(bug => bug.isAlive());
        // console.log(bugs.filter(bug => bug.isAlive()).length)
        // bugCount = totalBugs - bugs.length;
        bugs.forEach(function(bug,color){
          if(bug.x < 32) {
            bug.x = 32;
            bug.dx = Math.abs(bug.dx);
          }

          else if(bug.x > 200) {
            bug.x = 200;
            bug.dx = -Math.abs(bug.dx);
          }

          bug.update();

          //check for collision
          if(bug.collidesWith(player)) {
            bug.ttl = 0;
            // bug.update();
            // console.log(bugs.length)
            // bug.isAlive = false;
            // console.log(bug.valueOf());
            // bug.update();
            // bugCount += 1;
            // bug.render();
          }
        });


        background.update();


      },
      render: function() {
        background.render();
        player.render();
        bugs.forEach(function(bug){
          // if(bug.isAlive()) {
            bug.render();
          // }
        });
        // text.render();
      }
    });

    loop.start();

  }
);
