import Game from "../game/game";
import Clock from "./clock";

export default class TimeManager {
  /**
   * @param {Game} game
   */
  constructor(game) {
    this.game = game;
    this._clocks = [];
  }

  /**
   * @returns {Clock}
   */
  createClock(time = 1, autoPlay = false) {
    const clock = new Clock(time, autoPlay);
    this._clocks.push(clock);
    return clock;
  }

  /**
   * @param {Clock} clock
   */
  addClock(clock) {
    this._clocks.push(clock);
  }

  /**
   * @param {Clock} clock
   */
  removeClock(clock) {
    const clocks = this._clocks;
    clocks.splice(clocks.indexOf(clock), 1);
  }

  update(dt) {
    this._clocks.slice(0).forEach((clock) => clock.update(dt));
  }

  reset() {
    this._clocks.slice(0).forEach((clock) => {
      clock.onEnded.detachAll();
      clock.remove();
    });
  }
}
