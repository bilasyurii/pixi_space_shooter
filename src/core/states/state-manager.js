import Game from "../game/game";
import Debug from "../utils/debug";
import GameState from "./game-state";

export default class StateManager {
  /**
   * @param {Game} game 
   */
  constructor(game) {
    this.game = game;
    /**
     * @type {GameState}
     */
    this._currentState = null;
    this._states = {};
  }

  register(stateClass) {
    const game = this.game;
    /**
     * @type {GameState}
     */
    const state = new stateClass(game);
    this._states[stateClass] = state;

    const root = state.getRoot();
    game.getStage().addChild(root);
  }

  getCurrent() {
    return this._currentState;
  }

  setState(stateClass, arg = undefined) {
    const states = this._states;
    const newState = states[stateClass];

    Debug.assert(newState, 'Can\'t set state, that isn\'t registered.');

    const currentState = this._currentState;

    // if no changes, return
    if (newState === currentState) {
      return;
    }

    this._currentState = newState;

    const stage = this.game.getStage();

    if (currentState) {
      currentState.onLeft();

      const currentRoot = currentState.getRoot();
      stage.removeChild(currentRoot);
    }

    const newRoot = newState.getRoot();
    stage.addChild(newRoot);

    newState.onEntered(arg);
    this._forceResize();
  }

  restart(arg = undefined) {
    const currentState = this._currentState;

    Debug.assert(currentState, 'Can\'t restart, because there is no active state');

    currentState.onLeft();
    currentState.onEntered(arg);
    this._forceResize();
  }

  update(dt) {
    const currentState = this._currentState;

    if (currentState) {
      currentState.update(dt);
    }
  }

  _forceResize() {
    this.game.getScreen().updateSize();
  }
}
