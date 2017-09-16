(function() {
  var $bigger, $phaserExample, $userScale, boot, id, loadPath, reset;

  loadPath = this.loadPath;

  console.debug("loadPath", loadPath);

  boot = Phaser.ScaleManager.prototype.boot;

  reset = Phaser.Loader.prototype.reset;

  Phaser.Loader.prototype.reset = function(hard, clearEvents) {
    reset.call(this, hard, clearEvents);
    this.path = loadPath;
    console.debug('load.reset()', 'load.path', this.path);
  };

  Phaser.ScaleManager.prototype.boot = function() {
    boot.call(this);
    this.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    console.debug('scale.boot()', 'scaleMode', this.scaleMode);
  };

  id = document.getElementById.bind(document);

  $phaserExample = id('phaser-example');

  $bigger = id('bigger');

  $userScale = id('userScale');

  $bigger.disabled = window.innerHeight <= 600 || window.innerWidth <= 800;

  $bigger.addEventListener('change', function() {
    $phaserExample.classList.toggle('bigger', this.checked);
    game.scale.refresh();
  });

  id('fullscreen').addEventListener('click', function() {
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.startFullScreen();
  });

  id('restart').addEventListener('click', function() {
    game.state.restart();
  });

  id('scaleMode').addEventListener('change', function() {
    var value;
    value = Number(this.value);
    game.scale.scaleMode = value;
    if (value === 4) {
      $userScale.removeAttribute('disabled');
    } else {
      $userScale.setAttribute('disabled', '');
    }
  });

  $userScale.addEventListener('change', function() {
    var value;
    value = Number(this.value);
    game.scale.setUserScale(value, value);
  });

  id('rendering').addEventListener('change', function() {
    game.canvas.style.imageRendering = this.value;
  });

}).call(this);
