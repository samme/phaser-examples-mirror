(function() {
  var $, $$, $find, $items, ANIMATE_INTERVAL, FIND_INPUT_MIN_LENGTH, _, animate, changed, findInput, itemsByTitle, onSearchChanged, redraw, refresh, start;

  ANIMATE_INTERVAL = 100;

  FIND_INPUT_MIN_LENGTH = 3;

  $ = document.querySelectorAll.bind(document);

  $$ = document.querySelector.bind(document);

  _ = document.getElementById.bind(document);

  $find = $$(".find");

  $items = $("nav a");

  changed = false;

  findInput = "";

  itemsByTitle = [];

  animate = function() {
    if (changed && (findInput === "" || findInput.length >= FIND_INPUT_MIN_LENGTH)) {
      redraw();
    }
    return setTimeout(animate, ANIMATE_INTERVAL);
  };

  onSearchChanged = function(event) {
    changed = true;
    findInput = this.value.toLowerCase();
  };

  redraw = function() {
    var i, item, itemWithTitle, len, title;
    for (i = 0, len = itemsByTitle.length; i < len; i++) {
      itemWithTitle = itemsByTitle[i];
      title = itemWithTitle[0], item = itemWithTitle[1];
      item.hidden = title.indexOf(findInput) === -1;
    }
    changed = false;
  };

  refresh = function(validate) {
    var $item, i, len, title;
    if (validate == null) {
      validate = false;
    }
    itemsByTitle.length = 0;
    for (i = 0, len = $items.length; i < len; i++) {
      $item = $items[i];
      title = $item.textContent || "";
      itemsByTitle.push([title.toLowerCase(), $item]);
    }
  };

  start = function() {
    refresh();
    $find.addEventListener("change", onSearchChanged, false);
    $find.addEventListener("input", onSearchChanged, false);
    animate();
  };

  start();

}).call(this);
