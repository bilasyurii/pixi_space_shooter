import MiniSignal from "mini-signals";
import { Container, Sprite } from "pixi.js";
import Game from "../../../core/game/game";
import ButtonIconFactory from "./button-icon-factory";
import { ButtonType } from "./button-type.enum";
import ControlButton from "./control-button";

export default class MobileControls extends Container {
  /**
   * @param {Game} game
   */
  constructor(game) {
    super();

    this.game = game;
    this.onMoveLeftDown = new MiniSignal();
    this.onMoveLeftUp = new MiniSignal();
    this.onMoveRightDown = new MiniSignal();
    this.onMoveRightUp = new MiniSignal();
    this.onShootDown = new MiniSignal();

    this._overlay = null;
    this._moveLeftButton = null;
    this._moveRightButton = null;
    this._shootButton = null;

    this._initOverlay();
    this._initMoveLeftButton();
    this._initMoveRightButton();
    this._initShootButton();
    this._setupEvents();
  }

  _initOverlay() {
    const overlay = new Sprite();
    this._overlay = overlay;
    this.addChild(overlay);
    overlay.interactive = true;
  }

  _initMoveLeftButton() {
    this._moveLeftButton = this._createButton(ButtonType.MoveLeft);
  }

  _initMoveRightButton() {
    this._moveRightButton = this._createButton(ButtonType.MoveRight);
  }

  _initShootButton() {
    this._shootButton = this._createButton(ButtonType.Shoot);
  }

  _createButton(type) {
    const icon = ButtonIconFactory.createByType(this.game, type);
    const button = new ControlButton(this.game, type, icon);
    this.addChild(button);
    return button;
  }

  _setupEvents() {
    this.game.getScreen().onResize.add(this._onScreenResize, this);

    const moveLeftButton = this._moveLeftButton;
    const moveRightButton = this._moveRightButton;

    moveLeftButton.onDown.add(this._onMoveLeftDown, this);
    moveLeftButton.onUp.add(this._onMoveLeftUp, this);

    moveRightButton.onDown.add(this._onMoveRightDown, this);
    moveRightButton.onUp.add(this._onMoveRightUp, this);

    this._shootButton.onDown.add(this._onShootDown, this);

    this._overlay.on('pointerup', this._onOverlayUp, this);
  }

  _onScreenResize() {
    const screen = this.game.getScreen();
    const width = screen.getWidth();
    const height = screen.getHeight();
    const centerY = height * 0.5;
    const isLandscape = width > height;
    const baseMargin = 50;

    const overlay = this._overlay;
    overlay.width = width;
    overlay.height = height;

    const moveLeftButton = this._moveLeftButton;
    const moveRightButton = this._moveRightButton;
    const shootButton = this._shootButton;

    moveLeftButton.scale.set(1);
    moveRightButton.scale.set(1);
    shootButton.scale.set(1);

    if (isLandscape) {
      shootButton.position.set(
        width - baseMargin - shootButton.getWidth() * 0.5,
        centerY
      );

      const moveLeftButtonHalfWidth = moveLeftButton.getWidth() * 0.5;
      const moveLeftButtonX = baseMargin + moveLeftButtonHalfWidth;
      moveLeftButton.position.set(
        moveLeftButtonX,
        centerY
      );

      const moveLeftButtonEdge = moveLeftButtonX + moveLeftButtonHalfWidth;
      const moveRightButtonHalfWidth = moveRightButton.getWidth() * 0.5;
      const moveButtonsInterval = 10;
      const moveRightButtonX = moveLeftButtonEdge + moveRightButtonHalfWidth + moveButtonsInterval;
      moveRightButton.position.set(
        moveRightButtonX,
        centerY
      );
    } else {
      const edgeOffset = width * 0.1;
      const buttonsSpace = width - edgeOffset * 2;
      const buttonsCount = 3;
      const buttonSector = buttonsSpace / buttonsCount;
      const buttonWidth = buttonSector * 0.8;
      const offsetX = edgeOffset + buttonSector * 0.5;
      const offsetY = height - 100;
      const scale = (Math.min(1, buttonWidth / moveLeftButton.getWidth()));

      const buttons = [
        moveLeftButton,
        moveRightButton,
        shootButton,
      ];

      buttons.forEach((button, i) => {
        button.scale.set(scale);
        button.position.set(
          offsetX + i * buttonSector,
          offsetY,
        );
      });
    }
  }

  _onMoveLeftDown() {
    this.onMoveLeftDown.dispatch();
  }

  _onMoveLeftUp() {
    this.onMoveLeftUp.dispatch();
  }

  _onMoveRightDown() {
    this.onMoveRightDown.dispatch();
  }

  _onMoveRightUp() {
    this.onMoveRightUp.dispatch();
  }

  _onShootDown() {
    this.onShootDown.dispatch();
  }

  _onOverlayUp() {
    this._onMoveLeftUp();
    this._onMoveRightUp();
  }
}
