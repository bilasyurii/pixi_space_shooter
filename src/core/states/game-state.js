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
  }

  onEntered() {
    Debug.abstractMethod();
  }

  onLeft() {
    Debug.abstractMethod();
  }
}
