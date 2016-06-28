'use babel';

import Configuration  from './config.json';
import {exec}         from 'child_process';
// import atom           from 'atom';

export default class BehatAdapter {

  constructor() {


  }

  /**
   * Return all definitions
   *
   * @return {[type]} [description]
   */
  getDefinitions(callback) {

    var phpPath   = atom.config.get('behat-tools.path.php_bin'),
        behatPath = atom.config.get('behat-tools.path.behat_bin'),
        language  = atom.config.get('behat-tools.runtime.language'),
        command   = phpPath + ' ' + behatPath + ' -di --lang ' + language;

    console.log(command);

    exec(command, (error, stdout, stderr) => {

      if (error) {

        atom.notifications.addError(`Behat Tools: \n ${error}`);
        return;
      }

      console.log(stdout);
      callback(['32sdfsdf51','32sdfsdf51','32sdfsdf51','3251sdfsdf','32sdfsfsf1']);
    });

  }

}
