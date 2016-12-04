(function() {
  var $, $$, $find, $items, ANIMATE_INTERVAL, FIND_INPUT_MIN_LENGTH, animate, changed, findInput, index, onSearchChanged, read, redraw, start;

  ANIMATE_INTERVAL = 100;

  FIND_INPUT_MIN_LENGTH = 3;

  $ = document.querySelectorAll.bind(document);

  $$ = document.querySelector.bind(document);

  $find = $$(".find");

  $items = $("nav a");

  changed = false;

  findInput = "";

  index = [];

  animate = function() {
    if (changed && (findInput === "" || findInput.length >= FIND_INPUT_MIN_LENGTH)) {
      redraw();
    }
    setTimeout(animate, ANIMATE_INTERVAL);
  };

  onSearchChanged = function(event) {
    changed = true;
    findInput = this.value.toLowerCase();
  };

  read = function() {
    var $item, i, len, title;
    index.length = 0;
    for (i = 0, len = $items.length; i < len; i++) {
      $item = $items[i];
      title = $item.textContent || "";
      index.push([title.toLowerCase(), $item]);
    }
  };

  redraw = function() {
    var i, item, len, ref, title;
    for (i = 0, len = index.length; i < len; i++) {
      ref = index[i], title = ref[0], item = ref[1];
      item.hidden = title.indexOf(findInput) === -1;
    }
    changed = false;
  };

  start = function() {
    read();
    $find.addEventListener("change", onSearchChanged, false);
    $find.addEventListener("input", onSearchChanged, false);
    animate();
  };

  start();

}).call(this);
