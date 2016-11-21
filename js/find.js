(function() {
  var $, $$, $find, $items, ANIMATE_INTERVAL, FIND_INPUT_MIN_LENGTH, _, animate, changed, findInput, findTarget, itemsByTitle, notesById, onSearchChanged, redraw, refresh, run;

  ANIMATE_INTERVAL = 100;

  FIND_INPUT_MIN_LENGTH = 3;

  $ = document.querySelectorAll.bind(document);

  $$ = document.querySelector.bind(document);

  _ = document.getElementById.bind(document);

  $find = $$(".find");

  $items = null;

  changed = false;

  itemsByTitle = [];

  findInput = "";

  findTarget = "nav a";

  notesById = {};

  run = function() {
    refresh(false);
    $find.addEventListener("change", onSearchChanged, false);
    $find.addEventListener("input", onSearchChanged, false);
    animate();
  };

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
    var $item, hidden, i, len, title, titles, total, visible;
    if (validate == null) {
      validate = false;
    }
    itemsByTitle.length = 0;
    $items = $(findTarget);
    if (validate) {
      hidden = total = visible = 0;
      titles = [];
    }
    for (i = 0, len = $items.length; i < len; i++) {
      $item = $items[i];
      title = $item.textContent || "";
      itemsByTitle.push([title.toLowerCase(), $item]);
      if (validate) {
        titles.push(title);
        total += 1;
        if ($item.hidden) {
          hidden += 1;
        } else {
          visible += 1;
        }
      }
    }
  };

  run();

}).call(this);
