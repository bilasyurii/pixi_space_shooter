import MiniSignal from "mini-signals";
import Game from "../../core/game/game";

export default class SpaceshipInput {
  /**
   * @param {Game} game 
   */
  constructor(game) {
    this.game = game;

    this.onShoot = new MiniSignal();

    this._isLeftMovementActive = true;
    this._isRightMovementActive = true;
    this._velocityX = 0;

    this._setupEvents();
  }

  getVelocityX() {
    return this._velocityX;
  }

  _setupEvents() {
    const game = this.game;

    if (game.getDevice().desktop) {
      this._setupKeyboardEvents();
    } else {
      this._setupMobileEvents();
    }
  }

  _setupKeyboardEvents() {
    const keyboard = this.game.getInput().getKeyboard();

    const moveLeftActions = [
      keyboard.addKey('ArrowLeft'),
      keyboard.addKey('KeyA'),
    ];

    const moveRightActions = [
      keyboard.addKey('ArrowRight'),
      keyboard.addKey('KeyD'),
    ];

    const shootActions = [
      keyboard.addKey('Space'),
    ];

    moveLeftActions.forEach((key) => {
      key.onDown.add(this._onActionLeftStarted, this);
      key.onUp.add(this._onActionLeftEnded, this);
    });

    moveRightActions.forEach((key) => {
      key.onDown.add(this._onActionRightStarted, this);
      key.onUp.add(this._onActionRightEnded, this);
    });

    shootActions.forEach((key) => {
      key.onDown.add(this._onShoot, this);
    });
  }

  _setupMobileEvents() {
    // TODO
  }

  _onActionLeftStarted() {
    this._isLeftMovementActive = true;
    this._velocityX = -1;
  }

  _onActionLeftEnded() {
    this._isLeftMovementActive = false;
    this._velocityX = (this._isRightMovementActive ? 1 : 0);
  }

  _onActionRightStarted() {
    this._isRightMovementActive = true;
    this._velocityX = 1;
  }

  _onActionRightEnded() {
    this._isRightMovementActive = false;
    this._velocityX = (this._isLeftMovementActive ? -1 : 0);
  }

  _onShoot() {
    this.onShoot.dispatch();
  }
}
