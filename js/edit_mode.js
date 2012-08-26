window.onload = function () {
  /** Initialize **/
  var editor = ace.edit('editor');
  editor.setHighlightActiveLine(false);
  editor.setShowPrintMargin(false);
  editor.setHighlightSelectedWord(false);
  editor.renderer.setShowGutter(false);
  editor.selection.moveCursorFileEnd();
  showTasks(editor);
  onResize();

  /** Commands **/
  editor.commands.removeCommands(['gotoline', 'replace']);
  editor.commands.addCommand({
    name: "save",
    bindKey: {win: "Ctrl-S", mac: "Command-S"},
    exec: function(editor){onSaveFile(editor);}
  });

  editor.session.setMode('ace/mode/note');
  editor.setTheme('ace/theme/note');

  editor.session.on('change', function () {
    onSaveFile(editor);
  });
};

/** Theme **/
define('ace/theme/note', function (require, exports, module) {
  exports.isDark = false;
  exports.cssText = '\
.ace-note .ace_cursor {\
  border-left: 2px solid #999;\
  opacity: 1;\
}\
\
.ace-note .ace_marker-layer .ace_selection {\
  background: #bdd5fc;\
}\
\
.ace-note .ace_todo {\
  color: #c52727;\
}\
\
.ace-note .ace_comment {\
  color: #aaa;\
  text-decoration: line-through;\
}\
\
.ace-note .ace_comment .ace_cjk {\
  text-decoration: line-through;\
}\
';
  exports.cssClass = 'ace-note';

  var dom = require('ace/lib/dom');
  dom.importCssString(exports.cssText, exports.cssClass);
});
