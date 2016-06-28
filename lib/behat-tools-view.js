'use babel';
// https://github.com/danielbrodin/atom-project-manager/blob/master/lib/projects-list-view.js
import {TextEditor}     from 'atom';
import {SelectListView} from 'atom-space-pen-views';
import Behat            from './behat'

/**
 * @class SelectListView
 */
export default class BehatToolsView extends SelectListView {

  initialize() {
    super.initialize();
    this.addClass('overlay from-top');
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
    return "<li><div>" + item + "</div><div>" + item + "</div></li>";
  }

  cancelled() {
    this.close();
  }

  confirmed(item) {

    console.log("Confirmado", item);
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
    console.log("Ativado");

  }

}
