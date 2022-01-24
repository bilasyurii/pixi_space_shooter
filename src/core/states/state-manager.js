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

  setState(stateClass) {
    const states = this._states;
    const newState = states[stateClass];

    Debug.assert(newState, 'Can\'t set state, that isn\'t registered.');

    const currentState = this._currentState;

    // if no changes, return
    if (newState === currentState) {
      return;
    }

    this._currentState = newState;

    if (currentState) {
      currentState.onLeft();
    }

    newState.onEntered();
  }

  restart() {
    const currentState = this._currentState;

    Debug.assert(currentState, 'Can\'t restart, because there is no active state');

    currentState.onLeft();
    currentState.onEntered();
  }
}
