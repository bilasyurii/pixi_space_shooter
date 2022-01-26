import { Container } from "pixi.js";
import Game from "../../core/game/game";
import Clock from "../../core/time/clock";
import MobileControls from "./mobile-controls/mobile-controls";
import ShotsCounter from "./shots-ui/shots-counter";
import TimerText from "./timer-text";

export default class UI extends Container {
  /**
   * @param {Game} game
   * @param {Clock} clock
   */
  constructor(game, clock) {
    super();

    this.game = game;
    this._clock = clock;
    this._counter = null;
    this._timerText = null;
    this._mobileControls = null;

    this._initCounter();
    this._initTimerText();

    if (game.getDevice().desktop === false) {
      this._initMobileControls();
    }

    this._setupEvents();
  }

  onShoot() {
    this._counter.onShoot();
  }

  getMobileControls() {
    return this._mobileControls;
  }

  update() {
    this._timerText.update();
  }

  _initCounter() {
    const counter = new ShotsCounter(this.game);
    this._counter = counter;
    this.addChild(counter);
  }

  _initTimerText() {
    const timerText = new TimerText(this._clock);
    this._timerText = timerText;
    this.addChild(timerText);
  }

  _initMobileControls() {
    const mobileControls = new MobileControls(this.game);
    this._mobileControls = mobileControls;
    this.addChild(mobileControls);
  }

  _setupEvents() {
    this.game.getScreen().onResize.add(this._onScreenResize, this);
  }

  _onScreenResize() {
    const screen = this.game.getScreen();
    const width = screen.getWidth();
    const height = screen.getHeight();
    const centerX = width * 0.5;
    const isLandscape = width > height;
    const baseMargin = 50;

    const counter = this._counter;
    counter.scale.set(1);

    if (isLandscape) {
      counter.position.set(baseMargin, baseMargin);
    } else {
      counter.scale.set(Math.min(1, (width * 0.8) / counter.getWidth()));
      counter.position.set(
        centerX - counter.getWidth() * 0.5,
        baseMargin
      );
    }

    const timerText = this._timerText;
    timerText.scale.set(1);

    if (isLandscape) {
      timerText.anchor.set(1, 0);
      timerText.position.set(width - baseMargin, baseMargin);
    } else {
      timerText.anchor.set(0.5, 0);
      timerText.position.set(centerX, baseMargin * 2);
    }
  }
}
