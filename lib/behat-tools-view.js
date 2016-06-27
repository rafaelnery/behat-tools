'use babel';
// https://github.com/danielbrodin/atom-project-manager/blob/master/lib/projects-list-view.js
import {TextEditor}     from 'atom';
import {SelectListView} from 'atom-space-pen-views';

export default class BehatToolsView extends SelectListView {

  initialize() {
    super.initialize();
    this.addClass("behat-tools");
  }

  getEmptyMessage() {
    return 'No commands available';
  }

  show() {

    if (!this.panel) {
      this.panel = atom.workspace.addModalPanel({
        item: this
      });
    }

    this.panel.show();
    this.focusFilterEditor();
  }

  close() {

    if (this.panel) {
      this.panel.destroy();
      this.panel = null;
    }
  }

  cancelled() {
    this.close();
  }

  confirmed(item) {
    console.log(item); // =)
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

}
