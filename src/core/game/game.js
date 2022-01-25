import { Application } from "pixi.js";
import Input from "../input/input";
import Physics from "../physics/physics";
import ScreenManager from "../screen/screen-manager";
import StateManager from "../states/state-manager";
import TimeManager from "../time/time";
import Device from "../utils/device";

export default class Game {
  constructor() {
    this._app = null;
    this._stage = null;
    this._renderer = null;
    this._ticker = null;
    this._device = null;
    this._time = null;
    this._physics = null;
    this._states = null;
    this._screen = null;
    this._input = null;

    this._initApp();
    this._setupStage();
    this._setupRenderer();
    this._setupTicker();
    this._initDevice();
    this._initTime();
    this._initPhysics();
    this._initStates();
    this._initScreen();
    this._initInput();
  }

  start() {
    this._screen.boot();
  }

  reset() {
    this._time.reset();
    this._physics.reset();
    this._screen.reset();
    this._input.reset();
  }

  getApp() {
    return this._app;
  }

  getStage() {
    return this._stage;
  }

  getRenderer() {
    return this._renderer;
  }

  getTicker() {
    return this._ticker;
  }

  getDevice() {
    return this._device;
  }

  getTime() {
    return this._time;
  }

  getPhysics() {
    return this._physics;
  }

  getStates() {
    return this._states;
  }

  getScreen() {
    return this._screen;
  }

  getInput() {
    return this._input;
  }

  _initApp() {
    const app = new Application({
      width: 100,
      height: 100,
      antialias: true,
    });
    this._app = app;

    const view = app.view;
    view.style.position = 'absolute';
    document.body.appendChild(view);
  }

  _setupStage() {
    this._stage = this._app.stage;
  }

  _setupRenderer() {
    this._renderer = this._app.renderer;
  }

  _setupTicker() {
    const ticker = this._app.ticker;
    this._ticker = ticker;
    ticker.add(this._onUpdate, this);
  }

  _initDevice() {
    this._device = new Device();
  }

  _initTime() {
    this._time = new TimeManager(this);
  }

  _initPhysics() {
    this._physics = new Physics();
  }

  _initStates() {
    this._states = new StateManager(this);
  }

  _initScreen() {
    this._screen = new ScreenManager(this);
  }

  _initInput() {
    this._input = new Input(this);
  }

  _onUpdate(dt) {
    const seconds = this._ticker.deltaMS * 0.001;
    this._time.update(seconds);
    this._states.update(dt);
    this._physics.update();
  }
}
