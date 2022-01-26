import MiniSignal from "mini-signals";
import Game from "../../core/game/game";
import Key from "../../core/input/keyboard/key";
import MobileControls from "../ui/mobile-controls/mobile-controls";

export default class SpaceshipInput {
  /**
   * @param {Game} game
   * @param {MobileControls} mobileControls
   */
  constructor(game, mobileControls) {
    this.game = game;

    this.onShoot = new MiniSignal();

    this._mobileControls = mobileControls;
    this._isKeyboardControls = game.getDevice().desktop;
    this._moveLeftKeys = [];
    this._moveRightKeys = [];
    this._isLeftMovementActive = false;
    this._isRightMovementActive = false;
    this._velocityX = 0;

    this._setupEvents();
  }

  getVelocityX() {
    return this._velocityX;
  }

  _setupEvents() {
    if (this._isKeyboardControls) {
      this._setupKeyboardEvents();
    } else {
      this._setupMobileEvents();
    }
  }

  _setupKeyboardEvents() {
    const keyboard = this.game.getInput().getKeyboard();

    const moveLeftKeys = [
      keyboard.addKey('ArrowLeft'),
      keyboard.addKey('KeyA'),
    ];

    const moveRightKeys = [
      keyboard.addKey('ArrowRight'),
      keyboard.addKey('KeyD'),
    ];

    const shootKeys = [
      keyboard.addKey('Space'),
    ];

    this._moveLeftKeys = moveLeftKeys;
    this._moveRightKeys = moveRightKeys;

    moveLeftKeys.forEach((key) => {
      key.onDown.add(this._onActionLeftStarted, this);
      key.onUp.add(this._onActionLeftEnded, this);
    });

    moveRightKeys.forEach((key) => {
      key.onDown.add(this._onActionRightStarted, this);
      key.onUp.add(this._onActionRightEnded, this);
    });

    shootKeys.forEach((key) => {
      key.onDown.add(this._onShoot, this);
    });
  }

  _setupMobileEvents() {
    const mobileControls = this._mobileControls;
    mobileControls.onMoveLeftDown.add(this._onActionLeftStarted, this);
    mobileControls.onMoveLeftUp.add(this._onActionLeftEnded, this);
    mobileControls.onMoveRightDown.add(this._onActionRightStarted, this);
    mobileControls.onMoveRightUp.add(this._onActionRightEnded, this);
    mobileControls.onShootDown.add(this._onShoot, this);
  }

  _onActionLeftStarted() {
    this._isLeftMovementActive = true;
    this._velocityX = -1;
  }

  _onActionLeftEnded() {
    // if input type is keyboard, check if there are alternative keys still down
    if (this._isKeyboardControls && this._isAnyKeyDown(this._moveLeftKeys)) {
      return;
    }

    this._isLeftMovementActive = false;
    this._velocityX = (this._isRightMovementActive ? 1 : 0);
  }

  _onActionRightStarted() {
    this._isRightMovementActive = true;
    this._velocityX = 1;
  }

  _onActionRightEnded() {
    // if input type is keyboard, check if there are alternative keys still down
    if (this._isKeyboardControls && this._isAnyKeyDown(this._moveRightKeys)) {
      return;
    }

    this._isRightMovementActive = false;
    this._velocityX = (this._isLeftMovementActive ? -1 : 0);
  }

  _onShoot() {
    this.onShoot.dispatch();
  }

  /**
   * @param {Key[]} keys 
   */
  _isAnyKeyDown(keys) {
    return keys.some((key) => key.isDown());
  }
}
