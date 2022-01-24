import { Application } from "pixi.js";
import StateManager from "../states/state-manager";
import Debug from "../utils/debug";

export default class Game {
  constructor() {
    this._states = null;
    this._app = null;

    this._initApp();
    this._initStates();
  }

  start() {
    this._create();
  }

  getStates() {
    return this._states;
  }

  getApp() {
    return this._app;
  }

  /**
   * @protected
   */
  _create() {
    Debug.abstractMethod();
  }

  _initApp() {
    const app = new Application({
      width: 100,
      height: 100,
      antialias: true,
    });

    this._app = app;

    document.body.appendChild(app.view);
  }

  _initStates() {
    this._states = new StateManager(this);
  }
}
