export default class Debug {
  constructor() {
    Debug.staticClass();
  }

  static fail(message) {
    throw new Error(message || 'Failed.');
  }
  
  static assert(expression, message) {
    if (!expression) {
      Debug.fail(message || 'Assertion failed.');
    }
  }

  static warn(message, data) {
    if (arguments.length === 2) {
      console.warn(message, data);
    } else {
      console.warn(message);
    }
  }

  static info(message) {
    Debug.log(message, 'navy', 'cyan');
  }

  static log(message, bg, color) {
    let style = '';

    if (bg !== undefined) {
      style += `background: ${bg}; `;
    }

    if (color !== undefined) {
      style += `color: ${color}; `;
    }

    if (style.length === 0) {
      console.log(message);
    } else {
      console.log(`%c${message}`, style);
    }
  }

  static staticClass() {
    Debug.fail('Cannot create instance of a static class.');
  }

  static abstractMethod() {
    Debug.fail('Abstract method isn\'t implemented.');
  }

  static methodNotImplemented() {
    Debug.fail('Method isn\'t implemented.');
  }
}
