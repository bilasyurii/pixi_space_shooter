import Key from "./key";

export default class Keyboard {
  constructor() {
    this._keysLookup = {};
    this._listeners = [];

    this._setupEvents();
  }

  /**
   * @param {string} code
   * @returns {Key}
   */
  addKey(code) {
    const lookup = this._keysLookup;
    let key = lookup[code];

    if (key) {
      return key;
    }

    key = new Key(code);
    lookup[code] = key;

    return key;
  }

  /**
   * @param {string} code
   * @returns {Key}
   */
  getKey(code) {
    return this._keysLookup[code];
  }

  reset() {
    const keys = this._keysLookup;

    for (const key in keys) {
      keys[key].reset();
    }

    this._keysLookup = {};
  }

  _setupEvents() {
    window.addEventListener('keydown', (event) => this._onDown(event));
    window.addEventListener('keyup', (event) => this._onUp(event));
  }

  _onDown(e) {
    const code = e.code;
    const key = this._keysLookup[code];

    if (key) {
      key.setDown();
    }
  }

  _onUp(e) {
    const code = e.code;
    const key = this._keysLookup[code];

    if (key) {
      key.setUp();
    }
  }
}
