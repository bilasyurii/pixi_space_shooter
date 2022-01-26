import MiniSignal from "mini-signals";
import { Container, Graphics, Sprite } from "pixi.js";
import Game from "../../../core/game/game";

export default class ControlButton extends Container {
  /**
   * @param {Game} game
   * @param {string} type
   * @param {Sprite} icon
   */
  constructor(game, type, icon) {
    super();

    this.game = game;
    this.onDown = new MiniSignal();
    this.onUp = new MiniSignal();
    this._type = type;
    this._icon = icon;
    this._bg = null;

    this._initBg();
    this.addChild(icon);
    this._setupEvents();
  }

  getType() {
    return this._type;
  }

  getWidth() {
    return this._bg.width * this.scale.x;
  }

  getHeight() {
    return this._bg.height * this.scale.y;
  }

  _initBg() {
    const texture = ControlButton._getTexture(this.game);
    const bg = new Sprite(texture);
    this._bg = bg;
    this.addChild(bg);
    bg.anchor.set(0.5);
    bg.interactive = true;
  }

  _setupEvents() {
    const bg = this._bg;
    bg.on('pointerdown', this._onDown, this);
    bg.on('pointerup', this._onUp, this);
  }

  _onDown() {
    this.onDown.dispatch(this);
  }

  _onUp() {
    this.onUp.dispatch(this);
  }

  static _getTexture(game) {
    let texture = ControlButton._bgCachedTexture;
  
    if (!texture) {
      texture = ControlButton._createTexture(game);
      ControlButton._bgCachedTexture = texture;
    }
  
    return texture;
  }
  
  /**
   * @param {Game} game 
   */
  static _createTexture(game) {
    const size = ControlButton.Size;
    const graphics = new Graphics();
    graphics.beginFill(0xc7c7c7, 0.25);
    graphics.drawRoundedRect(0, 0, size, size, size * 0.3);
    graphics.endFill();
  
    const renderer = game.getRenderer();
    return renderer.generateTexture(graphics);
  }
}

ControlButton.Size = 100;
ControlButton._bgCachedTexture = null;
