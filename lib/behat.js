'use babel';

import Configuration  from './config.json';
import {exec}         from 'child_process';

export default class BehatAdapter {

  constructor() {
  }

  /**
   * Return all definitions
   *
   * @return {[type]} [description]
   */
  getDefinitions(callback) {

    var phpPath    = atom.config.get('behat-tools.path.php_bin'),
        language   = atom.config.get('behat-tools.runtime.language'),
        projectDir = atom.project.rootDirectories[0].path,
        behatPath  = atom.config.get('behat-tools.path.behat_bin'),
        command    = "cd " + projectDir + " && " + phpPath + ' ' + behatPath + ' -dl --lang ' + language;

    exec(command, (error, stdout, stderr) => {

      if (error) {

        console.error(`Behat Tools: \n ${error}`);
        atom.notifications.addError(`Behat Tools: \n ${error}`);
        return;
      }

      var itens = stdout.split("\n").filter(function(linha){
        return linha;
      });

      callback(itens);
    });
  }


}
