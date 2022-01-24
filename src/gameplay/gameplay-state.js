import GameState from "../core/states/game-state";
import Background from "./background";

export default class GameplayState extends GameState {
  constructor(game) {
    super(game);

    this._bg = null;
  }

  onEntered() {
    this._initBg();
  }

  onLeft() {}

  _initBg() {
    const bg = new Background();
    this._bg = bg;
    this.addChild(bg);
  }
}
