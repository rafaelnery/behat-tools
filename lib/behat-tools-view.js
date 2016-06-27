'use babel';

import {TextEditor} from 'atom';

export default class BehatToolsView {

  constructor(serializedState) {

    /**
     * Creates a new TextEditor
     */
    this.editor                 = new TextEditor({mini:true});
    this.editor.setPlaceholderText(' Type a command to search =) ');
    var editorElement           = atom.views.getView(this.editor);
    var finder                  = document.createElement('div');

    this.element = document.createElement('div');
    this.element.classList.add('behat-tools');

    finder.classList.add('editor');
    finder.classList.add('message');

    finder.appendChild(editorElement);
    this.element.appendChild(finder);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
