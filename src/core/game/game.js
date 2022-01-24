import { Application } from "pixi.js";
import ScreenManager from "../screen/screen-manager";
import StateManager from "../states/state-manager";

export default class Game {
  constructor() {
    this._app = null;
    this._stage = null;
    this._renderer = null;
    this._states = null;
    this._screen = null;

    this._initApp();
    this._setupStage();
    this._setupRenderer();
    this._initStates();
    this._initScreen();
  }

  start() {
    this._screen.boot();
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

  getStates() {
    return this._states;
  }

  getScreen() {
    return this._screen;
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

  _initStates() {
    this._states = new StateManager(this);
  }

  _initScreen() {
    this._screen = new ScreenManager(this);
  }
}
