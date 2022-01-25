import MiniSignal from "mini-signals";

export default class Clock {
  constructor(time = 1, autoPlay = false) {
    this.onEnded = new MiniSignal();
    this.timeManager = null;
    this._maxTime = time;
    this._time = time;
    this._running = autoPlay;
  }

  isRunning() {
    return this._running;
  }

  getTimeLeft() {
    return this._time;
  }

  play() {
    this._running = true;
  }

  reset(time = this._maxTime, autoPlay = false) {
    this._maxTime = time;
    this._time = time;
    this._running = autoPlay;
  }

  restart() {
    this._time = this._maxTime;
    this._running = true;
  }

  pause() {
    this._running = false;
  }

  remove() {
    this._running = false;

    const manager = this.timeManager;

    if (manager) {
      manager.removeClock(this);
    }
  }

  update(dt) {
    if (this._running === false) {
      return;
    }

    const time = this._time - dt;

    if (time > 0) {
      this._time = time;
    } else {
      this._time = 0;
      this._running = false;
      this.onEnded.dispatch();
    }
  }
}
