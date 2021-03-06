import { Container } from "pixi.js";
import Game from "../game/game";
import Debug from "../utils/debug";

/**
 * Abstract game state.
 */
export default class GameState {
  /**
   * @param {Game} game 
   */
  constructor(game) {
    this.game = game;
    this._root = null;

    this._initRoot();
  }

  getRoot() {
    return this._root;
  }

  addChild(child) {
    this._root.addChild(child);
  }

  setState(stateClass, arg = undefined) {
    this.game.getStates().setState(stateClass, arg);
  }

  clear() {
    this._root.destroy();
    this._initRoot();
  }

  onEntered(arg) {
    Debug.abstractMethod();
  }

  onLeft() { } // may be implemented in derived classes

  update(dt) { } // may be implemented in derived classes

  _initRoot() {
    this._root = new Container();
  }
}
