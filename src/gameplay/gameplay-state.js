import { Sprite, utils } from "pixi.js";
import GameState from "../core/states/game-state";

export default class GameplayState extends GameState {
  constructor(game) {
    super(game);

    this._bg = null;
  }

  onEntered() {
    this._initBg();
    this._setupEvents();
    this._forceResize();
  }

  onLeft() {}

  _initBg() {
    const texture = utils.TextureCache['background'];
    const bg = new Sprite(texture);
    this._bg = bg;
    bg.anchor.set(0.5);
    this.addChild(bg);
  }

  _setupEvents() {
    this.game.getScreen().onResize.add(this._onResize, this);
  }

  _forceResize() {
    this.game.getScreen().updateSize();
  }

  _onResize() {
    const screen = this.game.getScreen();
    const width = screen.getWidth();
    const height = screen.getHeight();

    // cover screen with bg
    const bg = this._bg;
    bg.position.set(width * 0.5, height * 0.5);
    bg.scale.set(1);
    bg.scale.set(Math.max(width / bg.width, height / bg.height));
  }
}
