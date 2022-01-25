import { Text } from "pixi.js";
import Clock from "../../core/time/clock";

export default class TimerText extends Text {
  /**
   * @param {Clock} clock
   */
  constructor(clock) {
    super('00', {
      fontFamily: 'Courier New',
      fontSize: 50,
      fill: 'white',
      stroke: 'dimgrey',
      strokeThickness: 5,
    });

    this._clock = clock;
  }

  update() {
    this.text = ('0' + ~~this._clock.getTimeLeft()).slice(-2);
  }
}
