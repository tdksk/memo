/** Syntax Highlighter **/
define('ace/mode/note', function (require, exports, module) {
  var oop = require('ace/lib/oop');
  var TextMode = require('ace/mode/text').Mode;
  var Tokenizer = require('ace/tokenizer').Tokenizer;
  var NoteHighlightRules = require('ace/mode/note_highlight_rules').NoteHighlightRules;
  var Mode = function () {
    this.$tokenizer = new Tokenizer(new NoteHighlightRules().getRules());
  };
  oop.inherits(Mode, TextMode);
  (function () {
  }).call(Mode.prototype);
  exports.Mode = Mode;
});

define('ace/mode/note_highlight_rules', function (require, exports, module) {
  var oop = require('ace/lib/oop');
  var TextHighlightRules = require('ace/mode/text_highlight_rules').TextHighlightRules;
  var NoteHighlightRules = function () {
    // this.$rules = new TextHighlightRules().getRules();
    this.$rules = {
      "start": [
        {
          token: "todo",
          regex: /\*\s.*$/
        },
        {
          token : "comment",
          regex : /\/\*\s.*$/
        }
      ]
    };
  };
  oop.inherits(NoteHighlightRules, TextHighlightRules);
  exports.NoteHighlightRules = NoteHighlightRules;
});

/** Resize **/
function onResize() {
  var width = window.innerWidth - 240;
  var height = window.innerHeight - 30;
  $('#editor').css('width', width + 'px');
  $('#editor').css('height', height + 'px');
  // $('.ace_content').css('padding', '10px 5px');
}
window.onresize = onResize;

/** Save **/
function onSaveFile(editor) {
  var contents = editor.session.getValue();
  var $header = $('#header');

  $.ajax({
    type: 'post',
    url: './write.php',
    data: {
      contents: contents
    },
    success: function () {
      $header.removeClass('error');
    },
    error: function () {
      $header.addClass('error');
    }
  });

  showTasks(editor);
}

/** Tasks **/
function showTasks(editor) {
  var contents = editor.session.getValue();
  $('#sidebar ul').empty();
  var line = contents.split("\n");
  for (var i = 0, length = line.length; i < length; i++) {
    if (line[i][0] == '*' && line[i][1] == ' ') {
      $('#sidebar ul').append("<li onclick=\"findTasks('" + line[i] + "')\">" + line[i] + "</li>");
    }
  }
}

function findTasks(word) {
  var editor = ace.edit('editor');
  editor.find(word);
}
