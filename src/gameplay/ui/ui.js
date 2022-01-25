import { Container } from "pixi.js";
import Game from "../../core/game/game";
import ShotsCounter from "./shots-ui/shots-counter";

export default class UI extends Container {
  /**
   * @param {Game} game 
   */
  constructor(game) {
    super();

    this.game = game;
    this._counter = null;

    this._initCounter();
    this._setupEvents();
  }

  onShoot() {
    this._counter.onShoot();
  }

  _initCounter() {
    const counter = new ShotsCounter(this.game);
    this._counter = counter;
    this.addChild(counter);
  }

  _setupEvents() {
    this.game.getScreen().onResize.add(this._onScreenResize, this);
  }

  _onScreenResize() {
    const screen = this.game.getScreen();
    const width = screen.getWidth();
    const height = screen.getHeight();
    const centerX = width * 0.5;
    const centerY = height * 0.5;
    const isLandscape = width > height;

    const counter = this._counter;
    const counterMargin = 50;

    counter.scale.set(1);

    if (isLandscape) {
      counter.position.set(counterMargin, counterMargin);
    } else {
      counter.scale.set(Math.min(1, (width * 0.8) / counter.getWidth()));
      counter.position.set(
        centerX - counter.getWidth() * 0.5,
        height - counter.getHeight() - counterMargin
      );
    }
  }
}
