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

  setState(stateClass) {
    this.game.getStates().setState(stateClass);
  }

  onEntered() {
    Debug.abstractMethod();
  }

  onLeft() { } // may be implemented in derived classes

  update(dt) { } // may be implemented in derived classes

  _initRoot() {
    this._root = new Container();
  }
}
