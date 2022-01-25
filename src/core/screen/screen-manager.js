import MiniSignal from "mini-signals";
import Game from "../game/game";

export default class ScreenManager {
  /**
   * @param {Game} game
   */
  constructor(game) {
    this.game = game;
    this.onResize = new MiniSignal();
    this._renderer = game.getRenderer();
    this._width = 100;
    this._height = 100;

    this._setupEvents();
  }

  boot() {
    this.updateSize();
  }

  getWidth() {
    return this._width;
  }

  getHeight() {
    return this._height;
  }

  updateSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this._width = width;
    this._height = height;
    this._renderer.resize(width, height);
    this.onResize.dispatch();
  }

  reset() {
    this.onResize.detachAll();
  }

  _setupEvents() {
    window.onresize = () => this.updateSize();
  }
}
