'use babel';

import Configuration           from './config.json';
import BehatToolsView          from './behat-tools-view';
import { CompositeDisposable } from 'atom';

export default {

  behatToolsView : null,
  modalPanel     : null,
  subscriptions  : null,
  config         : Configuration,

  activate(state) {

    this.behatToolsView = new BehatToolsView();

    /**
     *  Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
     */
    this.subscriptions = new CompositeDisposable();

    /**
     * Register  commands
     */
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'behat-tools:findCommand'  : () => this.behatToolsView.toggle(),
      'behat-tools:run'          : () => this.run(),
      'behat-tools:toggleFinder' : () => this.behatToolsView.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.behatToolsView.destroy();
  },

  serialize() {
  },

  /**
   * Find command in command list available
   *
   * @return {[type]} [description]
   */
  find() {

    if (this.modalPanel.isVisible()) {
      return this.modalPanel.hide();
    }
    console.log(this.behatToolsView);
    this.behatToolsView.getElement().focus();
    return this.modalPanel.show();
  },

  /**
   * Runner
   */
  run() {
    return console.log("opa");
  }

};
