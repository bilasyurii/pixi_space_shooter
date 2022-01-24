import { Application } from "pixi.js";
import StateManager from "../states/state-manager";

export default class Game {
  constructor() {
    this._app = null;
    this._stage = null;
    this._states = null;

    this._initApp();
    this._setupStage();
    this._initStates();
  }

  getStates() {
    return this._states;
  }

  getApp() {
    return this._app;
  }

  getStage() {
    return this._stage;
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

  _setupStage() {
    this._stage = this._app.stage;
  }

  _initStates() {
    this._states = new StateManager(this);
  }
}
