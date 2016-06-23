'use babel';

export default class BehatToolsView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('behat-tools');

    // Create message element
    const finder = document.createElement('div');
    const input  = document.createElement('atom-text-editor');
    input.value  = 'The BehatTools package is Alive! It\'s ALIVE!';
    finder.classList.add('editor');


    finder.appendChild(input)
    finder.classList.add('message');
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
