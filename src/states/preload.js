import { Loader } from "pixi.js";
import GameState from "../core/states/game-state";
import Debug from "../core/utils/debug";
import Gameplay from "./gameplay";

export default class Preload extends GameState {
  onEntered() {
    const loader = Loader.shared;

    loader.load('background', 'assets/img/background.png');
    loader.load('asteroid', 'assets/img/asteroid.png');
    loader.load('spaceship', 'assets/img/spaceship.png');

    loader.load(() => this._onAssetsLoaded());
  }

  onLeft() { }

  _onAssetsLoaded() {
    Debug.info('Assets loaded.');

    this.game.getStates().setState(Gameplay);
  }
}
