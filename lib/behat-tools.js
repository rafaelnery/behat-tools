'use babel';

import BehatToolsView from './behat-tools-view';
import { CompositeDisposable } from 'atom';

export default {

  behatToolsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {

    this.behatToolsView = new BehatToolsView(state.behatToolsViewState);
    this.modalPanel     = atom.workspace.addModalPanel({
      item: this.behatToolsView.getElement(),
      visible: false
    });

    /**
     *  Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
     */
    this.subscriptions = new CompositeDisposable();

    /**
     * Register  commands
     */
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'behat-tools:findCommand': () => this.find(),
      'behat-tools:run': () => this.run()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.behatToolsView.destroy();
  },

  serialize() {
    return {
      behatToolsViewState: this.behatToolsView.serialize()
    };
  },

  /**
   * Find command in command list available
   * @return {[type]} [description]
   */
  find() {
    return this.modalPanel.isVisible() ? this.modalPanel.hide() : this.modalPanel.show();
  },

  /**
   * Runner
   */
  run() {
    return console.log("opa");
  }

};
