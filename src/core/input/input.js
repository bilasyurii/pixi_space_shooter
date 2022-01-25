import Game from "../game/game";
import Keyboard from "./keyboard/keyboard";

export default class Input {
  /**
   * @param {Game} game 
   */
  constructor(game) {
    this.game = game;

    this._keyboard = null;

    if (game.getDevice().desktop) {
      this._initKeyboard();
    }
  }

  getKeyboard() {
    return this._keyboard;
  }

  reset() {
    const keyboard = this._keyboard;

    if (keyboard) {
      keyboard.reset();
    }
  }

  _initKeyboard() {
    this._keyboard = new Keyboard();
  }
}
