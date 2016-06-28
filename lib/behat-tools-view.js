'use babel';
// https://github.com/danielbrodin/atom-project-manager/blob/master/lib/projects-list-view.js
import {TextEditor}         from 'atom';
import {SelectListView, $}  from 'atom-space-pen-views';
import Behat                from './behat'

/**
 * @class SelectListView
 */
export default class BehatToolsView extends SelectListView {

  initialize() {
    super.initialize();
    this.addClass('overlay from-top behat-tools');
  }

  getEmptyMessage() {
    return 'No commands available';
  }

  show() {

    let behat = new Behat();

    behat.getDefinitions((itens) =>{

      this.setItems(itens);

      if (!this.panel) {
        this.panel = atom.workspace.addModalPanel({
          item: this
        });
      }

      this.panel.show();
      this.focusFilterEditor();
    })
  }

  close() {

    if (this.panel) {
      this.panel.destroy();
      this.panel = null;
    }
  }

  viewForItem(item) {

    var linha = this.getSanatizedObject(item) ;
    return `<li><div class='command icon icon-chevron-right'><span>${linha.command}</span></div><div class='context no-icon'>${linha.context}</div></li>`;
  }

  cancelled() {
    this.close();
  }

  confirmed(item) {

    var linha      = this.getSanatizedObject(item, false) ;
    var textEditor = atom.workspace.getActiveTextEditor();

    if (textEditor && !textEditor.isMini() ) {

      textEditor.insertText(linha.command.replace(/^.*?\s/,' '));
      textEditor.insertNewline();
    }

    this.close();
  }

  toggle() {

    if (this.panel && this.panel.isVisible()) {
      this.close();
    } else {
      this.show();
    }
  }

  activate() {
  }

  getSanatizedObject(string, sanatizeHTML = true) {

    var fields = string.split(/(^.*?)\|(.*$)/);

    var object = {
      'context' : fields[1],
      'command' : fields[2].trim()
    }

    if (sanatizeHTML) {
      object.command = this.sanatizeHTML(object.command);
    }

    return object;
  }

  sanatizeHTML(string) {

    var MAP = {
      '&' : '&amp;',
      '<' : '&lt;',
      '>' : '&gt;',
      '"' : '&#34;',
      "'" : '&#39;'
    };

    var repl = function(c) {
      return MAP[c];
    };
    return string.replace(/[&<>'"]/g, repl);
  }
}
