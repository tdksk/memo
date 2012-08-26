window.onload = function () {
  var editor = ace.edit('editor');
  editor.setHighlightActiveLine(false);
  editor.setShowPrintMargin(false);
  editor.setHighlightSelectedWord(false);
  editor.renderer.setShowGutter(false);
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
  editor.setTheme('ace/theme/note_view');

  editor.setReadOnly(true);
};

/** Theme **/
define('ace/theme/note_view', function (require, exports, module) {
  exports.isDark = false;
  exports.cssText = '\
.ace-note_view .ace_marker-layer .ace_selection {\
  background: #bdd5fc;\
}\
\
.ace-note_view .ace_todo {\
  color: #c52727;\
}\
\
.ace-note_view .ace_comment {\
  color: #aaa;\
  text-decoration: line-through;\
}\
\
.ace-note_view .ace_comment .ace_cjk {\
  text-decoration: line-through;\
}\
';
  exports.cssClass = 'ace-note_view';

  var dom = require('ace/lib/dom');
  dom.importCssString(exports.cssText, exports.cssClass);
});
